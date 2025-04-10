let handler = async (m, { conn, usedPrefix }) => {
  let __timers = new Date() - global.db.data.users[m.sender].lastngewe;
  let _timers = 3600000 - __timers;
  let order = global.db.data.users[m.sender].bookingCount || 0
  let user = global.db.data.users[m.sender];
  let timers = clockString(_timers);
  let name = user.registered ? user.name : conn.getName(m.sender);
  let id = m.sender;
  let arbeiten = "openbo";
  conn.Mission = conn.Mission ? conn.Mission : {};
  if (id in conn.Mission) {
    conn.reply(
      m.chat,
      `Selesaikan Misi ${conn.Mission[id][0]} zuerst vorher`,
      m
    );
    throw false;
  }
  if (user.healt < 80) return m.reply(`Sie Muss haben Minimal 80Healt`);
  if (user.Ausdauer < 50)
    return m.reply(
      `Deine Ausdauer ist nicht ausreichend. Versuche etwas zu essen oder zu trinken .`.trim()
    );
  //if (user.kondom == 0)
    //return m.reply("du Nein haben Kondom kaufen Lah zuerst vorher");
  if (new Date() - global.db.data.users[m.sender].lastngewe > 3600000) {
    let ngerok4 = Math.floor(Math.random() * 10);
    let ngerok5 = Math.floor(Math.random() * 10);

    let ngrk4 = ngerok4 * 100000;
    let ngrk5 = ngerok5 * 1000;

    let rokit = `📲 Orderan login von [ Om Teguh ]

ᴋᴀᴍᴜ ᴅᴀɴ ᴏᴍ ᴛᴇɢᴜʜ ᴍᴇᴍʙᴏᴏᴋɪɴɢ ʜᴏᴛᴇʟ
▒▒[ᴏʏᴏ]▒▒
▒▒▄▄▄▒▒ Kalian Berdua login Ke kamar
▒█▀█▀█▒ du Öffnen bh mu
░█▀█▀█░ Tete Mu diremas durch om tgh
░█▀█▀█░  ( . )( . )
███████.  | 🤚 |


Om Teguh start Memasukan Kelamin sein/ihr zu in vagina mu....
`.trim();

    let rokit2 = `du Kesakitan ...

(_)(_)=====D \()/  

Rahim mu terasa hangat
`.trim();

    let rokit3 = `Om teguh auch crott 

()()=====D 💦💦💦   


✅ Orderan fertig
`.trim();

    let rokit4 = `Om Teguh Memberimu Geld Mehr weil Goyanganmu Sehr unik 😝
`.trim();

    let hsl = `
*—[ Ergebnis Ngentot ${name} ]—*
➕ 💹 Geld = [ ${ngrk4} ]
➕ ✨ Exp = [ ${ngrk5} ]
➕ 😍 Order BO fertig = +1
➕ 📥Total Bookingan : ${order}
`.trim();

    user.Münzen += ngrk4;
    user.exp += ngrk5;
    user.warn += 1;
    user.bookingCount = (user.bookingCount || 0) + 1;
    user.healt -= 80;
    user.Ausdauer -= 40;

    conn.Mission[id] = [
      arbeiten,
      setTimeout(() => {
        delete conn.Mission[id];
      }, 27000),
    ];

    setTimeout(() => {
      conn.reply(m.chat, hsl, m);
    }, 27000);

    setTimeout(() => {
      conn.reply(m.chat, rokit4, m);
    }, 25000);

    setTimeout(() => {
      conn.reply(m.chat, rokit3, m);
    }, 20000);

    setTimeout(() => {
      conn.reply(m.chat, rokit2, m);
    }, 15000);

    setTimeout(() => {
      conn.reply(m.chat, rokit, m);
    }, 10000);

    setTimeout(() => {
      conn.reply(m.chat, `🔍 ${name} suchen Om Om.....`, m);
    }, 0);
    user.lastngewe = new Date() * 1;
  } else
    m.reply(
      `Bitte Menünggu während ${timers}, für durchführen ngentot wieder`
    );
};
handler.help = ["ngentot"];
handler.tags = ["rpg"];
handler.command = /^(ngentot)$/i;
handler.register = true;
handler.group = true;
handler.Stufe = 70;
handler.rpg = true;
module.exports = handler;

function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor(ms / 60000) % 60;
  let s = Math.floor(ms / 1000) % 60;
  return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(":");
}