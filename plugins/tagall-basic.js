/**
 * VOX MD Styled Tag All Implementation
 * This style mimics the VOX MD bot's elegant and clean message structure
 * Only group admins can use the command
 */

let handler = async (m, { conn, args, participants }) => {
    // Fetch group metadata and check if the user is an admin
    const groupInfo = await conn.groupMetadata(m.chat);
    const isAdmin = groupInfo.participants.some(p => 
        p.id === m.sender && ['admin', 'superadmin'].includes(p.admin)
    );
    
    // Only allow admins to use this command
    if (!isAdmin) {
        return m.reply('⚠️ *Nur Administratoren können diesen Befehl verwenden!*');
    }
    
    // Construct the VOX MD styled message
    let teks = `╭═══════════════════════════════════⊷\n`;
    teks += `║ ❤️ *Gruppen-Ankündigung* ❤️\n\n`;
    teks += `║ 😇 *Nachricht von:* _${m.pushName}_\n\n`;
    teks += `║ 💬 *Inhalt:* ${args.join(' ') || 'Hallo zusammen! ✨'}\n\n`;
    teks += `║ 😁 *Erwähnte Mitglieder:* \n`;

    // Add @ mentions for each participant
    const users = participants.map(u => u.id);
    for (let user of users) {
        teks += `║ 💌 @${user.split('@')[0]}\n`;
    }

    teks += `╰═══════════════════════════════════⊷\n\n`;
    teks += `💖 *Bleibt verbunden und viel Spaß im Chat!* 💖`;

    // Send the message with @ mentions and styled content
    await conn.sendMessage(m.chat, { 
        text: teks, 
        mentions: users 
    }, { quoted: m });
};

handler.help = ['tagall', 'everyone'];
handler.tags = ['group'];
handler.command = /^(everyone|alletaggen)$/i;
handler.group = true;

module.exports = handler;
