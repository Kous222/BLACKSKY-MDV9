const axios = require('axios');

module.exports = {
    before: async function (m) {
        const chat = global.db.data.chats[m.chat];
        if (!chat || !chat.autotranslate) return;

        let text = m.text;

        try {
            let res = await axios.get(`https://api.betabotz.eu.org/api/tools/translate?text=${encodeURIComponent(text)}&lang=de&apikey=${lann}`);
            
            if (res.data.Status && res.data.result && res.data.result !== text) {
                let translatedText = res.data.result;
                m.reply(`*Automatische Übersetzung erkannt*\n\n_${translatedText}_`);
            }
        } catch (error) {
            console.error('Fehler beim Übersetzen des Textes:', error);
        }
    }
};
