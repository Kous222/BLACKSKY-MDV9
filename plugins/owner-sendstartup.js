/**
 * Direct Startup Message Command
 * Allows manually sending a startup message to the bot's own number
 */

let handler = async (m, { conn, isOwner }) => {
  if (!conn.user) return m.reply('Bot is not properly connected');
  
  try {
    // Check if user is owner
    if (!isOwner) return m.reply('Only the bot owner can use this command.');
    
    // Force flag from command
    const isForce = m.text.includes('force');
    
    // First, notify the command sender
    m.reply('📨 Preparing to send startup message...');
    
    if (global.sendStartupMessage) {
      // Use the global function if available (with force flag)
      const success = await global.sendStartupMessage(conn, true);
      if (success) {
        m.reply('✅ Startup message sent successfully to the bot!');
        return;
      }
    }
    
    // If global function failed or doesn't exist, fallback to custom implementation
    try {
      // Bot's own JID
      const botNumber = conn.user.jid;
      console.log('Bot number for sending startup message:', botNumber);
      
      // Current date and time formatted
      const now = new Date().toLocaleString();
      
      // Get system information
      const os = require('os');
      const systemInfo = {
        platform: os.type(),
        version: os.release(),
        arch: os.arch(),
        totalRAM: (os.totalmem() / (1024 * 1024 * 1024)).toFixed(2) + ' GB',
        freeRAM: (os.freemem() / (1024 * 1024 * 1024)).toFixed(2) + ' GB',
        uptime: formatUptime(os.uptime()),
        nodeVersion: process.version
      };
      
      // Create a more detailed startup message
      const startupMessage = `
┌─⊷ *BOT STARTUP REPORT* ⊶
│
│ 🤖 *Bot Status: ONLINE*
│ ⏰ ${now}
│
│ 💻 *System Information:*
│ • Platform: ${systemInfo.platform}
│ • OS Version: ${systemInfo.version}
│ • Architecture: ${systemInfo.arch}
│ • Node.js: ${systemInfo.nodeVersion}
│
│ 🖥️ *Resources:*
│ • Total RAM: ${systemInfo.totalRAM}
│ • Free RAM: ${systemInfo.freeRAM}
│ • System Uptime: ${systemInfo.uptime}
│
│ 📲 *Bot Information:*
│ • Number: ${botNumber.split('@')[0]}
│ • Uptime: ${formatUptime(process.uptime())}
│ • Command: ${isForce ? 'Force triggered' : 'Manually triggered'}
│
└───────────────────────
`.trim();
      
      // Try to send to the bot itself
      console.log('Attempting to send message to:', botNumber);
      await conn.sendMessage(botNumber, { text: startupMessage });
      m.reply('✅ Startup message sent successfully to the bot!');
    } catch (msgError) {
      console.error('Failed sending to bot number:', msgError);
      
      // Fallback: try to send to the owner
      try {
        const ownerNumber = global.owner[0] + '@s.whatsapp.net';
        console.log('Attempting to send message to owner:', ownerNumber);
        await conn.sendMessage(ownerNumber, { text: startupMessage });
        m.reply('✅ Startup message sent to owner instead (could not send to bot).');
      } catch (ownerError) {
        console.error('Failed sending to owner number:', ownerError);
        m.reply(`❌ Could not send startup message to bot or owner.`);
      }
    }
  } catch (err) {
    console.error('Error sending startup message:', err);
    m.reply(`❌ Error: ${err.message}`);
  }
}

// Helper function to format uptime
function formatUptime(seconds) {
  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  return `${days}d ${hours}h ${minutes}m ${secs}s`;
}

handler.help = ['sendstartup', 'botstartup']
handler.tags = ['owner']
handler.command = /^(force)?(send)?startup(msg|message)?$/i
handler.owner = true

module.exports = handler