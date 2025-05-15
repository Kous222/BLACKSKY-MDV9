const GroupSettings = require('../lib/groupSettings'); // Mongoose model

const msToDate = (ms) => {
  const d = Math.floor(ms / 86400000);
  const h = Math.floor(ms % 86400000 / 3600000);
  const m = Math.floor(ms % 3600000 / 60000);
  return `${d} Tag(e), ${h} Stunde(n), ${m} Minute(n)`;
};

let handler = async (m, { conn }) => {
  let text = '';
  let allGroups;

  try {
    allGroups = await conn.groupFetchAllParticipating();
  } catch (e) {
    console.error('Fehler beim Abrufen der Gruppen:', e);
    return m.reply('❌ Fehler beim Laden der Gruppen.');
  }

  const groupIDs = Object.keys(allGroups);
  const now = Date.now();

  for (const jid of groupIDs) {
    const metadata = allGroups[jid];
    const name = metadata?.subject || 'Unbenannte Gruppe';

    // Find or create group settings in database
    let g = await GroupSettings.findOne({ jid });
    if (!g) {
      g = new GroupSettings({ jid });
      await g.save();
    }

    const ablauf = g.expired ? msToDate(g.expired - now) : '*Keine abgelaufene Gruppe festgelegt*';

    let inviteLink = '';
    try {
      const code = await conn.groupInviteCode(jid);
      inviteLink = `https://chat.whatsapp.com/${code}`;
    } catch (err) {
      inviteLink = '*Kein Link verfügbar (Bot ist kein Admin)*';
    }

    text += `📛 *${name}*\n🆔 ${jid}\n🔗 ${inviteLink}\n${ablauf}
${g.isBanned ? '✅' : '❌'} _Gesperrt_
${g.welcome ? '✅' : '❌'} _Willkommen_
${g.antiLink ? '✅' : '❌'} _Anti-Link_\n\n`;
  }

  m.reply(`📋 *Gruppenübersicht*\n\nGesamt: ${groupIDs.length}\n\n${text}`.trim());
};

handler.command = ['grouplist', 'groups', 'listgroup'];
handler.help = ['grouplist'];
handler.tags = ['group'];
handler.rowner = true;

module.exports = handler;
