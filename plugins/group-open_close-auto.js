// autogc.js – Automatisches Öffnen & Schließen von Gruppen

const moment = require('moment-timezone');
const schedule = require('node-schedule');

const timeZone = 'Europe/Berlin';

let handler = async (m, { conn, command, args, isOwner, isAdmin }) => {
  let chat = global.db.data.chats[m.chat];
  if (!m.isGroup) throw 'Dieser Befehl kann nur in Gruppen verwendet werden!';
  if (!(isAdmin || isOwner)) throw 'Nur Gruppen-Admins dürfen diesen Befehl benutzen!';

  if (command === 'aktivieren' && args[0] === 'autogc') {
    if (args.length < 2) throw '⚠️ Falsches Format!\nBenutze: *.aktivieren autogc Schließzeit|Öffnungszeit*\nBeispiel: *.aktivieren autogc 22|6*';
    let [schließen, öffnen] = args[1].split('|').map(Number);
    if (isNaN(schließen) || isNaN(öffnen)) throw '⚠️ Die Zeiten müssen Zahlen zwischen 0–23 sein!';
    if (schließen < 0 || schließen > 23 || öffnen < 0 || öffnen > 23) throw '⚠️ Uhrzeiten müssen zwischen 0 und 23 liegen!';

    chat.autoGc = { schließen, öffnen };
    chat.groupStatus = 'opened'; // Initialstatus
    m.reply(`✅ Automatisches Gruppen-Management aktiviert.\n\n• Gruppe wird täglich um ${schließen}:00 Uhr *geschlossen*\n• und um ${öffnen}:00 Uhr *geöffnet* (deutsche Zeit).`);
  } else if (command === 'deaktivieren' && args[0] === 'autogc') {
    delete chat.autoGc;
    m.reply('⛔ Automatisches Gruppen-Management wurde deaktiviert.');
  }
};

handler.command = /^(aktivieren|deaktivieren)$/i;
handler.help = ['aktivieren autogc Schließzeit|Öffnungszeit', 'deaktivieren autogc'];
handler.tags = ['gruppe'];
handler.admin = true;
handler.group = true;

module.exports = handler;

// Automatischer Zeitprüfer
let connGlobal;
const checkGroupStatus = async () => {
  const now = moment().tz(timeZone);
  const aktuelleStunde = now.hour();

  for (const chatId of Object.keys(global.db.data.chats)) {
    const chat = global.db.data.chats[chatId];
    if (!chat.autoGc) continue;

    const { schließen, öffnen } = chat.autoGc;

    try {
      if (aktuelleStunde === schließen && chat.groupStatus !== 'closed') {
        await connGlobal.groupSettingUpdate(chatId, 'announcement');
        await connGlobal.sendMessage(chatId, {
          text: `🔒 *[AUTOMATISCH]* Die Gruppe wurde geschlossen.\nWird um ${öffnen}:00 Uhr wieder geöffnet.`
        });
        chat.groupStatus = 'closed';
      } else if (aktuelleStunde === öffnen && chat.groupStatus !== 'opened') {
        await connGlobal.groupSettingUpdate(chatId, 'not_announcement');
        await connGlobal.sendMessage(chatId, {
          text: `🔓 *[AUTOMATISCH]* Die Gruppe wurde geöffnet.\nWird um ${schließen}:00 Uhr wieder geschlossen.`
        });
        chat.groupStatus = 'opened';
      }
    } catch (e) {
      console.error('Fehler bei Gruppenstatus-Update:', e);
    }
  }
};

// Jede Minute ausführen
schedule.scheduleJob('* * * * *', () => {
  if (connGlobal) checkGroupStatus();
});

// Methode, um die globale Verbindung zu setzen (muss im Bot-Start gesetzt werden)
module.exports.setConnection = (conn) => {
  connGlobal = conn;
};
