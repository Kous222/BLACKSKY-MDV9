let axios = require('axios');
let cheerio = require('cheerio');

let handler = async (m, { conn, command, usedPrefix }) => {
    const apiKey = 'DEIN_APIKEY_HIER'; // <-- Ersetze das durch deinen echten API-Schlüssel
    conn.sessionsMail = conn.sessionsMail || {};

    // Alte Sessions nach 30 Minuten löschen
    for (let user in conn.sessionsMail) {
        let { lastCheckedAt } = conn.sessionsMail[user];
        if (Date.now() - lastCheckedAt > 30 * 60 * 1000) {
            delete conn.sessionsMail[user];
        }
    }

    if (command === "tempmail") {
        if (conn.sessionsMail[m.sender]) {
            return m.reply(`📧 Du hast bereits eine temporäre Mail:\n\n📩 *Email:* ${conn.sessionsMail[m.sender].email}\n⏳ *Warte ca. 5–10 Minuten, bevor du Nachrichten prüfst.*`);
        }

        try {
            let res = await axios.get(`https://api.betabotz.eu.org/api/tools/create-temp-mail?apikey=${apiKey}`);
            if (!res.data.Status) throw "❌ Fehler beim Erstellen der temporären E-Mail!";

            let email = res.data.result;
            conn.sessionsMail[m.sender] = {
                email,
                createdAt: Date.now(),
                lastCheckedAt: Date.now()
            };

            m.reply(`✅ *Deine temporäre E-Mail wurde erstellt:*\n\n📩 *Email:* ${email}\n⏳ *Warte ca. 5–10 Minuten, bevor du Nachrichten prüfst.*`);
        } catch (e) {
            console.error(e);
            m.reply("❌ Fehler beim Erstellen der E-Mail!");
        }
    } else if (command === "cekmail" || command === "checkmail") {
        if (!conn.sessionsMail[m.sender]) {
            return m.reply(`⚠️ Du hast noch keine temporäre Mail-Adresse!\nNutze \`${usedPrefix}tempmail\`, um eine zu erstellen.`);
        }

        let { email } = conn.sessionsMail[m.sender];
        conn.sessionsMail[m.sender].lastCheckedAt = Date.now();

        try {
            let res = await axios.get(`https://api.betabotz.eu.org/api/tools/cek-msg-tmp-mail?email=${email}&apikey=${apiKey}`);
            if (!res.data.Status) throw "❌ Fehler beim Abrufen der E-Mails!";

            let messages = res.data.result;
            if (messages.length === 0) {
                return m.reply(`📭 Es sind noch keine neuen Nachrichten an ${email} eingetroffen.\n⏳ Versuche es später erneut.`);
            }

            let antwort = messages.map((msg) => {
                let text = extractText(msg.html || msg.Text);
                return `📬 *Neue Nachricht!*\n\n💌 *Von:* ${msg.sf}\n📢 *Betreff:* ${msg.s}\n🕒 *Zeit:* ${msg.rr}\n\n📨 *Inhalt:*\n${text}`;
            }).join("\n\n");

            m.reply(antwort);
        } catch (e) {
            console.error(e);
            m.reply("❌ Fehler beim Überprüfen der E-Mails!");
        }
    }
};

handler.command = ['tempmail', 'cekmail', 'checkmail'];
handler.tags = ['tools'];
handler.help = ['tempmail', 'cekmail', 'checkmail'];
handler.limit = true;

module.exports = handler;

// Hilfsfunktion: HTML zu Text umwandeln
function extractText(html) {
    let $ = cheerio.load(html);
    return $.text().trim();
}
