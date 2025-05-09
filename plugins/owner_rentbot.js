let handler = async (m, { conn, command, usedPrefix, text, participants }) => {
    const groups = Object.keys(conn.chats)
        .filter(key => key.endsWith('@g.us'))
        .map(key => conn.chats[key]);

    let [id, expired] = text.split('|');

    if (!text) {
        const list = groups.map((group, index) => `*${index + 1}.* ${group.subject}`).join('\n');
        const header = '`📋 LISTE DER GRUPPEN ZUM HINZUFÜGEN / ÄNDERN`\n\n';
        conn.reply(m.chat, `${header}${list}`, m);
    } else if (text.length >= 1 && /^\d+$/.test(id)) {
        const index = parseInt(id) - 1;
        if (index >= 0 && index < groups.length) {
            let now = Date.now();
            let daysMs = 86400000 * parseInt(expired);
            let group = groups[index];
            let groupId = group.id;
            let groupName = await conn.getName(groupId);
            let date = new Date().toLocaleDateString('de-DE', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });

            switch (command) {
                case "addsewa":
                    if (!expired) throw "Bitte gib die Anzahl der Tage an. Beispiel: .addsewa <GruppenNr>|<Tage>";

                    if (!global.db.data.chats[groupId]) global.db.data.chats[groupId] = {};

                    if (global.db.data.chats[groupId].expired && now < global.db.data.chats[groupId].expired) {
                        global.db.data.chats[groupId].expired += daysMs;
                    } else {
                        global.db.data.chats[groupId].expired = now + daysMs;
                    }

                    let messageAdd = `[ *📢 Gruppenbenachrichtigung* ]

✅ *Bot-Mietzeitraum wurde hinzugefügt!*
📌 *Gruppenname:* ${groupName}
🆔 *Gruppen-ID:* ${groupId}
📅 *Datum:* ${date}
⏳ *Mietdauer:* ${expired} Tag(e)

Hallo zusammen! Danke, dass ihr unseren Bot gemietet habt. Viel Spaß!`;

                    await conn.sendMessage(groupId, { text: messageAdd });
                    conn.reply(m.chat, `✅ Erfolgreich eine Mietdauer von *${expired} Tag(en)* für die Gruppe gesetzt.\n⏳ Verbleibende Zeit: ${msToDate(global.db.data.chats[groupId].expired - now)}`, m);
                    break;

                case 'delsewa':
                    if (!global.db.data.chats[groupId]) throw `❌ Gruppe nicht in der Datenbank gefunden.`;
                    global.db.data.chats[groupId].expired = false;
                    await conn.groupLeave(groupId);
                    m.reply(`✅ Mietzeit erfolgreich entfernt. Bot hat die Gruppe verlassen.`);
                    break;

                case 'setsewa':
                    if (!global.db.data.chats[groupId]) throw `❌ Gruppe nicht in der Datenbank gefunden.`;
                    if (!expired) throw "Bitte gib die Anzahl der Tage an. Beispiel: .setsewa <GruppenNr>|<Tage>";

                    let messageSet = `[ *📢 Gruppenbenachrichtigung* ]

♻️ *Mietzeit des Bots wurde aktualisiert!*
📌 *Gruppenname:* ${groupName}
🆔 *Gruppen-ID:* ${groupId}
📅 *Datum:* ${date}
⏳ *Neue Mietdauer:* ${expired} Tag(e)

Hallo zusammen! Der Mietzeitraum des Bots wurde aktualisiert.`;

                    await conn.sendMessage(groupId, { text: messageSet });
                    global.db.data.chats[groupId].expired = now + daysMs;

                    conn.reply(m.chat, `✅ Erfolgreich eine neue Mietdauer von *${expired} Tag(en)* für die Gruppe gesetzt.\n⏳ Verbleibende Zeit: ${msToDate(global.db.data.chats[groupId].expired - now)}`, m);
                    break;
            }
        } else {
            conn.reply(m.chat, '❌ Gruppe mit dieser Nummer nicht gefunden.', m);
        }
    } else {
        conn.reply(m.chat, `❌ Ungültiger Befehl. Beispiel: *.addsewa 2|30*`, m);
    }
};

handler.help = ['addsewa', 'delsewa', 'setsewa'];
handler.tags = ['owner'];
handler.command = /^(addsewa|delsewa|setsewa)$/i;
handler.owner = true;

module.exports = handler;

function msToDate(ms) {
    let d = Math.floor(ms / (1000 * 60 * 60 * 24));
    let h = Math.floor(ms / (1000 * 60 * 60)) % 24;
    let m = Math.floor(ms / (1000 * 60)) % 60;
    let s = Math.floor(ms / 1000) % 60;
    return `${d} Tag(e), ${h} Std, ${m} Min, ${s} Sek`;
}
