let handler = async (m, { conn }) => {
  if (!m.isGroup) {
    return m.reply("❌ *DIESER BEFEHL KANN NUR IN GRUPPEN VERWENDET WERDEN!*");
  }

  const groupMetadata = await conn.groupMetadata(m.chat);
  const isAdmin = groupMetadata.participants.find(p => p.id === m.sender && (p.admin === 'admin' || p.admin === 'superadmin'));

  if (!isAdmin) {
    return m.reply("⚠️ *NUR GRUPPENADMINS DÜRFEN MICH AUS DER GRUPPE ENTFERNEN!*");
  }

  try {
    await m.reply(
      "*🚪 ICH VERLASSE JETZT DIESE GRUPPE...*\n\n" +
      "*VIELEN DANK FÜR DIE GEMEINSAME ZEIT! WENN IHR MICH WIEDER BRAUCHT, STEHE ICH BEREIT.*\n\n" +
      "_Mit dem Befehl `.join (Gruppenlink)` könnt ihr mich jederzeit wieder einladen 😌_"
    );
    await sleep(1000);
    await conn.groupLeave(m.chat);
  } catch (e) {
    console.error(e);
    return m.reply("*❗ EIN FEHLER IST AUFGETRETEN BEIM VERLASSEN DER GRUPPE.*\n*BITTE VERSUCHE ES SPÄTER ERNEUT.*");
  }
};

handler.command = handler.help = ['out', 'leavegc'];
handler.tags = ['group'];
handler.group = true;

module.exports = handler;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
