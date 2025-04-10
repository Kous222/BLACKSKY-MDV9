let handler = async (m, {conn, usedPrefix}) => {
        
    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let user = global.db.data.users[who]
    if (!(who in global.db.data.users)) throw `✳️ Der Nutzer ist nicht in meiner database`
    conn.reply(m.chat, `
┌───⊷ *BILANZ* ⊶
▢ *📌name* : _@${who.split('@')[0]}_
▢ *💎Diamanten* : _${user.Diamant}_
▢ *⬆️XP* : _Gesamt ${user.exp}_
▢ *GELD* : _Gesamt ${user.Münzen}_
└──────────────

*HINWEIS :* 
Du kannst 💎 Diamanten mit dem Befehl kaufen
❏ *${usedPrefix}buydm <Anzahl dm>* / *${usedPrefix}kaufedia <Anzahl>*
❏ *${usedPrefix}buyalldm* / *${usedPrefix}kaufalledia*`, m, { mentions: [who] })
}
handler.help = ['balance', 'kontostand', 'guthaben']
handler.tags = ['econ']
handler.command = ['bal', 'balance', 'kontostand', 'guthaben'] 
handler.rpg = true
module.exports = handler;
