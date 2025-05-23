let handler = async (m, { conn, text, usedPrefix }) => {
  if (!text && !m.quoted)
    return conn.reply(m.chat, `Gib eine Nummer, einen Tag oder antworte auf eine Chatnachricht deines Ziels`, m);

  let number;
  if (isNaN(text)) {
    number = text.split`@`[1];
  } else {
    number = text;
  }

  if (!number && m.quoted) number = m.quoted.sender.split('@')[0];
  if (!number) return conn.reply(m.chat, `Ungültige Nummer!`, m);

  if (number.length > 15) return conn.reply(m.chat, `Ungültiges Format!`, m);

  const user = number + "@s.whatsapp.net";

  let groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat) : {};
  let participants = m.isGroup ? groupMetadata.participants : [];
  let isParticipant = m.isGroup ? participants.some(p => p.id === user) : true;

  if (!isParticipant)
    return conn.reply(m.chat, `Ziel ist nicht in dieser Gruppe`, m);

  if (user === m.sender)
    return conn.reply(m.chat, `Du kannst keine Beziehung mit dir selbst eingehen`, m);

  if (!global.db.data.users[m.sender] || !global.db.data.users[user])
    return conn.reply(m.chat, `Einer der beiden Nutzer ist nicht in der Datenbank`, m);

  let senderData = global.db.data.users[m.sender];
  let targetData = global.db.data.users[user];

  const format = (num) => {
    return String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Bereits in einer Beziehung mit jemand anderem
  if (
    senderData.pasangan &&
    global.db.data.users[senderData.pasangan]?.pasangan === m.sender &&
    senderData.pasangan !== user
  ) {
    let denda = Math.ceil((senderData.exp / 1000) * 20);
    senderData.exp -= denda;

    return conn.reply(
      m.chat,
      `Du bist bereits in einer Beziehung mit @${senderData.pasangan.split("@")[0]}\n\nBitte trenne dich erst mit ${usedPrefix}trennen @user bevor du @${user.split("@")[0]} um eine Beziehung bittest\nStrafe: ${format(denda)} XP`,
      m,
      {
        contextInfo: {
          mentionedJid: [user, senderData.pasangan],
        },
      }
    );
  }

  // Ziel ist mit jemand anderem zusammen
  if (targetData.pasangan && global.db.data.users[targetData.pasangan]?.pasangan === user) {
    let freund = targetData.pasangan;
    let denda = Math.ceil((senderData.exp / 1000) * 20);
    senderData.exp -= denda;

    return conn.reply(
      m.chat,
      `@${user.split("@")[0]} ist bereits in einer Beziehung mit @${freund.split("@")[0]}\nBitte respektiere das.\nStrafe: ${format(denda)} XP`,
      m,
      {
        contextInfo: {
          mentionedJid: [user, freund],
        },
      }
    );
  }

  // Direkt Beziehung akzeptieren wenn gegenseitig
  if (targetData.pasangan === m.sender) {
    senderData.pasangan = user;
    return conn.reply(
      m.chat,
      `💞 Herzlichen Glückwunsch! Du bist jetzt offiziell in einer Beziehung mit @${user.split("@")[0]}`,
      m,
      {
        contextInfo: {
          mentionedJid: [user],
        },
      }
    );
  }

  // Beziehung vorschlagen
  senderData.pasangan = user;
  return conn.reply(
    m.chat,
    `💌 Du hast gerade @${user.split("@")[0]} eine Beziehung vorgeschlagen!\nBitte warte auf die Antwort.\nAntwort mit ${usedPrefix}annehmen @user oder ${usedPrefix}ablehnen @user`,
    m,
    {
      contextInfo: {
        mentionedJid: [user],
      },
    }
  );
};

handler.help = ["beziehung", "tembak"].map((v) => v + " *@tag*");
handler.tags = ["fun"];
handler.command = /^(beziehung|tembak)$/i;
handler.group = true;
module.exports = handler;
