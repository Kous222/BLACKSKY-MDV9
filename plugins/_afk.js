let handler = m => m;

handler.before = async m => {
  let user = global.db.data.users[m.sender];
  
  // Wenn der Nutzer AFK war und jetzt zurück ist
  if (user.afk > -1) {
    await m.reply(
      `👋 Willkommen zurück, @${m.sender.split('@')[0]}!\n\n🔕 *AFK-Modus deaktiviert.*\n${
        user.afkReason ? `📌 Grund war: *${user.afkReason}*\n` : ''
      }⏱️ AFK-Dauer: *${clockString(new Date - user.afk)}*`,
      null,
      { mentions: [m.sender] }
    );
    user.afk = -1;
    user.afkReason = '';
  }

  // Erwähnte Nutzer prüfen
  let jids = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])];
  for (let jid of jids) {
    let mentionedUser = global.db.data.users[jid];
    if (!mentionedUser || !mentionedUser.afk || mentionedUser.afk < 0) continue;

    let reason = mentionedUser.afkReason || 'Kein Grund angegeben';
    await m.reply(
      `📢 *@${jid.split('@')[0]}* ist aktuell im AFK-Modus!\n\n📝 *Grund:* ${reason}\n⏱️ *Seit:* ${clockString(new Date - mentionedUser.afk)}`,
      null,
      { mentions: [jid] }
    );
  }

  return true;
};

module.exports = handler;

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
}
