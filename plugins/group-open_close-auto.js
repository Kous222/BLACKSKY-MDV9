
const moment = require('moment-timezone');
const schedule = require('node-schedule');

const TIMEZONE = 'Europe/Berlin';

let connGlobal;

const handler = async (m, { conn, command, args, isOwner, isAdmin }) => {
  if (!m.isGroup) return m.reply('❌ Dieser Befehl ist nur in Gruppen erlaubt!');
  if (!(isAdmin || isOwner)) return m.reply('❌ Nur Gruppenadmins dürfen das steuern!');

  const chat = global.db.data.chats[m.chat];

  if (command === 'aktivieren' && args[0] === 'autogc') {
    if (args.length < 2) return m.reply(`⚠️ Bitte Uhrzeiten angeben!\nBeispiel:\n*${usedPrefix}aktivieren autogc 22|6*`);
    const [closeHour, openHour] = args[1].split('|').map(Number);

    if ([closeHour, openHour].some(h => isNaN(h) || h < 0 || h > 23))
      return m.reply('⚠️ Die Stunden müssen gültige Zahlen zwischen 0 und 23 sein!');

    chat.autoGc = { closeHour, openHour };
    chat.groupStatus = 'opened';

    return m.reply(`✅ Automatisches Gruppen-Management aktiviert!\n\n🔒 Schließt täglich um ${closeHour}:00 Uhr\n🔓 Öffnet täglich um ${openHour}:00 Uhr\n(TZ: ${TIMEZONE})`);
  }

  if (command === 'deaktivieren' && args[0] === 'autogc') {
    delete chat.autoGc;
    delete chat.groupStatus;
    return m.reply('⛔ Automatisches Gruppen-Management deaktiviert.');
  }

  return m.reply('❓ Unbekannter Befehl oder Argumente.');
};

handler.command = /^(aktivieren|deaktivieren)$/i;
handler.help = ['aktivieren autogc Schließzeit|Öffnungszeit', 'deaktivieren autogc'];
handler.tags = ['gruppe'];
handler.admin = true;
handler.group = true;

module.exports = handler;

const checkGroupStatus = async () => {
  const now = moment().tz(TIMEZONE);
  const currentHour = now.hour();

  for (const chatId of Object.keys(global.db.data.chats)) {
    const chat = global.db.data.chats[chatId];
    if (!chat.autoGc) continue;

    const { closeHour, openHour } = chat.autoGc;

    try {
      if (currentHour === closeHour && chat.groupStatus !== 'closed') {
        await connGlobal.groupSettingUpdate(chatId, 'announcement');
        await connGlobal.sendMessage(chatId, {
          text: `🔒 [AUTOMATISCH] Gruppe geschlossen.\nSie öffnet wieder um ${openHour}:00 Uhr.`
        });
        chat.groupStatus = 'closed';
        console.log(`[AUTOGC] Gruppe ${chatId} geschlossen um ${closeHour}:00`);
      } else if (currentHour === openHour && chat.groupStatus !== 'opened') {
        await connGlobal.groupSettingUpdate(chatId, 'not_announcement');
        await connGlobal.sendMessage(chatId, {
          text: `🔓 [AUTOMATISCH] Gruppe geöffnet.\nSie schließt wieder um ${closeHour}:00 Uhr.`
        });
        chat.groupStatus = 'opened';
        console.log(`[AUTOGC] Gruppe ${chatId} geöffnet um ${openHour}:00`);
      }
    } catch (error) {
      console.error(`[AUTOGC] Fehler bei Gruppe ${chatId}:`, error);
    }
  }
};

// Jede Minute ausführen, falls connGlobal gesetzt
schedule.scheduleJob('* * * * *', () => {
  if (connGlobal) checkGroupStatus();
});

module.exports.setConnection = (conn) => {
  connGlobal = conn;
};
