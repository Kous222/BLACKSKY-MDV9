let handler = async (m, { conn, command, args, usedPrefix }) => {
    try {
        const user = global.db.data.users[m.sender];
        const tag = '@' + m.sender.split('@')[0]; 
        let playButton = user.playButton || 0; 
        function formatNumber(number) {
            if (number >= 1000000) {
                return (number / 1000000).toFixed(1) + 'Jt';
            } else if (number >= 1000) {
                return (number / 1000).toFixed(1) + 'K';
            } else {
                return number;
            }
        }
        if (command === 'akunyt') {
            let targetNumber = m.sender;
            let targetTag = tag; 
            if (args.length > 0) {
                targetNumber = formatNumber(args[0]);
                targetTag = '@' + args[0].split('@')[0]; 
            }
            if (!global.db.data.users[targetNumber]?.youtube_account) {
                return conn.sendMessage(m.chat, { text: `Hey ${targetTag}, erstellen akun besonders erst\nTippe: ${usedPrefix}createakunyt`, contextInfo: { mentionedJid: [m.sender] }}, { quoted: m });
            }
            const targetUser = global.db.data.users[targetNumber];
            const formattedSubscribers = formatNumber(targetUser.subscribers || 0);
            const formattedViewers = formatNumber(targetUser.viewers || 0);
            const formattedLike = formatNumber(targetUser.like || 0);
            const silverButton = targetUser.playButton >= 1 ? '✅' : '❎';
            const goldButton = targetUser.playButton >= 2 ? '✅' : '❎';
            const diamondButton = targetUser.playButton >= 3 ? '✅' : '❎';
            return conn.sendMessage(m.chat, { text: `📈 Konto YouTube ${targetTag} 📉\n
🧑🏻‍💻 *Streamer:* ${targetUser.registered ? targetTag : conn.getName(targetNumber)}
🌐 *Channel:* ${targetUser.youtube_account}
👥 *Subscribers:* ${formattedSubscribers}
🪬 *Viewers:* ${formattedViewers}
👍🏻 *Like:* ${formattedLike}

⬜ *Silver PlayButton:* ${silverButton}
🟧 *Gold PlayButton:* ${goldButton}
💎 *Diamond PlayButton:* ${diamondButton}`, contextInfo: { mentionedJid: [m.sender] }}, { quoted: m });
        } else if (/^live youtuber/i.test(command)) {
        } else {
            return await conn.reply("Befehl nicht dikenali.\n*.akunyt*\n> für mengecek akun YouTube Sie\n*.live youtuber [judul live]*\n> für mestarten aktivitas live streaming.");
        }
    } catch (err) {
        console.error(err);
        return m.reply("Ein Error ist aufgetreten in verarbeiten Befehl.");
    }
};
handler.help = ['akunyt [nomor]'];
handler.tags = ['rpg'];
handler.command = /^(akunyt)$/i;
handler.register = true;
handler.group = true;
handler.rpg = true;
module.exports = handler;