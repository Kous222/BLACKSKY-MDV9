let handler = async (m, { conn, text }) => {
  const sender = m.sender;
  const senderData = global.db.data.users[sender];

  // Sichere Jobprüfung mit Bereinigung
  if (!senderData || (senderData.job || '').toLowerCase().trim() !== 'polizist') {
    return m.reply('Nur Benutzer mit dem Beruf *Polizist* dürfen andere aus dem Gefängnis entlassen.');
  }

  // Ziel identifizieren
  const target = m.mentionedJid && m.mentionedJid[0]
    ? m.mentionedJid[0]
    : text && text.match(/^\d+$/)
    ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
    : null;

  if (!target) return m.reply('Bitte gib den Benutzer an, der freigelassen werden soll. Beispiel: *.release @benutzer*');

  const user = global.db.data.users[target];
  if (!user) return m.reply('Benutzer nicht in der Datenbank gefunden.');

  if (!user.jail) return m.reply('Diese Person ist nicht im Gefängnis.');

  // Entlassung
  user.jail = false;
  user.perkerjaandua = 0;

  return conn.reply(m.chat, `*${target.split('@')[0]}* wurde erfolgreich von der Polizei aus dem Gefängnis entlassen!`, m, {
    mentions: [target]
  });
};

handler.help = ['release @benutzer'];
handler.tags = ['rpg'];
handler.command = /^(release|entlassen|freilassen)$/i;
handler.group = true;
handler.rpg = true;

module.exports = handler;
