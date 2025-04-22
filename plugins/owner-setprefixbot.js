let handler = async (m, { conn, text }) => {
  if (!text) throw `⚠️ Kein Präfix erkannt.\n\nBeispiel:\n.setprefix !`
  
  global.prefix = new RegExp('^[' + (text || global.opts['prefix'] || '‎xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')
  
  await m.reply(`✅ Präfix wurde erfolgreich auf *${text}* geändert.`)
  
  // Optionaler Fake-Reply:
  // conn.fakeReply(m.chat, `Präfix wurde geändert zu *${text}*`, '0@s.whatsapp.net', 'Bot-Präfix setzen')
}

handler.help = ['setprefix [zeichen]']
handler.tags = ['owner']
handler.command = /^(setprefix)$/i

handler.rowner = true

module.exports = handler
