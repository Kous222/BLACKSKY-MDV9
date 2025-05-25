let handler = async (m, { conn, isOwner }) => {
    // Chats banned globally (marked by isBanned flag)
    let chats = Object.entries(global.db.data.chats).filter(([jid, chat]) => chat.isBanned);

    // Global banned users (from global.db.data.users)
    let users = Object.entries(global.db.data.users)
        .filter(([jid, user]) => user.banned && (!user.bannedTime || user.bannedTime > Date.now()));

    // Group banned users (from memgc in chats)
    let groupBannedUsers = [];
    for (const [chatId, chatData] of Object.entries(global.db.data.chats)) {
        if (chatData.memgc) {
            for (const [userId, userData] of Object.entries(chatData.memgc)) {
                if (userData.banned && (!userData.bannedTime || userData.bannedTime > Date.now())) {
                    groupBannedUsers.push({
                        userId,
                        groupId: chatId,
                        bannedTime: userData.bannedTime || 0
                    });
                }
            }
        }
    }

    // Helper to get user or group names safely
    let getNameSafe = async (jid) => {
        try {
            return await conn.getName(jid);
        } catch {
            return 'Unbekannt';
        }
    };

    let caption = `┌〔 *Gesperrte Chats* 〕
├ Anzahl: ${chats.length}${chats.length > 0 ? '\n' + (await Promise.all(chats.map(async ([jid], i) => {
        let name = await getNameSafe(jid);
        return `├ ${i + 1}. ${name}\n├ ${isOwner ? '@' + jid.split('@')[0] : jid}`;
    }))).join('\n') : ''}
└────

┌〔 *Global gesperrte Nutzer* 〕
├ Anzahl: ${users.length}${users.length > 0 ? '\n' + (await Promise.all(users.map(async ([jid, user], i) => {
        let name = await getNameSafe(jid);
        // Show remaining ban time if temporary
        let timeInfo = user.bannedTime && user.bannedTime > Date.now()
            ? ` (noch ${Math.ceil((user.bannedTime - Date.now()) / 60000)} min)`
            : '';
        return `├ ${i + 1}. ${name}${timeInfo}\n├ ${isOwner ? '@' + jid.split('@')[0] : jid}`;
    }))).join('\n') : ''}
└────

┌〔 *In Gruppen gesperrte Nutzer* 〕
├ Anzahl: ${groupBannedUsers.length}${groupBannedUsers.length > 0 ? '\n' + (await Promise.all(groupBannedUsers.map(async (data, i) => {
        let userName = await getNameSafe(data.userId);
        let groupName = await getNameSafe(data.groupId);
        let remainingTime = data.bannedTime > Date.now()
            ? Math.ceil((data.bannedTime - Date.now()) / 60000)
            : 0;
        let timeInfo = remainingTime > 0 ? ` (noch ${remainingTime} min)` : '';
        return `├ ${i + 1}. ${userName}${timeInfo}\n├ Gruppe: ${groupName}\n├ ${isOwner ? '@' + data.userId.split('@')[0] : data.userId}`;
    }))).join('\n') : ''}
└────`.trim();

    // Collect mentions only for owners
    const allMentions = [];
    if (isOwner) {
        chats.forEach(([jid]) => allMentions.push(jid));
        users.forEach(([jid]) => allMentions.push(jid));
        groupBannedUsers.forEach(data => allMentions.push(data.userId));
    }

    await conn.sendMessage(m.chat, {
        text: caption,
        mentions: allMentions
    }, { quoted: m });
};

handler.help = ['bannedlist', 'banlist', 'gesperrtliste'];
handler.tags = ['info'];
handler.command = /^listban(ned)?|ban(ned)?list|gesperrtliste|sperrliste|banlist$/i;
handler.owner = false;

module.exports = handler;
