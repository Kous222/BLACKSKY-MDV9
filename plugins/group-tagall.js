let handler = async (m, { conn, args, participants }) => {
    // Check if user is admin
    const groupInfo = await conn.groupMetadata(m.chat);
    const isAdmin = groupInfo.participants.some(p => 
        p.id === m.sender && ['admin', 'superadmin'].includes(p.admin)
    );
    // Check if the command is 'tagall'
    if (args[0] === 'tagall') {
        let txt = `🎀 *「 TAG NOTIFICATION 」* 🎀\n\n`;
        txt += `👤 *Sender:*  *${m.pushName}*\n`;
        txt += `💬 *Message:*  ${text ? `_${text}_` : '✨ No Message! ✨'}\n\n`;
        txt += `🎯 *Tagged Members:*\n`;

        // Loop through participants & mention
        participants.forEach(mem => { 
            txt += `💌 @${mem.id.split('@')[0]}\n`;
        });

        txt += `\n💖 *Stay connected & engaged!* 💖`;

        // Send the stylish message
        await client.sendMessage(m.chat, { 
            text: txt, 
            mentions: participants.map(a => a.id) 
        }, { quoted: m });
    }
};

handler.command = handler.help = ['tagall'];
handler.tags = ['group'];
handler.exp = 0;
handler.limit = true;
handler.premium = false;

module.exports = handler;
