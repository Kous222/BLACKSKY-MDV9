const fs = require('fs');
const path = './lib/info-listgroup.json';

const msToDate = (ms) => {
  const d = Math.floor(ms / 86400000);
  const h = Math.floor(ms % 86400000 / 3600000);
  const m = Math.floor(ms % 3600000 / 60000);
  return `${d} Tag(e), ${h} Stunde(n), ${m} Minute(n)`;
};

let handler = async (m, { conn }) => {
  if (!fs.existsSync(path)) fs.writeFileSync(path, JSON.stringify({}, null, 2));

  let groupData = {};
  try {
    const fileContent = fs.readFileSync(path, 'utf-8');
    groupData = fileContent.trim() ? JSON.parse(fileContent) : {};
  } catch (e) {
    console.error('Fehler beim Einlesen der JSON-Datei:', e);
    groupData = {};
  }

  const now = Date.now();
  let text = '';

  let allGroups;
  try {
    allGroups = await conn.groupFetchAllParticipating();
  } catch (e) {
    console.error('Fehler beim Abrufen der Gruppen:', e);
    return m.reply('❌ Fehler beim Laden der Gruppen.');
  }

  const groupIDs = Object.keys(allGroups);
  const botNumber = conn.user.id.split(':')[0] + '@s.whatsapp.net';

  for (const jid of groupIDs) {
    const metadata = allGroups[jid];
    const name = metadata?.subject || 'Unbenannte Gruppe';

    if (!groupData[jid]) {
      groupData[jid] = {
        isBanned: false,
        welcome: false,
        antiLink: false,
        delete: true,
        expired: null
      };
    }

    const g = groupData[jid];
    const ablauf = g.expired ? msToDate(g.expired - now) : '*Keine abgelaufene Gruppe festgelegt*';

    let inviteLink = '';
    const isBotAdmin = metadata.participants?.find(p => p.id === botNumber)?.admin !== null;

    if (isBotAdmin) {
      try {
        const code = await conn.groupInviteCode(jid);
        inviteLink = `https://chat.whatsapp.com/${code}`;
      } catch (err) {
        inviteLink = '*Fehler beim Abrufen des Links*';
      }
    } else {
      inviteLink = '*Kein Link verfügbar (Bot ist kein Admin)*';
    }

    text += `📛 *${name}*\n🆔 ${jid}\n🔗 ${inviteLink}\n${ablauf}
${g.isBanned ? '✅' : '❌'} _Gesperrt_
${g.welcome ? '✅' : '❌'} _Willkommen_
${g.antiLink ? '✅' : '❌'} _Anti-Link_\n\n`;
  }

  fs.writeFileSync(path, JSON.stringify(groupData, null, 2));

  m.reply(`📋 *Gruppenübersicht*\n\nGesamt: ${groupIDs.length}\n\n${text}`.trim());
};

handler.command = ['grouplist', 'groups', 'listgroup'];
handler.help = ['grouplist'];
handler.tags = ['group'];
handler.rowner = true;

module.exports = handler;
