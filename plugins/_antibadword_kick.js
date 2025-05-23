// let badwordRegex = /anj|asw|kont|ToIol|gblk|T0lol|Bgsd|ajn|anjingk|bajingan|bangsat|kontol|memek|pepekq|meki|titit|peler|tetek|toket|[zensiert]|goblok|tolol|idiot|ngentotd|jembut|bego|dajjal|jancuk|pantek|pukimak|kimak|kampang|lonte|colimek|pelacur|henceut|nigga|fuck|dick|bitch|tits|bastard|asshole/i; // tambahin selbst

// async function before(m, { isBotAdmin }) {
//     if (m.isBaileys && m.fromMe) return;
//     let chat = global.db.data.chats[m.chat];
//     let user = global.db.data.users[m.sender];
//     let isBadword = badwordRegex.exec(m.text);
    
//     if (chat.antiToxic && isBadword && m.isGroup) {
//         user.warning += 1;
//         m.reply(`${user.warning >= 5 ? '*⚠️ Warnung! Du hast 5 Verwarnungen erreicht und wirst GEKICKT! ⚠️*' : '*⚠️ Toxisches Wort erkannt ⚠️ *'}

// WARNUNG!: ${user.warning} / 5

// [❗] Wenn du 5 Verwarnungen erreichst, wirst du automatisch GEKICKT!`);
        
//         if (user.warning >= 5) {
//             user.warning = 0;
//             this.groupParticipantsUpdate(m.chat, [m.sender], 'remove')

            
//         }
//     }
//     return true;
// }

// module.exports = { before };

// //wenn du möchtest, dass die Kick-Funktion richtig funktioniert, musst du möglicherweise den Bot neu starten
// //wähle eine Option zwischen kick/non-kick