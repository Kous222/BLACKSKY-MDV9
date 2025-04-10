/**
 * Manual Startup Message Command
 * Send startup message on demand
 */

let handler = async (m, { conn, args }) => {
  if (!global.sendStartupMessage) {
    return m.reply('Startup message function is not available.');
  }
  
  try {
    m.reply('Sending startup message to bot...');
    
    // Use force=true to bypass the global flag check
    await global.sendStartupMessage(conn, true);
    
    m.reply('✅ Startup message sent successfully!');
  } catch (e) {
    m.reply(`❌ Error sending startup message: ${e.message}`);
    console.error(e);
  }
}

handler.help = ['sendstartupmsg']
handler.tags = ['owner']
handler.command = /^(send)?startup(msg|message)$/i
handler.owner = true

module.exports = handler