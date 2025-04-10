const axios = require('axios');

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `*Example:* ${usedPrefix + command} hallo`;
    conn.beta = conn.beta ? conn.beta : {};
    if (!conn.beta[m.sender]) {
        conn.beta[m.sender] = {
            nachricht: []
        };
        conn.beta[m.sender].timeout = setTimeout(() => {
            delete conn.beta[m.sender];
        }, 300000);

        m.reply(`Hallo \`${m.name}\`👋, Ich bin bereit, Ihnen zu helfen!`);
    } else {
        clearTimeout(conn.beta[m.sender].timeout);
        conn.beta[m.sender].timeout = setTimeout(() => {
            delete conn.beta[m.sender];
        }, 300000);
    }

    let name = conn.getName(m.sender);
    const previousMessages = conn.beta[m.sender].nachricht;
  
/** - Ändere diesen Prompt nach deinen Wünschen 
    - Sorge für eine logische Struktur, die leicht zu verstehen ist!
**/
    const messages = [
        { role: "system", content: "Du bist BetaBotz AI, eine KI, die von Lann erstellt wurde, um jedem freundlich zu helfen :). Füge Emoticons in jede Antwort ein." },
        { role: "assistant", content: `Du bist BetaBotz AI, ein Bot, der von Lann erstellt wurde, um alle Benutzeranfragen zu beantworten. Beantworte jede Frage freundlich und mit Emoticons.` },
        ...previousMessages.map((msg, i) => ({ role: i % 2 === 0 ? 'user' : 'assistant', content: msg })),
        { role: "user", content: text }
    ];
    try {
        const aiBeta = async function(message) {
            return new Promise(async (resolve, reject) => {
                try {
                    const params = {
                        message: message,
                        apikey: lann
                    };
                    const { data } = await axios.post('https://api.betabotz.eu.org/api/search/openai-custom', params);
                    resolve(data);
                } catch (error) {
                    reject(error);
                }
            });
        };

        let res = await aiBeta(messages);
        if (res && res.result) {
            await m.reply(res.result);
            conn.beta[m.sender].nachricht = messages.map(msg => msg.content);
        } else {
            throw "Fehler beim Abrufen der Daten";
        }
    } catch (e) {
        throw "Fehler aufgetreten"
    }
};

handler.command = handler.help = ['ai','openai','chatgpt'];
handler.tags = ['tools'];
handler.Premium = false
module.exports = handler;
