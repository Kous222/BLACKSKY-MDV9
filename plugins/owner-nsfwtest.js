/**
 * NSFW Testing Command for Owners
 * Tests a specific NSFW API and returns diagnostic information
 */

let handler = async (m, { conn, text, usedPrefix, command }) => {
  // Restrict to owner only
  const isOwner = global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender);
  const isMods = global.mods.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender);
  
  if (!(isOwner || isMods)) {
    return m.reply('👑 Dieser Befehl ist nur für den Bot-Besitzer verfügbar.');
  }
  
  // Check if a category was provided
  if (!text) {
    return m.reply(`📖 *NSFW Testbefehl*
    
Verwende ${usedPrefix}${command} <kategorie> um einen NSFW-Befehl direkt zu testen.

Beispiel: ${usedPrefix}${command} hentai

Verfügbare Kategorien:
- hentai, ass, bdsm, blowjob
- cum, femdom, foot, gangbang
- glasses, jahy, masturbation, neko
- orgy, panties, pussy, tentacles
- thighs, yuri, zettai, ero, ahegao
- gifs, neko2, manga, gay, cuckold`);
  }
  
  const category = text.toLowerCase().trim();
  const validCategories = [
    'hentai', 'ass', 'bdsm', 'blowjob', 'cum', 'femdom', 'foot', 'gangbang', 
    'glasses', 'jahy', 'masturbation', 'neko', 'orgy', 'panties', 'pussy', 
    'tentacles', 'thighs', 'yuri', 'zettai', 'ero', 'ahegao', 'gifs', 'neko2',
    'manga', 'gay', 'cuckold'
  ];
  
  if (!validCategories.includes(category)) {
    return m.reply(`⚠️ Ungültige Kategorie: "${category}"\nVerwende ${usedPrefix}${command} ohne Parameter, um die Liste der verfügbaren Kategorien zu sehen.`);
  }
  
  // Inform the owner that testing has begun
  await m.reply(`🔍 *NSFW Testing Modus*\nKategorie: ${category}\nAPI Tests laufen...`);
  
  // Get API key
  const apiKey = global.lann || 'Btz-jdyXQ';
  
  // Define functions for each API test
  const testApis = [
    {
      name: "BetaBotz API (Primary)",
      test: async () => {
        const endpoint = `https://api.betabotz.eu.org/api/nsfw/${category}?apikey=${apiKey}`;
        const startTime = Date.now();
        const response = await fetch(endpoint, { timeout: 8000 });
        const endTime = Date.now();
        
        const contentType = response.headers.get('content-type');
        let result = { success: false, time: endTime - startTime };
        
        if (contentType && contentType.includes('image/')) {
          // Direct image response
          const buffer = await response.buffer();
          result.success = true;
          result.format = "Direct Image";
          result.data = buffer;
          result.extension = contentType.includes('image/gif') ? 'gif' : 'jpg';
        } else {
          // Try to parse JSON
          try {
            const text = await response.text();
            if (text.includes('"type":"Buffer"') || text.includes('limit is 0') || !response.ok) {
              result.error = "API returned error or rate limit";
            } else {
              try {
                const json = JSON.parse(text);
                if (json.url) {
                  result.success = true;
                  result.format = "JSON URL";
                  result.data = json.url;
                  result.extension = json.url.toLowerCase().endsWith('.gif') ? 'gif' : 'jpg';
                } else {
                  result.error = "No URL in JSON response";
                }
              } catch (e) {
                result.error = "Invalid JSON: " + e.message;
              }
            }
          } catch (e) {
            result.error = "Could not read response: " + e.message;
          }
        }
        
        return result;
      }
    },
    {
      name: "HMtai API (Backup 1)",
      test: async () => {
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
          default: 'nsfw/hentai'
        };
        
        const endpoint = endpointMap[category] || endpointMap.default;
        const apiUrl = `https://hmtai.hatsunia.cfd/endpoints/${endpoint}`;
        
        const startTime = Date.now();
        const response = await fetch(apiUrl, { timeout: 8000 });
        const endTime = Date.now();
        
        let result = { success: false, time: endTime - startTime };
        
        if (response.ok) {
          try {
            const data = await response.json();
            let imageUrl = null;
            
            if (typeof data === 'string') {
              imageUrl = data;
            } else if (data.url) {
              imageUrl = data.url;
            }
            
            if (imageUrl) {
              result.success = true;
              result.format = "JSON URL";
              result.data = imageUrl;
              result.extension = imageUrl.toLowerCase().endsWith('.gif') ? 'gif' : 'jpg';
            } else {
              result.error = "Invalid response format";
            }
          } catch (e) {
            result.error = "Parse error: " + e.message;
          }
        } else {
          result.error = `HTTP ${response.status} - ${response.statusText}`;
        }
        
        return result;
      }
    },
    {
      name: "Waifu.pics API (Backup 2)",
      test: async () => {
        const endpointMap = {
          neko: 'neko',
          blowjob: 'blowjob',
          waifu: 'waifu',
          trap: 'trap',
          default: 'waifu'
        };
        
        const endpoint = endpointMap[category] || endpointMap.default;
        const apiUrl = `https://api.waifu.pics/nsfw/${endpoint}`;
        
        const startTime = Date.now();
        const response = await fetch(apiUrl, { timeout: 8000 });
        const endTime = Date.now();
        
        let result = { success: false, time: endTime - startTime };
        
        if (response.ok) {
          try {
            const data = await response.json();
            if (data.url) {
              result.success = true;
              result.format = "JSON URL";
              result.data = data.url;
              result.extension = data.url.toLowerCase().endsWith('.gif') ? 'gif' : 'jpg';
            } else {
              result.error = "No URL in response";
            }
          } catch (e) {
            result.error = "Parse error: " + e.message;
          }
        } else {
          result.error = `HTTP ${response.status} - ${response.statusText}`;
        }
        
        return result;
      }
    }
  ];
  
  // Run all tests
  const testResults = [];
  for (const api of testApis) {
    try {
      const result = await api.test();
      testResults.push({
        name: api.name,
        result
      });
      
      // If successful, send the image
      if (result.success) {
        let caption = `✅ *NSFW Test erfolgreich*\nAPI: ${api.name}\nKategorie: ${category}\nFormat: ${result.format}\nZeit: ${result.time}ms`;
        
        if (typeof result.data === 'string') {
          // It's a URL
          await conn.sendFile(m.chat, result.data, `nsfw.${result.extension}`, caption, m);
        } else if (Buffer.isBuffer(result.data)) {
          // It's a buffer
          await conn.sendFile(m.chat, result.data, `nsfw.${result.extension}`, caption, m);
        }
        
        // Break after the first successful API
        break;
      }
    } catch (error) {
      testResults.push({
        name: api.name,
        result: {
          success: false,
          error: error.message
        }
      });
    }
  }
  
  // Prepare detailed report
  let report = `📊 *NSFW API Test Bericht*\nKategorie: ${category}\n\n`;
  
  let anySuccess = false;
  for (const test of testResults) {
    report += `*${test.name}*\n`;
    report += `Status: ${test.result.success ? '✅ Erfolgreich' : '❌ Fehlgeschlagen'}\n`;
    if (test.result.time) report += `Zeit: ${test.result.time}ms\n`;
    if (test.result.format) report += `Format: ${test.result.format}\n`;
    if (test.result.error) report += `Fehler: ${test.result.error}\n`;
    report += '\n';
    
    if (test.result.success) anySuccess = true;
  }
  
  // Only send the report if we haven't already sent an image
  if (!anySuccess) {
    report += `❌ *Keine API erfolgreich!*\nAlle verfügbaren APIs für "${category}" schlugen fehl.`;
    await m.reply(report);
  }
};

handler.help = ['testnsfwapi <kategorie>'];
handler.tags = ['owner'];
handler.command = /^(testnsfwapi|nsfwtest|nsfwcheck)$/i;

module.exports = handler;