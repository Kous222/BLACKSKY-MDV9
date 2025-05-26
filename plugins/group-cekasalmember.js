let handler = async (m, { conn, groupMetadata }) => {
  const participants = groupMetadata.participants;
  let countIndonesia = 0;
  let countMalaysia = 0;
  let countUSA = 0;
  let countOther = 0;
  const totalMembers = participants.length;

  participants.forEach(participant => {
    const phoneNumber = participant.id.split('@')[0];
    if (phoneNumber.startsWith("62")) {
      countIndonesia++;
    } else if (phoneNumber.startsWith("60")) {
      countMalaysia++;
    } else if (phoneNumber.startsWith("1")) {
      countUSA++;
    } else {
      countOther++;
    }
  });

  const replyMessage = `
┌─『 🌍 *Mitglieder nach Herkunft* 』
│
│ 🇮🇩 *Indonesien:* ${countIndonesia}
│ 🇲🇾 *Malaysia:* ${countMalaysia}
│ 🇺🇸 *USA:* ${countUSA}
│ 🇩🇪 *Deutschland:* ${countOther}
│
│ 👥 *Gesamtzahl der Mitglieder:* ${totalMembers}
└───────────────
💡 *Tipp:* Du kannst die Mitgliederzahl für jedes Land leicht verfolgen!
`;

  m.reply(replyMessage);
};

handler.tags = ['group'];
handler.help = ['checkmember', 'asalmember'];
handler.command = ['checkmember', 'asalmember'];
handler.group = true;

module.exports = handler;
