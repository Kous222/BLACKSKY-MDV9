// WM:KYOTARO/wa.me/6282111874504

const handler = async (m, { conn, text, command }) => {
    let who = m.mentionedJid[0]
        ? m.mentionedJid[0]
        : m.quoted
        ? m.quoted.sender
        : text
        ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
        : false;

    let globalBlacklist = db.data.globalBlacklist || [];
    if (!db.data.globalBlacklist) db.data.globalBlacklist = globalBlacklist;

    let groupMetadata = await conn.groupMetadata(m.chat);
    let botAdmin = groupMetadata.participants.find(participant => participant.id === conn.user.jid)?.Admin;

    let isAdminOrOwner = groupMetadata.participants.some(participant => 
        participant.id === m.sender && (participant.Admin || participant.id === groupMetadata.owner)
    );

    if (!isAdminOrOwner) {
        return conn.reply(m.chat, 'Du musst Admin oder Besitzer sein, um diese Aktion auszuführen.', m);
    }

    switch (command) {
        case 'blacklist':
            if (!who) return conn.reply(m.chat, 'Markiere oder antworte auf die Person, die du in die Blacklist setzen möchtest.', m);

            try {
                if (globalBlacklist.includes(who)) throw `Die Nummer ${who.split(`@`)[0]} ist bereits in der globalen Blacklist.`;

                // Nutzer zur globalen Blacklist hinzufügen
                globalBlacklist.push(who);
                db.data.globalBlacklist = globalBlacklist;

                await conn.reply(m.chat, `Erfolgreich @${who.split(`@`)[0]} zur globalen Blacklist hinzugefügt.`, m, {
                    contextInfo: { mentionedJid: [who] }
                });

                // Alle Gruppen holen, in denen der Bot Mitglied ist
                const allGroups = await conn.groupFetchAllParticipating();
                const groupIds = Object.keys(allGroups);

                // Nutzer aus allen Gruppen entfernen, in denen der Bot und der Nutzer Mitglieder sind
                for (let groupId of groupIds) {
                    const groupInfo = allGroups[groupId];
                    const isMember = groupInfo.participants.some(member => member.id === who);
                    const botIsAdmin = groupInfo.participants.some(member => member.id === conn.user.jid && member.Admin);

                    if (isMember && botIsAdmin) {
                        try {
                            await conn.groupParticipantsUpdate(groupId, [who], 'remove');
                            await conn.sendMessage(groupId, {
                                text: `Nutzer @${who.split('@')[0]} ist in der globalen Blacklist und wurde aus der Gruppe entfernt.`,
                                mentions: [who]
                            });
                        } catch (error) {
                            console.error(`Fehler beim Kicken des Nutzers aus der Gruppe ${groupId}:`, error.message || error);
                        }
                    }

                    // 1 Sekunde warten zwischen jedem Kick-Versuch
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
            } catch (e) {
                throw e;
            }
            break;

        case 'unblacklist':
            if (!who) throw 'Markiere oder antworte auf die Person, die du von der Blacklist entfernen möchtest.';

            try {
                const index = globalBlacklist.indexOf(who);
                if (index === -1) throw `Die Nummer ${who.split(`@`)[0]} ist nicht in der globalen Blacklist.`;

                // Nutzer aus der globalen Blacklist entfernen
                globalBlacklist.splice(index, 1);
                db.data.globalBlacklist = globalBlacklist;

                await conn.reply(m.chat, `Erfolgreich @${who.split(`@`)[0]} von der globalen Blacklist entfernt.`, m, {
                    contextInfo: { mentionedJid: [who] }
                });
            } catch (e) {
                throw e;
            }
            break;

        case 'listblacklist':
        case 'listbl':
            let txt = `*「 Registrierte Nummern in der globalen Blacklist 」*\n\n*Gesamt:* ${globalBlacklist.length}\n\n┌─[ *Blacklist* ]\n`;

            for (let id of globalBlacklist) {
                txt += `├ @${id.split("@")[0]}\n`;
            }
            txt += "└─•";

            return conn.reply(m.chat, txt, m, {
                contextInfo: { mentionedJid: globalBlacklist }
            });
            break;
    }
};

// Nutzer automatisch aus der Gruppe entfernen, wenn er/sie eine Nachricht sendet und in der Blacklist ist
handler.before = function (m, { conn, isAdmin }) {
    if (!m.isGroup || m.fromMe) return;

    let globalBlacklist = db.data.globalBlacklist || [];

    if (globalBlacklist.includes(m.sender) && !isAdmin) {
        conn.sendMessage(m.chat, {
            text: `Nutzer @${m.sender.split('@')[0]} ist in der globalen Blacklist und wurde aus der Gruppe entfernt.`,
            mentions: [m.sender]
        });
        conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
    }
};

handler.help = ['blacklist', 'unblacklist', 'listblacklist'];
handler.tags = ['group'];
handler.command = ['blacklist', 'unblacklist', 'listbl', 'listblacklist'];
handler.admin = handler.group = true;
handler.owner = true;

module.exports = handler;
