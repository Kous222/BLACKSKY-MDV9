let handler = async (m, { conn }) => {
    try {
        const apiKey = global.lann || 'DEIN_API_KEY_HIER'; // Optional: global Variable nutzen
        const apiUrl = `https://api.betabotz.eu.org/api/wallpaper/wallhp2?apikey=${apiKey}`;

        await conn.sendMessage(m.chat, {
            image: { url: apiUrl },
            caption: `🖼️ Hier ist ein zufälliges Wallpaper (Version 2) für dich!`
        }, { quoted: m });

    } catch (error) {
        console.error('[WALLPAPER2 FEHLER]', error);
        throw `❌ *Fehler beim Abrufen des Wallpapers:*\n${error.message || error}`;
    }
};

handler.tags = ['bild', 'internet'];
handler.help = ['wallpaper2'];
handler.command = /^wallpaper2$/i;
handler.limit = true;

module.exports = handler;
