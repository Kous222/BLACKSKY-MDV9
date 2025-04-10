/**
 * Direct Startup Message Plugin
 * This plugin intercepts early messages and sends a startup notification
 * directly to the bot's own number
 */

// Initialize the global flag if it doesn't exist
if (typeof global.startupMessageSent === 'undefined') {
  global.startupMessageSent = false;
}

// Local flag to track first message
let firstMessageReceived = false;

let handler = async (m, { conn }) => {
  // Manual command
  if (m.text && m.text.includes('force')) {
    global.startupMessageSent = false;
    firstMessageReceived = false;
    m.reply('🔄 Resetting startup message status...');
  }
  
  try {
    // Force message when manually requested
    const success = await global.sendStartupMessage(conn, true);
    if (success) {
      m.reply('✅ Startup message sent successfully!');
    } else {
      m.reply('❌ Failed to send startup message. Check console for details.');
    }
  } catch (e) {
    m.reply(`❌ Error: ${e.message}`);
    console.error(e);
  }
}

handler.help = ['startupmsg', 'botstartup']
handler.tags = ['owner']
handler.command = /^(force)?(send)?(startup|boot)(msg|message|notification)$/i
handler.owner = true
handler.private = false

// Format uptime in human-readable form
function formatUptime(seconds) {
  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  return `${days}d ${hours}h ${minutes}m ${secs}s`;
}

// This runs for absolutely EVERY message before anything else
handler.all = async function(m, { conn }) {
  // Skip if already sent
  if (global.startupMessageSent) return;
  
  // On first message received, set flag and schedule startup message
  if (!firstMessageReceived) {
    firstMessageReceived = true;
    console.log('\x1b[36m%s\x1b[0m', '🔵 First message detected, scheduling startup message');
    
    // Add a short delay to ensure connection is ready
    setTimeout(async () => {
      await global.sendStartupMessage(conn);
    }, 2000);
  }
}

// The highest priority possible to run before other plugins
handler.priority = -9999;

module.exports = handler