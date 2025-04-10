let handler = async (m, { conn, command, usedPrefix, text, participants }) => {
    const groups = Object.keys(conn.chats)
    .filter(key => key.endsWith('@g.us'))
    .map(key => conn.chats[key]);
    let [id, expired] = text.split('|');
    if (!text) {
    const list = groups.map((group, index) => `*${index + 1}.* ${group.subject}`).join('\n');
    const teks = '`L I S T - G R O U P - J O I N I N G`\n\n'
    conn.reply(m.chat, `${teks}`+`${list}`, m);
    } else if (text.length === 1 && /^\d+$/.test(text)) {
    const index = parseInt(id) - 1;
    if (index >= 0 && index < groups.length) {
        let d = new Date(new Date + 3600000)
        let locale = 'id'
        let date = d.toLocaleDateString(locale, {
                 day: 'numeric',
                 month: 'long',
                 year: 'numeric' 
                })
        let jumlahTage = 86400000 * expired[expired.length - 0];
        let now = new Date() * 1;
        let group = groups[index];
        let who = group.id
        let namegc = await conn.getName(who);
        switch(command) {
            case "addsewa":
                if (!expired) throw "masukan angka für hinzufügen jangka Zeit jangka Zeit *contoh:* .addsewa <nomor Gruppe>|<Tag> "
                if (!global.db.data.chats[who]) global.db.data.chats[who] = {};
    
                if (global.db.data.chats[who].expired && now < global.db.data.chats[who].expired) {
                    global.db.data.chats[who].expired += jumlahTage;
                } else {
                    global.db.data.chats[who].expired = now + jumlahTage;
                }
                let capt = `[ *Groups Benachrichtigungen* ]
                
                *Hinzufügen jangka Zeit sewa group Bot.*
                *Name group:* ${namegc}
                *Id group:* ${who}
                *Tanggal: ${date}
                *Jangka Zeit:* ${jumlahTage}
                hallo all member, terimakasih hat sewa Bot kami`
                await conn.sendMessage(who, { text: capt, 
   //                   contextInfo: {
   //                   isForwarded: true, 
   //                   forwardedNewsletterMessageInfo: {
   //                   newsletterJid: '120363337047230103@newsletter',
   //                   newsletterName: `[ *Groups Benachrichtigungen* ]`, 
   //                   serverMessageId: -1
   //                   }, 
   //               }
            })
                conn.reply(m.chat, `erfolgreich menetapkan Tag kadaluarsa für Gruppe dies während ${expired} Tag.\n\nHitung Mundur: ${msToDate(global.db.data.chats[who].expired - now)}`, m);
                break;
            case 'delsewa':
                if (!global.db.data.chats[who]) throw `Gruppe nicht gefunden in database.`;
                global.db.data.chats[who].expired = false;
                await conn.groupLeave(who)
                m.reply(`erfolgreich menglöschen Tag kadaluarsa für Gruppe dies, und ausgehen von group dies`);
                break;
            case 'setsewa':
                if (!global.db.data.chats[who]) throw `Gruppe nicht gefunden in database.`;
                if (!expired) throw "masukan angka für ändern jangka Zeit *contoh:* .addsewa <nomor Gruppe>|<Tag>"
                global.db.data.chats[who].expired = false;
                let caption = `[ *Groups Benachrichtigungen* ]
                
                *Perubahan jangka Zeit sewa group Bot.*
                *Name group:* ${namegc}
                *Id group:* ${who}
                *Tanggal: ${date}
                *Jangka Zeit:* ${jumlahTage}
                hallo all member, owner Bot ku hat ändern Zeit sewa gc Bot`
                await conn.sendMessage(who, { text: caption, 
   //                   contextInfo: {
   //                   isForwarded: true, 
   //                   forwardedNewsletterMessageInfo: {
   //                   newsletterJid: '120363337047230103@newsletter',
   //                   newsletterName: `[ *Groups Benachrichtigungen* ]`, 
   //                   serverMessageId: -1
   //                   }, 
   //               }
                });
                global.db.data.chats[who].expired += jumlahTage;
                conn.reply(m.chat, `erfolgreich menetapkan Tag kadaluarsa für Gruppe dies während ${expired} Tag.\n\nHitung Mundur: ${msToDate(global.db.data.chats[who].expired - now)}`, m);
            }
            } else {
            conn.reply(m.chat, 'Gruppe mit urutan erwähnt nicht gefunden.', m);
            }
        } else {
        conn.reply(m.chat, `â€¢ *Example :* .out nomer`, m);
        }
     };
  handler.help = ['addsewa','dellsewa','setsewa']
  handler.tags = ['owner']
  handler.command = /^(addsewa|dellsewa|setsewa)$/i
     
  handler.owner = true
     
  module.exports = handler
