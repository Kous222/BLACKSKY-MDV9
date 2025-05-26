let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args.length) {
    return m.reply(`Hey! Wie soll deine Gruppe jetzt heißen? Nutz das Format:\n*${usedPrefix + command}* NeuerGruppenName`);
  }

  try {
    await conn.groupUpdateSubject(m.chat, args.join(" "));
    m.reply(`🎉 Boom! Der Gruppenname wurde erfolgreich zu *${args.join(" ")}* geändert!`);
  } catch (err) {
    m.reply(`Ups! Ich konnte den Gruppennamen nicht ändern. Bitte check, ob ich Admin-Rechte habe.`);
    console.error(err);
  }
};

handler.help = ['setgruppenname'];
handler.tags = ['gruppe'];
handler.command = /^(setnamagc|setgruppenname)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

module.exports = handler;