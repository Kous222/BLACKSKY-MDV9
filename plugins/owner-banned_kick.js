// WM:KYOTARO/wa.me/6282111874504

const handler = async (m, { conn, text, command }) => {
    const who = m.mentionedJid?.[0]
        ?? m.quoted?.sender
        ?? (text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false);

    // Atlas-Kompatibilität: global.db verwenden
    const globalBlacklist = global.db.data.globalBlacklist ||= [];

    const groupMetadata = await conn.groupMetadata(m.chat);
    const isAdminOrOwner = groupMetadata.participants.some(participant =>
        participant.id === m.sender &&
        (
            participant.admin === 'admin' ||
            participant.admin === 'superadmin' ||
            participant.id === groupMetadata.owner
        )
    );

    if (!isAdminOrOwner) {
        return conn.reply(m.chat, '❌ Du musst Admin oder Besitzer sein, um diese Aktion auszuführen.', m);
    }

    switch (command) {
        case 'blacklist':
            if (!who) return conn.reply(m.chat, '⚠️ Markiere oder antworte auf die Person, die du in die Blacklist setzen möchtest.', m);

            if (globalBlacklist.includes(who)) {
                return conn.reply(m.chat, `🚫 Die Nummer @${who.split('@')[0]} ist bereits in der globalen Blacklist.`, m, {
                    mentions: [who]
                });
            }

            globalBlacklist.push(who);
            await conn.reply(m.chat, `✅ Erfolgreich @${who.split('@')[0]} zur globalen Blacklist hinzugefügt.`, m, {
                mentions: [who]
            });

            const allGroups = await conn.groupFetchAllParticipating();
            const groupIds = Object.keys(allGroups);

            for (let groupId of groupIds) {
                const group = allGroups[groupId];
                const isMember = group.participants.some(p => p.id === who);
                const botIsAdmin = group.participants.some(p =>
                    p.id === conn.user.jid &&
                    (p.admin === 'admin' || p.admin === 'superadmin')
                );

                if (isMember && botIsAdmin) {
                    try {
                        await conn.groupParticipantsUpdate(groupId, [who], 'remove');
                        await conn.sendMessage(groupId, {
                            text: `🚷 Nutzer @${who.split('@')[0]} ist in der globalen Blacklist und wurde entfernt.`,
                            mentions: [who]
                        });
                    } catch (err) {
                        console.error(`Fehler in Gruppe ${groupId}:`, err);
                    }
                    await new Promise(resolve => setTimeout(resolve, 800));
                }
            }
            break;

        case 'unblacklist':
            if (!who) return conn.reply(m.chat, '⚠️ Markiere oder antworte auf die Person, die du entfernen möchtest.', m);

            const index = globalBlacklist.indexOf(who);
            if (index === -1) {
                return conn.reply(m.chat, `❌ Die Nummer @${who.split('@')[0]} ist nicht in der Blacklist.`, m, {
                    mentions: [who]
                });
            }

            globalBlacklist.splice(index, 1);
            await conn.reply(m.chat, `✅ @${who.split('@')[0]} wurde von der Blacklist entfernt.`, m, {
                mentions: [who]
            });
            break;

        case 'listblacklist':
        case 'listbl':
            let textList = `*「 🌐 Globale Blacklist 」*\n\n*Gesamt:* ${globalBlacklist.length}\n\n┌─[ *Blacklist* ]\n`;
            for (let id of globalBlacklist) textList += `├ @${id.split("@")[0]}\n`;
            textList += `└─•`;

            return conn.reply(m.chat, textList, m, {
                mentions: globalBlacklist
            });
    }
};

// Auto-Kick bei Nachricht von Blacklist-Nutzer
handler.before = async function (m, { conn, isAdmin }) {
    if (!m.isGroup || m.fromMe) return;
    const globalBlacklist = global.db.data.globalBlacklist ||= [];

    if (globalBlacklist.includes(m.sender) && !isAdmin) {
        await conn.sendMessage(m.chat, {
            text: `🚷 Nutzer @${m.sender.split('@')[0]} ist in der globalen Blacklist und wurde entfernt.`,
            mentions: [m.sender]
        });
        await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
    }
};

handler.help = ['blacklist', 'unblacklist', 'listblacklist'];
handler.tags = ['group'];
handler.command = ['blacklist', 'unblacklist', 'listbl', 'listblacklist'];
handler.admin = handler.group = true;
handler.owner = true;

module.exports = handler;
