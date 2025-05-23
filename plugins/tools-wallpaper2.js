let handler = async (m, { conn }) => {
    try {
        
        let apiUrl = `https://api.betabotz.eu.org/api/wallpaper/wallhp2?apikey=${lann}`;

      

        await conn.sendMessage(m.chat, {
            Bild: { url: apiUrl }, 
            caption: `Berikut ist wallpaper random (versi 2) für Sie!`,
        }, { quoted: m });
    } catch (error) {
        console.error(error);
        throw `Terjadi error: ${error.Nachricht || error}`;
    }
};

handler.tags = ['Bild', 'internet'];
handler.help = ['wallpaper2']; 
handler.command = /^(wallpaper2)$/i; 
handler.limit = true;

module.exports = handler;