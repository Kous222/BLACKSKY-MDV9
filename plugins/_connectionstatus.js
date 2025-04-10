/**
 * Connection Status Plugin
 * This plugin handles checking the bot connection status and sending a startup message
 */

// Flag to track if startup message has been sent
let startupMessageSent = false;

let handler = async (m, { conn }) => {
  // This handler function is for the command itself
  if (!m.isOwner) return // Only owner can use this command
  
  // Check connection status
  let status = 'Bot is currently ';
  status += conn.user ? 'ONLINE ✅' : 'OFFLINE ❌';
  
  if (conn.user) {
    status += `\nConnected as: ${conn.user.name || 'Bot'} (${conn.user.jid || 'Unknown JID'})`;
    status += `\nDevice: ${conn.authState?.creds?.platform || 'Unknown'}`;
  }
  
  m.reply(status);
  
  // Manually trigger the startup message if requested
  if (m.text.includes('sendstartup') && !startupMessageSent && global.sendStartupMessage) {
    startupMessageSent = true;
    m.reply('Sending startup message...');
    try {
      await global.sendStartupMessage(conn);
      m.reply('Startup message sent!');
    } catch (e) {
      m.reply(`Error sending startup message: ${e.message}`);
    }
  }
}

handler.help = ['botstatus', 'connection']
handler.tags = ['info', 'owner']
handler.command = /^(bot(status|connection)|connection|status|sendstartup)$/i

// This runs for every message before command processing
handler.before = async function (m, { conn }) {
  // Skip if we already sent the startup message or if the function isn't available
  if (startupMessageSent || !global.sendStartupMessage) return true;
  
  // Only proceed if connection is established
  if (!conn || !conn.user) return true;
  
  try {
    // Mark as sent to avoid duplicate messages
    startupMessageSent = true;
    
    console.log('\x1b[33m%s\x1b[0m', '🟡 Connection detected - preparing to send startup message');
    
    // Send after a delay to ensure connection is fully established
    setTimeout(async () => {
      try {
        if (conn && conn.user && conn.user.jid) {
          console.log('\x1b[32m%s\x1b[0m', '✅ Sending startup message now');
          await global.sendStartupMessage(conn);
          console.log('\x1b[32m%s\x1b[0m', '✅ Startup message sent successfully');
        }
      } catch (e) {
        console.error('\x1b[31m%s\x1b[0m', `❌ Failed to send startup message: ${e}`);
      }
    }, 5000);
  } catch (e) {
    console.error('\x1b[31m%s\x1b[0m', `❌ Error in startup sequence: ${e}`);
  }
  
  return true;
}

module.exports = handler