let handler = async (m, { conn, isROwner, text }) => {
  let { spawn } = require('child_process');
  if (!process.send) throw 'Dont: node spielen.js\nDo: node index.js'
  if (global.conn.user.jid == conn.user.jid) {
    await m.reply('Gerade Merestart Bot...\nBitte warten ungefähr 1 menit')
    process.send('reset')
  } else throw '_eeeeeiiittsssss..._'
}

handler.help = ['restart']
handler.tags = ['owner']
handler.command = /^(srvrestart|restart)$/i

handler.rowner = true

module.exports = handler