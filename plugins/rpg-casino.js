let erstellenall = 1;
let handler = async (m, { conn, args, usedPrefix, DevMode }) => {
  conn.casino = conn.casino ? conn.casino : {};
  if (m.chat in conn.casino)
    return m.reply(
      "Masih gibt die/der/das durchführen casino hier, warte bis fertig!!"
    );
  else conn.casino[m.chat] = true;
  try {
    let randomaku = `${Math.floor(Math.random() * 150)}`.trim();
    let randomkamu = `${Math.floor(Math.random() * 80)}`.trim(); //hehe Biar Susah Gewinnen :v
    let ich = randomaku * 1;
    let du = randomkamu * 1;
    let count = args[0];
    count = count
      ? /all/i.test(count)
        ? Math.floor(global.db.data.users[m.sender].Münzen / erstellenall)
        : parseInt(count)
      : args[0]
      ? parseInt(args[0])
      : 1;
    count = Math.max(1, count);
    if (args.length < 1)
      return conn.reply(
        m.chat,
        usedPrefix + "casino <Anzahl>\n " + usedPrefix + "casino 1000",
        m
      );
    if (global.db.data.users[m.sender].Münzen >= count * 1) {
      global.db.data.users[m.sender].Münzen -= count * 1;
      //await m.reply('') //Kwkwwkkwlwlw
      if (ich > du) {
        conn.reply(
          m.chat,
          `💰 Casino 💰\n*du:* ${du} Point\n*Computer:* ${ich} Point\n\n*You LOSE*\nDu verlierst ${count} Money`.trim(),
          m
        );
      } else if (ich < du) {
        global.db.data.users[m.sender].Münzen += count * 2;
        conn.reply(
          m.chat,
          `💰 Casino 💰\n*du:* ${du} Point\n*Computer:* ${ich} Point\n\n*You Win*\nDu erhältst ${
            count * 2
          } Money`.trim(),
          m
        );
      } else {
        global.db.data.users[m.sender].Münzen += count * 1;
        conn.reply(
          m.chat,
          `💰 Casino 💰\n*du:* ${du} Point\n*Computer:* ${ich} Point\n\n*UNENTSCHIEDEN*\nDu erhältst ${
            count * 1
          } Geld`.trim(),
          m
        );
      }
    } else
      conn.reply(
        m.chat,
        `Du hast nicht genug Geld für das Casino bitte *#arbeiten* besonders erst!`.trim(),
        m
      );
  } catch (e) {
    console.log(e);
    m.reply("Error!!");
    if (DevMode) {
      for (let jid of global.Besitzer
        .map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net")
        .filter((v) => v != conn.user.jid)) {
        conn.sendMessage(
          jid,
          "casino.js error\nNo: *" +
            m.sender.split`@`[0] +
            "*\nCommand: *" +
            m.text +
            "*\n\n*" +
            e +
            "*",
          MessageType.text
        );
      }
    }
  } finally {
    delete conn.casino[m.chat];
  }
};

handler.help = ["casino <Anzahl>"];
handler.tags = ["rpg"];
handler.command = /^(casino)$/i;
handler.register = true;
handler.group = true;
handler.rpg = true
handler.limit = 10;
module.exports = handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}