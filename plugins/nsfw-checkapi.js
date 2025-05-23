const fetch = require('node-fetch');

/**
 * NSFW API Test Command
 * Admin-only command to check the status of NSFW APIs used by the bot
 */

let handler = async (m, { conn }) => {
  // Verify the user is an admin
  if (!m.isGroup) return m.reply('⚠️ Dieser Befehl kann nur in Gruppen verwendet werden.');
  
  const isAdmin = m.isGroup ? ((await conn.groupMetadata(m.chat)).participants.find(v => v.jid === m.sender)?.admin || false) : false;
  const isOwner = global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender);
  const isMods = global.mods.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender);
  
  if (!(isAdmin || isOwner || isMods)) {
    return m.reply('⚠️ Dieser Befehl kann nur von Administratoren verwendet werden.');
  }
  
  // Check if NSFW is enabled for this chat
  const chat = global.db.data.chats[m.chat];
  if (!chat.nsfw) {
    return m.reply(`⚠️ *NSFW nicht aktiviert*\n\nUm Inhalte für Erwachsene anzuzeigen, muss ein Admin diesen Befehl verwenden:\n.enable nsfw`);
  }
  
  m.reply('🔍 *NSFW-API-Test läuft...*\nBitte warten, während alle verfügbaren NSFW-APIs geprüft werden.');
  
  // Get API key
  const apiKey = global.lann || 'Btz-jdyXQ';
  
  // List of APIs to test
  const apisToTest = [
    {
      name: 'BetaBotz API (Primär)',
      url: `https://api.betabotz.eu.org/api/nsfw/hentai?apikey=${apiKey}`,
      method: 'GET',
      notes: 'Hauptquelle für NSFW-Inhalte'
    },
    {
      name: 'HMtai API (Backup 1)',
      url: 'https://hmtai.hatsunia.cfd/endpoints/nsfw/hentai',
      method: 'GET',
      notes: 'Erste Backup-API für NSFW-Inhalte'
    },
    {
      name: 'Waifu.pics API (Backup 2)',
      url: 'https://api.waifu.pics/nsfw/waifu',
      method: 'GET',
      notes: 'Zweite Backup-API für NSFW-Inhalte'
    }
  ];
  
  // Test results
  let results = [];
  
  // Test each API
  for (const api of apisToTest) {
    try {
      console.log(`[NSFW Test] Checking ${api.name} at ${api.url}`);
      
      const startTime = Date.now();
      const response = await fetch(api.url, { 
        timeout: 5000,
        method: api.method 
      });
      const endTime = Date.now();
      
      const responseTime = endTime - startTime;
      const status = response.status;
      const contentType = response.headers.get('content-type');
      
      let workingStatus = '❓ Unbekannt';
      let responseData = null;
      
      if (contentType && contentType.includes('image/')) {
        workingStatus = '✅ Online (direktes Bild)';
      } else if (contentType && contentType.includes('application/json')) {
        responseData = await response.json();
        
        if (responseData && (responseData.url || typeof responseData === 'string' || responseData.image)) {
          workingStatus = '✅ Online (JSON URL)';
        } else {
          workingStatus = '⚠️ Teilweise (ungültiges Format)';
        }
      } else {
        workingStatus = '❌ Offline oder fehlerhaft';
      }
      
      results.push({
        name: api.name,
        status: workingStatus,
        responseTime: `${responseTime}ms`,
        httpStatus: status,
        notes: api.notes
      });
      
    } catch (error) {
      console.error(`[NSFW Test] Error checking ${api.name}:`, error.message);
      
      results.push({
        name: api.name,
        status: '❌ Nicht erreichbar',
        responseTime: 'Timeout',
        httpStatus: 'Error',
        notes: `Fehler: ${error.message.substring(0, 50)}`
      });
    }
  }
  
  // Format results
  let report = `📊 *NSFW-API-Statusbericht*\n\n`;
  
  results.forEach((result, index) => {
    report += `*${index + 1}. ${result.name}*\n`;
    report += `Status: ${result.status}\n`;
    report += `Antwortzeit: ${result.responseTime}\n`;
    report += `HTTP-Status: ${result.httpStatus}\n`;
    report += `Hinweis: ${result.notes}\n\n`;
  });
  
  report += `🔄 Test abgeschlossen: ${new Date().toLocaleString('de-DE')}\n`;
  report += `\n*Verfügbare NSFW-Befehle:* hentai, ass, neko, etc.`;
  
  m.reply(report);
};

handler.help = ['checknsfw'];
handler.tags = ['nsfw', 'admin'];
handler.command = /^(checknsfw|nsfwtest|testnsfw)$/i;
handler.group = true;

module.exports = handler;