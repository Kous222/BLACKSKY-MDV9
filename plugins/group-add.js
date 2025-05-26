const fetch = require('node-fetch');
const { getBinaryNodeChild, getBinaryNodeChildren } = require('@adiwajshing/baileys');

const handler = async (m, { conn, text, participants, usedPrefix, command }) => {
  if (!text) {
    throw `_❗ Bitte gib eine Telefonnummer ein!\n\nBeispiel:\n${usedPrefix + command} ${global.owner[0]}\nMehrere Nummern kannst du durch Komma trennen._`;
  }

  m.reply('_🔄 Verarbeite deine Anfrage..._');

  const groupId = m.chat;
  const groupName = await conn.getName(groupId);
  const groupPP = await conn.profilePictureUrl(groupId, 'image').catch(() => null);
  const jpegThumbnail = groupPP
    ? Buffer.from(await (await fetch(groupPP)).arrayBuffer())
    : Buffer.alloc(0);

  const currentParticipants = participants.map(u => u.id);

  // Telefonnummern verarbeiten & prüfen
  const users = (
    await Promise.all(
      text
        .split(',')
        .map(v => v.replace(/[^0-9]/g, '')) // Nur Ziffern
        .filter(v => v.length > 4 && v.length < 20 && !currentParticipants.includes(`${v}@s.whatsapp.net`))
        .map(async v => [v, await conn.onWhatsApp(`${v}@s.whatsapp.net`)])
    )
  )
    .filter(([_, exists]) => exists[0]?.exists)
    .map(([v]) => `${v}@s.whatsapp.net`);

  if (users.length === 0) {
    return m.reply('_❌ Keine gültigen Telefonnummern gefunden oder sie sind bereits in der Gruppe._');
  }

  // Versuch, direkt hinzuzufügen
  const response = await conn.query({
    tag: 'iq',
    attrs: {
      type: 'set',
      xmlns: 'w:g2',
      to: groupId,
    },
    content: users.map(jid => ({
      tag: 'add',
      attrs: {},
      content: [{ tag: 'participant', attrs: { jid } }],
    })),
  });

  const participantsNodes = getBinaryNodeChildren(response, 'add');

  if (!participantsNodes?.[0]) {
    return m.reply('_⚠️ Keine Antwort vom Server erhalten. Bitte versuche es später erneut._');
  }

  // Fehlerbehandlung und alternative Einladung per Gruppenlink
  for (const user of participantsNodes[0].content || []) {
    const jid = user?.attrs?.jid || 'Unbekannt';
    const error = user?.attrs?.error;

    if (error === '408') {
      // Nutzer hat die Gruppe verlassen, Einladung per Link
      const link = await conn.groupInviteCode(m.chat);
      await conn.sendMessage(jid, {
        text: `👋 Hallo! Du wurdest in die Gruppe *${groupName}* eingeladen.\n\n📎 Beitreten: https://chat.whatsapp.com/${link}`,
      });

      await conn.sendMessage(m.chat, {
        text: `🚫 @${jid.split('@')[0]} konnte nicht hinzugefügt werden (hat Gruppe zuvor verlassen).\n📩 Einladung per Link wurde privat gesendet.`,
        mentions: [jid],
      });
    }

    if (error === '403') {
      // Nutzer muss manuell eingeladen werden – Einladung per Link
      const link = await conn.groupInviteCode(m.chat);
      await conn.sendMessage(jid, {
        text: `👋 Hallo! Du wurdest in die Gruppe *${groupName}* eingeladen.\n\n📎 Beitreten: https://chat.whatsapp.com/${link}`,
      });

      await conn.sendMessage(m.chat, {
        text: `✅ Einladung für @${jid.split('@')[0]} wurde privat per Link gesendet.`,
        mentions: [jid],
      });
    }
  }
};

handler.help = ['add', '+', 'einladen'].map(cmd => `${cmd} <Nummer>`);
handler.tags = ['group'];
handler.command = /^(add|\+|hinzufügen|einladen)$/i;

handler.admin = true;
handler.group = true;
handler.botAdmin = true;

module.exports = handler;
