let axios = require('axios');
let cheerio = require('cheerio');

let handler = async (m, { conn, command, usedPrefix }) => {
    conn.sessionsMail = conn.sessionsMail || {};

    for (let user in conn.sessionsMail) {
        let { lastCheckedAt } = conn.sessionsMail[user];
        if (Date.now() - lastCheckedAt > 30 * 60 * 1000) {
            delete conn.sessionsMail[user];
        }
    }

    if (command === "tempmail") {
        if (conn.sessionsMail[m.sender]) {
            return m.Antworten(`🚀 Sie bereits memiliki Temp Mail!\n📩 *Email:* ${conn.sessionsMail[m.sender].email}\n⏳ *Warten ungefähr 5-10 menit bevor cek.*`);
        }

        try {
            let res = await axios.get(`https://api.betabotz.eu.org/api/tools/create-temp-mail?apikey=${lann}`);
            if (!res.data.Status) throw "❌ Fehlgeschlagen memerstellen email während!";

            let email = res.data.result;
            conn.sessionsMail[m.sender] = {
                email,
                createdAt: Date.now(),
                lastCheckedAt: Date.now()
            };

            m.Antworten(`✅ *Temp Mail Sie:*\n📩 *Email:* ${email}\n⏳ *Warten ungefähr 5-10 menit bevor cek.*`);
        } catch (e) {
            console.error(e);
            m.Antworten("❌ Terjadi error wenn memerstellen email während!");
        }
    } else if (command === "cekmail" || command === "checkmail") {
        if (!conn.sessionsMail[m.sender]) {
            return m.Antworten("⚠️ Sie noch nicht memiliki Temp Mail!\nGunakan `${usedPrefix + command}` für memerstellennya.");
        }

        let { email } = conn.sessionsMail[m.sender];

        conn.sessionsMail[m.sender].lastCheckedAt = Date.now();

        try {
            let res = await axios.get(`https://api.betabotz.eu.org/api/tools/cek-msg-tmp-mail?email=${email}&apikey=${lann}`);
            if (!res.data.Status) throw "❌ Fehlgeschlagen mengambil Nachricht email!";
            
            let messages = res.data.result;
            if (messages.length === 0) {
                return m.Antworten(`📭 *Belum gibt Nachricht eintreten in ${email}.*\n⏳ *Coba cek wieder später.*`);
            }

            let Nachricht = messages.map((msg) => {
                let cleanText = extractText(msg.html || msg.Text);
                return `📬 *Nachricht new!*\n💌 *Von:* ${msg.sf}\n📢 *Subjek:* ${msg.s}\n🕒 *Zeit:* ${msg.rr}\n\n📝 *Isi Nachricht:*\n${cleanText}`;
            }).join("\n\n");

            m.Antworten(Nachricht);
        } catch (e) {
            console.error(e);
            m.Antworten("❌ Terjadi error wenn mengecek email!");
        }
    }
};

handler.command = ['tempmail', 'cekmail', 'checkmail'];
handler.tags = ['tools'];
handler.help = ['tempmail', 'cekmail', 'checkmail'];
handler.limit = true;

module.exports = handler;

function extractText(html) {
    let $ = cheerio.load(html);
    return $.Text().trim();
}