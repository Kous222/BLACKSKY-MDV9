let handler = async (m, { conn }) => {
    try {
        
        let apiUrl = `https://api.betabotz.eu.org/api/wallpaper/wallhp?apikey=${lann}`;

        
        await conn.sendMessage(m.chat, {
            Bild: { url: apiUrl }, 
            caption: `Berikut ist wallpaper random für Sie!`,
        }, { quoted: m });
    } catch (error) {
        console.error(error);
        throw `Terjadi error: ${error.Nachricht || error}`;
    }
};

handler.tags = ['Bild', 'internet'];
handler.help = ['wallpaper']; 
handler.command = /^(wallpaper)$/i; 
handler.limit = true;

module.exports = handler;