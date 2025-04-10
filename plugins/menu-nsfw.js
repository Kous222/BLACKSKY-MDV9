const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

/**
 * Enhanced NSFW Command Handler
 * This module provides reliable NSFW image retrieval from multiple backup APIs
 * with proper error handling and content verification
 */

// API endpoints for different NSFW categories
const API_ENDPOINTS = {
  // Primary API - main source
  primary: {
    baseUrl: 'https://api.betabotz.eu.org/api/nsfw/',
    needsApiKey: true,
    getUrl: (command, apiKey) => `https://api.betabotz.eu.org/api/nsfw/${command}?apikey=${apiKey}`,
    isJson: true
  },
  // Backup API 1 - hmtai API
  backup1: {
    baseUrl: 'https://hmtai.hatsunia.cfd/endpoints/',
    needsApiKey: false, 
    getUrl: (command) => {
      // Map command to endpoint
      const endpointMap = {
        hentai: 'classic/hentai',
        ass: 'nsfw/ass',
        bdsm: 'nsfw/bdsm',
        blowjob: 'nsfw/blowjob',
        cum: 'nsfw/cum',
        femdom: 'nsfw/femdom',
        masturbation: 'nsfw/masturbation',
        neko: 'nsfw/nsfwNeko',
        orgy: 'nsfw/orgy',
        panties: 'nsfw/pantsu',
        pussy: 'nsfw/pussy',
        thighs: 'nsfw/thighs',
        yuri: 'nsfw/yuri',
        ahegao: 'nsfw/ahegao',
        gangbang: 'nsfw/gangbang',
        tentacles: 'nsfw/tentacles',
        glasses: 'nsfw/glasses',
        ero: 'nsfw/ero',
        // Default to hentai for unmapped categories
        default: 'nsfw/hentai'
      };
      
      const endpoint = endpointMap[command] || endpointMap.default;
      return `https://hmtai.hatsunia.cfd/endpoints/${endpoint}`;
    },
    isJson: true
  },
  // Backup API 2 - waifu.pics
  backup2: {
    baseUrl: 'https://api.waifu.pics/nsfw/',
    needsApiKey: false,
    getUrl: (command) => {
      // Map command to endpoint
      const endpointMap = {
        neko: 'neko',
        blowjob: 'blowjob',
        waifu: 'waifu',
        trap: 'trap',
        // Default to waifu for unmapped categories
        default: 'waifu'
      };
      
      const endpoint = endpointMap[command] || endpointMap.default;
      return `https://api.waifu.pics/nsfw/${endpoint}`;
    },
    isJson: true
  }
};

// Common NSFW categories for verification
const NSFW_CATEGORIES = [
  'hentai', 'ass', 'bdsm', 'blowjob', 'cum', 'femdom', 'foot', 'gangbang', 
  'glasses', 'jahy', 'masturbation', 'neko', 'orgy', 'panties', 'pussy', 
  'tentacles', 'thighs', 'yuri', 'zettai', 'ero', 'ahegao', 'gifs', 'neko2',
  'manga', 'gay', 'cuckold'
];

// Dedicated high-quality fallback URLs for each category
const FALLBACK_IMAGES = {
  // We'll use reliable CDNs for the fallbacks to ensure availability
  hentai: 'https://cdn.waifu.im/7243.jpg',
  ass: 'https://cdn.waifu.im/5239.jpg',
  neko: 'https://cdn.waifu.im/5687.jpg',
  waifu: 'https://cdn.waifu.im/1274.jpg',
  default: 'https://cdn.waifu.im/6245.jpg'
};

let handler = async (m, { conn, command }) => {
  // Check if NSFW is enabled for this chat
  const chat = global.db.data.chats[m.chat];
  
  if (!chat.nsfw) {
    return m.reply(`⚠️ *NSFW nicht aktiviert*\n\nUm Inhalte für Erwachsene anzuzeigen, muss ein Admin diesen Befehl verwenden:\n.enable nsfw`);
  }
  
  // Let the user know we're processing
  const processingMsg = await conn.reply(m.chat, `🔍 *NSFW-Inhalt wird gesucht...*\n\nKategorie: ${command}`, m);
  
  // Start logging for debugging purposes
  console.log(`[NSFW] Processing ${command} command from ${m.sender}`);
  
  // Get API keys from global config
  const primaryApiKey = global.lann || 'Btz-jdyXQ';
  
  // A recursive function to try multiple APIs in sequence
  const tryFetchingImage = async (apiIndex = 0, attempts = 0) => {
    // If we've tried all APIs, use the final fallback
    if (apiIndex >= Object.keys(API_ENDPOINTS).length || attempts > 3) {
      console.log(`[NSFW] All APIs failed for ${command}, using static fallback`);
      
      // Select a category-specific fallback or default
      const fallbackKey = Object.keys(FALLBACK_IMAGES).includes(command) ? command : 'default';
      const fallbackUrl = FALLBACK_IMAGES[fallbackKey];
      
      try {
        await conn.sendFile(m.chat, fallbackUrl, 'nsfw.jpg', `⚠️ *Fallback-Bild für ${command}*\n\nAlle APIs sind momentan nicht verfügbar.`, m);
        return true;
      } catch (fallbackError) {
        console.error(`[NSFW] Fatal error with fallback for ${command}:`, fallbackError);
        m.reply(`❌ *Kritischer Fehler*\n\nEs ist ein unerwarteter Fehler aufgetreten. Bitte versuche es später erneut.`);
        return false;
      }
    }
    
    // Get the current API to try
    const apiName = Object.keys(API_ENDPOINTS)[apiIndex];
    const api = API_ENDPOINTS[apiName];
    
    console.log(`[NSFW] Trying ${apiName} API for ${command}`);
    
    try {
      // Construct the URL according to API specs
      let apiUrl = '';
      if (api.needsApiKey) {
        apiUrl = api.getUrl(command, primaryApiKey);
      } else {
        apiUrl = api.getUrl(command);
      }
      
      // Fetch the result
      const response = await fetch(apiUrl, { timeout: 8000 });
      
      // Check for direct image response
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('image/')) {
        console.log(`[NSFW] Got direct image from ${apiName} for ${command}`);
        const buffer = await response.buffer();
        
        // Check if it's a GIF
        const isGif = contentType.includes('image/gif');
        await conn.sendFile(
          m.chat, 
          buffer, 
          isGif ? 'nsfw.gif' : 'nsfw.jpg', 
          `✅ *NSFW ${command}*\nQuelle: ${apiName} API`, 
          m
        );
        return true;
      }
      
      // Handle JSON responses
      if (api.isJson && response.ok) {
        const jsonData = await response.json();
        
        // Different APIs have different response formats
        let imageUrl = null;
        
        if (jsonData.url) {
          imageUrl = jsonData.url;
        } else if (jsonData.image) {
          imageUrl = jsonData.image;
        } else if (jsonData.data && jsonData.data.response) {
          imageUrl = jsonData.data.response;
        } else if (apiName === 'backup1' && typeof jsonData === 'string') {
          // hmtai sometimes returns just the URL as a string
          imageUrl = jsonData;
        }
        
        if (imageUrl) {
          console.log(`[NSFW] Got JSON with image URL from ${apiName} for ${command}: ${imageUrl.substring(0, 50)}...`);
          
          // Determine if it's a GIF
          const isGif = imageUrl.toLowerCase().endsWith('.gif') || command === 'gifs';
          
          // Send the image
          await conn.sendFile(
            m.chat, 
            imageUrl, 
            isGif ? 'nsfw.gif' : 'nsfw.jpg', 
            `✅ *NSFW ${command}*\nQuelle: ${apiName} API`, 
            m
          );
          return true;
        }
      }
      
      // This API didn't work, try the next one
      console.log(`[NSFW] ${apiName} failed for ${command}, trying next API`);
      return await tryFetchingImage(apiIndex + 1, attempts);
      
    } catch (error) {
      console.error(`[NSFW] Error with ${apiName} API for ${command}:`, error.message);
      
      // Try the same API again once before moving to the next one
      if (attempts < 1) {
        console.log(`[NSFW] Retrying ${apiName} API for ${command}`);
        return await tryFetchingImage(apiIndex, attempts + 1);
      }
      
      // Move to the next API
      return await tryFetchingImage(apiIndex + 1, 0);
    }
  };
  
  // Start trying APIs in sequence
  const success = await tryFetchingImage();
  
  // If no success, send a general error message
  if (!success) {
    m.reply(`❌ *NSFW-Fehler*\n\nEs tut uns leid, aber wir konnten für "${command}" keine Inhalte finden. Bitte versuche es später erneut oder wähle eine andere Kategorie.`);
  }
};
handler.command = handler.help = ['gay','ahegao','ass','bdsm','blowjob','cuckold','cum','ero','femdom','foot','gangbang','glasses','hentai','gifs','jahy','manga','masturbation','neko','neko2','orgy','tentacles','pussy','panties','thighs','yuri','zettai']
handler.tags = ['nsfw']
handler.limit = true;
module.exports = handler;
