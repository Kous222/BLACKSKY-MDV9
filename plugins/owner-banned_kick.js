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

    if (!botAdmin) {
        return conn.reply(m.chat, 'Bot müssen werden Admin für mengelola blacklist und durchführen kick.', m);
    }

    switch (command) {
        case 'blacklist':
            if (!who) return conn.reply(m.chat, 'Tag oder reply person das/der/die ingin in-blacklist.', m);

            try {
                if (globalBlacklist.includes(who)) throw `Nomor ${who.split(`@`)[0]} bereits gibt in liste *Blacklist* in einer Weise global.`;

                // Hinzufügenkan Nutzer zu liste blacklist global
                globalBlacklist.push(who);
                db.data.globalBlacklist = globalBlacklist;

                await conn.reply(m.chat, `Sukses hinzufügen @${who.split(`@`)[0]} zu *Blacklist* in einer Weise global.`, m, {
                    contextInfo: { mentionedJid: [who] }
                });

                // Fetch alle Gruppe Ort Bot werden mitglied
                const allGroups = await conn.groupFetchAllParticipating();
                const groupIds = Object.keys(allGroups);

                // Kick Nutzer von alle Gruppe in welche Bot und Nutzer erwähnt werden mitglied
                for (let groupId of groupIds) {
                    const groupInfo = allGroups[groupId];
                    const isMember = groupInfo.participants.some(member => member.id === who);
                    const botIsAdmin = groupInfo.participants.some(member => member.id === conn.user.jid && member.Admin);

                    if (isMember && botIsAdmin) {
                        try {
                            await conn.groupParticipantsUpdate(groupId, [who], 'remove');
                            await conn.sendMessage(groupId, {
                                text: `Nutzer @${who.split('@')[0]} hat in-blacklist in einer Weise global und dikeluarkan von Gruppe dies.`,
                                mentions: [who]
                            });
                        } catch (error) {
                            console.error(`fehlgeschlagen meng-kick Nutzer von Gruppe ${groupId}:`, error.message || error);
                        }
                    }

                    // Hinzufügenkan jeda 1 Sekunden in zwischen jeder permintaan kick
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
            } catch (e) {
                throw e;
            }
            break;

        case 'unblacklist':
            if (!who) throw 'Tag oder reply person das/der/die ingin in-unblacklist.';

            try {
                const index = globalBlacklist.indexOf(who);
                if (index === -1) throw `Nomor ${who.split(`@`)[0]} nicht gibt in liste *Blacklist* global.`;

                // delete Nutzer von blacklist global
                globalBlacklist.splice(index, 1);
                db.data.globalBlacklist = globalBlacklist;

                await conn.reply(m.chat, `Sukses menglöschen @${who.split(`@`)[0]} von *Blacklist* global.`, m, {
                    contextInfo: { mentionedJid: [who] }
                });
            } catch (e) {
                throw e;
            }
            break;

        case 'listblacklist':
        case 'listbl':
            let txt = `*「 register Nomor Blacklist Global 」*\n\n*Total:* ${globalBlacklist.length}\n\n┌─[ *Blacklist* ]\n`;

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

// Mengeluarkan otomatis Nutzer das/der/die in-blacklist wenn senden nachricht in Gruppe welche auch
handler.before = function (m, { conn, isAdmin }) {
    if (!m.isGroup || m.fromMe) return;

    let globalBlacklist = db.data.globalBlacklist || [];

    if (globalBlacklist.includes(m.sender) && !isAdmin) {
        conn.sendMessage(m.chat, {
            text: `Nutzer @${m.sender.split('@')[0]} gibt in liste blacklist global und wird dikeluarkan von Gruppe.`,
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

//apalah