let badwordRegex = /anj|asw|kont|ToIol|gblk|T0lol|Bgsd|ajn|anjingk|bajingan|bangsat|kontol|memek|pepekq|meki|titit|peler|tetek|toket|[zensiert]|goblok|tolol|idiot|ngentotd|jembut|bego|dajjal|jancuk|pantek|pukimak|kimak|kampang|lonte|colimek|pelacur|henceut|nigga|fuck|dick|bitch|tits|bastard|asshole/i; // tambahin selbst

async function before(m, { isBotAdmin }) {
    if (m.isBaileys && m.fromMe) return;
    let chat = global.db.data.chats[m.chat];
    let user = global.db.data.users[m.sender];
    let isBadword = badwordRegex.exec(m.text);
    
    if (chat.antiToxic && isBadword && m.isGroup) {
        m.reply(`*⚠️ Toxisches Wort erkannt ⚠️*

WARNUNG: BITTE KEINE TOXISCHEN WÖRTER VERWENDEN, UM EINEN ANGENEHMEN CHAT ZU GEWÄHRLEISTEN!
`);    
        
    }
    return true;
}

module.exports = { before };

//wenn du die Kick-Funktion verwenden möchtest, musst du möglicherweise den Bot neu starten