let handler = async (m, { conn, text, usedPrefix }) => {
  if (isNaN(text)) {
    var number = text.split`@`[1];
  } else if (!isNaN(text)) {
    var number = text;
  }

  const format = (num) => {
    const n = String(num),
      p = n.indexOf(".");
    return n.replace(/\d(?=(?:\d{3})+(?:\.|$))/g, (m, i) =>
      p < 0 || i < p ? `${m},` : m
    );
  };

  if (!text && !m.quoted)
    return conn.reply(m.chat, `Gib eine Nummer, einen Tag oder antworte auf eine Chatnachricht deines Ziels`, m);
  // let exists = await conn.isOnWhatsApp(number)
  // if (exists) return conn.reply(m.chat, `*Zielnummer ist nicht bei WhatsApp registriert*`, m)
  if (isNaN(number)) return conn.reply(m.chat, `Ungültige Nummer!`, m);
  if (number.length > 15) return conn.reply(m.chat, `Ungültiges Format!`, m);
  try {
    if (text) {
      var user = number + "@s.whatsapp.net";
    } else if (m.quoted.sender) {
      var user = m.quoted.sender;
    } else if (m.mentionedJid) {
      var user = number + "@s.whatsapp.net";
    }
  } catch (e) {
  } finally {
    let groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat) : {};
    let participants = m.isGroup ? groupMetadata.participants : [];
    let users = m.isGroup ? participants.find((u) => u.jid == user) : {};
    if (!user)
      return conn.reply(
        m.chat,
        `Ziel oder Nummer nicht gefunden. Vielleicht ist die Person nicht mehr hier oder kein Mitglied dieser Gruppe`,
        m
      );
    if (user === m.sender)
      return conn.reply(m.chat, `Du kannst keine Beziehung mit dir selbst eingehen`, m);
    //if (user === conn.user.jid)
    //return conn.reply(m.chat, `Du kannst keine Beziehung mit dem Bot eingehen`, m);

    if (typeof global.db.data.users[user] == "undefined")
      return m.reply("Nicht in der Datenbank registriert");

    if (
      global.db.data.users[m.sender].pasangan != "" &&
      global.db.data.users[global.db.data.users[m.sender].pasangan].pasangan ==
        m.sender &&
      global.db.data.users[m.sender].pasangan != user
    ) {
      var denda = Math.ceil((global.db.data.users[m.sender].exp / 1000) * 20);
      global.db.data.users[m.sender].exp -= denda;
      conn.reply(
        m.chat,
        `Du bist bereits in einer Beziehung mit @${
          global.db.data.users[m.sender].pasangan.split("@")[0]
        }\n\nBitte trenne dich erst mit ${usedPrefix}trennen @user bevor du @${
          user.split("@")[0]
        } um eine Beziehung bittest\n\nBleib treu!\nStrafe: ${format(denda)} (20%)`,
        m,
        {
          contextInfo: {
            mentionedJid: [user, global.db.data.users[m.sender].pasangan],
          },
        }
      );
    } else if (global.db.data.users[user].pasangan != "") {
      var Freund = global.db.data.users[user].pasangan;
      if (global.db.data.users[Freund].pasangan == user) {
        var denda = Math.ceil((global.db.data.users[m.sender].exp / 1000) * 20);
        global.db.data.users[m.sender].exp -= denda;
        if (
          m.sender == Freund &&
          global.db.data.users[m.sender].pasangan == user
        )
          return conn.reply(
            m.chat,
            `Du bist bereits in einer Beziehung mit @${
              beb.split("@")[0]
            }\n\nBleib treu!\nStrafe: ${format(denda)} (20%)`,
            m,
            {
              contextInfo: {
                mentionedJid: [beb],
              },
            }
          );
        conn.reply(
          m.chat,
          `Bitte respektiere andere Beziehungen\n@${
            user.split("@")[0]
          } ist bereits in einer Beziehung mit @${
            Freund.split("@")[0]
          }\n\nBitte suche dir jemand anderen!\nStrafe: ${format(
            denda
          )} (10%)*`,
          m,
          {
            contextInfo: {
              mentionedJid: [user, Freund],
            },
          }
        );
      } else {
        global.db.data.users[m.sender].pasangan = user;
        conn.reply(
          m.chat,
          `Du hast gerade @${
            user.split("@")[0]
          } eine Beziehung vorgeschlagen\n\nBitte warte auf die Antwort!\nTippe ${usedPrefix}annehmen @user oder ${usedPrefix}ablehnen @user`,
          m,
          {
            contextInfo: {
              mentionedJid: [user],
            },
          }
        );
      }
    } else if (global.db.data.users[user].pasangan == m.sender) {
      global.db.data.users[m.sender].pasangan = user;
      conn.reply(
        m.chat,
        `Herzlichen Glückwunsch! Du bist jetzt offiziell in einer Beziehung mit @${
          user.split("@")[0]
        }\n\nSemoga langgeng und bahagia immer `,
        m,
        {
          contextInfo: {
            mentionedJid: [user],
          },
        }
      );
    } else {
      global.db.data.users[m.sender].pasangan = user;
      conn.reply(
        m.chat,
        `Du hast gerade @${
          user.split("@")[0]
        } eine Beziehung vorgeschlagen\n\nBitte warte auf die Antwort!\nTippe ${usedPrefix}annehmen @user oder ${usedPrefix}ablehnen @user`,
        m,
        {
          contextInfo: {
            mentionedJid: [user],
          },
        }
      );
    }
  }
};
handler.help = ["beziehung", "tembak"].map((v) => v + " *@tag*");
handler.tags = ["fun"];
handler.command = /^(beziehung|tembak)$/i;
handler.group = true;
handler.limit = false;
handler.fail = null;
module.exports = handler;
