let handler = async (m, { conn, text, usedPrefix, command }) => {
  let [nummer, nachricht] = text.split('|').map(v => v.trim());

  if (!nummer) {
    return conn.reply(m.chat, `❗ *Bitte gib eine Nummer ein, an die die Nachricht gesendet werden soll.*\n\n*Beispiel:* \n${usedPrefix + command} 49123456789|Hallo, wie geht’s?`, m);
  }

  if (!nachricht) {
    return conn.reply(m.chat, `❗ *Bitte gib eine Nachricht ein, die gesendet werden soll.*\n\n*Beispiel:* \n${usedPrefix + command} 49123456789|Hallo, wie geht’s?`, m);
  }

  if (nachricht.length > 500) {
    return conn.reply(m.chat, `⚠️ Die Nachricht ist zu lang. Bitte kürze sie auf unter 500 Zeichen.`, m);
  }

  const empfänger = nummer.replace(/\D/g, '') + '@s.whatsapp.net';
  const textZumSenden = `*「 Nachricht Weitergeleitet 」*\n\n*Empfänger:* wa.me/${nummer}\n*Nachricht:* ${nachricht}\n\n_gesendet von_ @${m.sender.split('@')[0]}`;

  try {
    await conn.sendMessage(empfänger, { text: textZumSenden }, { quoted: m, mentions: [m.sender] });
    await conn.reply(m.chat, `✅ *Nachricht erfolgreich gesendet an:* wa.me/${nummer}`, m);
  } catch (err) {
    console.error(err);
    await conn.reply(m.chat, `❌ *Fehler beim Senden der Nachricht an:* wa.me/${nummer}`, m);
  }
};

handler.help = ['nachricht'].map(v => v + ' <Nummer>|<Nachricht>');
handler.tags = ['tools'];
handler.command = /^nachricht|chat$/i;

module.exports = handler;
