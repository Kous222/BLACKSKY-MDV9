let handler = async (m, { conn, command, args, usedPrefix }) => {
    let type = (args[0] || '').toLowerCase();
    let _type = (args[0] || '').toLowerCase();
    let user = global.db.data.users[m.sender];

    let caption = `*S C H M I E D E*

> *H E R S T E L L B A R E - G E G E N S T Ä N D E*
*[ ⛏️ ]* • Spitzhacke 
*[ ⚔️ ]* • Schwert 
*[ 🎣 ]* • Angelrute 
*[ 🥼 ]* • Rüstung 
*[ 🦯 ]* • Katana 
*[ 🪓 ]* • Axt 
*[ 🏹 ]* • Bogen 
*[ 🔪 ]* • Messer 

> *R E Z E P T E*
*[ ⛏️ ]* • _Spitzhacke_
• _10_ || *Holz*
• _5_ || *Stein*
• _5_ || *Eisen*
• _20_ || *Schnur*

*[ 🪓 ]* • _Axt_
• _15_ || *Holz*
• _10_ || *Stein*
• _15_ || *Eisen*
• _10_ || *Schnur*

*[ ⚔️ ]* • _Schwert_
• _10_ || *Holz*
• _15_ || *Eisen*

*[ 🔪 ]* • _Messer_
• _15_ || *Holz*
• _20_ || *Eisen*

*[ 🏹 ]* • _Bogen_
• _10_ || *Holz*
• _5_ || *Eisen*
• _10_ || *Schnur*

*[ 🎣 ]* • _Angelrute_
• _10_ || *Holz*
• _2_ || *Eisen*
• _20_ || *Schnur*

*[ 🥼 ]* • _Rüstung_
• _5_ || *Eisen*
• _1_ || *Diamant*

*[ 🦯 ]* • _Katana_
• _10_ || *Holz*
• _15_ || *Eisen*
• _5_ || *Diamant*
• _3_ || *Smaragd*

> *H E R S T E L L U N G*
• _Beispiel_ :
.craft _schwert_
`.trim();

    try {
        if (/craft|Crafting|blacksmith/i.test(command)) {
            const count = args[1] && args[1].length > 0 ? Math.min(99999999, Math.max(parseInt(args[1]), 1)) : !args[1] || args.length < 3 ? 1 : Math.min(1, count);
            switch (type) {
                case 'pickaxe':
                    if (user.pickaxe > 0) return m.reply('Du besitzt bereits eine Spitzhacke!');
                    if (user.batu < 5 || user.kayu < 10 || user.iron < 5 || user.string < 20) return m.reply(`Nicht genügend Materialien!\nUm eine Spitzhacke herzustellen, benötigst du: ${user.kayu < 10 ? `\n${10 - user.kayu} Holz 🪵` : ''} ${user.iron < 5 ? `\n${5 - user.iron} Eisen ⛓` : ''}${user.string < 20 ? `\n${20 - user.string} Schnur 🕸️` : ''}${user.batu < 5 ? `\n${5 - user.batu} Stein 🪨` : ''}`);
                    user.kayu -= 10;
                    user.iron -= 5;
                    user.batu -= 5;
                    user.string -= 20;
                    user.pickaxe += 1;
                    user.pickaxedurability = 40;
                    m.reply("Erfolgreich 1 Spitzhacke hergestellt 🔨");
                    break;                  
                case 'sword':
                    if (user.sword > 0) return m.reply('Du besitzt bereits ein Schwert!');
                    if (user.kayu < 10 || user.iron < 15) return m.reply(`Nicht genügend Materialien!\nUm ein Schwert herzustellen, benötigst du: ${user.kayu < 10 ? `\n${10 - user.kayu} Holz 🪵` : ''}${user.iron < 15 ? `\n${15 - user.iron} Eisen ⛓️` : ''}`);
                    user.kayu -= 10;
                    user.iron -= 15;
                    user.sword += 1;
                    user.sworddurability = 40;
                    m.reply("Erfolgreich 1 Schwert hergestellt 🗡️");
                    break;
                    case 'pisau':
                    if (user.pisau > 0) return m.reply('Du besitzt bereits ein Messer!');
                    if (user.kayu < 15 || user.iron < 20) return m.reply(`Nicht genügend Materialien!\nUm ein Messer herzustellen, benötigst du: ${user.kayu < 15 ? `\n${15 - user.kayu} Holz 🪵` : ''}${user.iron < 20 ? `\n${20 - user.iron} Eisen ⛓️` : ''}`);
                    user.kayu -= 15;
                    user.iron -= 20;
                    user.pisau += 1;
                    user.pisaudurability = 40;
                    m.reply("Erfolgreich 1 Messer hergestellt 🔪");
                    break;
                    case 'axe':
                    if (user.axe > 0) return m.reply('Du besitzt bereits eine Axt!');
                    if (user.batu < 10 || user.kayu < 15 || user.iron < 15 || user.string < 10) return m.reply(`Nicht genügend Materialien!\nUm eine Axt herzustellen, benötigst du: ${user.kayu < 15 ? `\n${15 - user.kayu} Holz 🪵` : ''} ${user.iron < 15 ? `\n${15 - user.iron} Eisen ⛓` : ''}${user.string < 10 ? `\n${10 - user.string} Schnur 🕸️` : ''}${user.batu < 10 ? `\n${10 - user.batu} Stein 🪨` : ''}`);
                    user.kayu -= 15;
                    user.iron -= 15;
                    user.batu -= 10;
                    user.string -= 10;
                    user.axe += 1;
                    user.axedurability = 40;
                    m.reply("Erfolgreich 1 Axt hergestellt 🪓");
                    break;
                case 'fishingrod':
                    if (user.fishingrod > 0) return m.reply('Du besitzt bereits eine Angelrute!');
                    if (user.kayu < 10 || user.iron < 2 || user.string < 20) return m.reply(`Nicht genügend Materialien!\nUm eine Angelrute herzustellen, benötigst du: ${user.kayu < 10 ? `\n${10 - user.kayu} Holz 🪵` : ''}${user.iron < 2 ? `\n${2 - user.iron} Eisen ⛓` : ''}${user.string < 20 ? `\n${20 - user.string} Schnur 🕸️` : ''}`);
                    user.kayu -= 10;
                    user.iron -= 2;
                    user.string -= 20;
                    user.fishingrod += 1;
                    user.fishingroddurability = 40;
                    m.reply("Erfolgreich 1 Angelrute hergestellt 🎣");
                    break;
                    case 'bow':
                    if (user.bow > 0) return m.reply('Du besitzt bereits einen Bogen!');
                    if (user.kayu < 10 || user.iron < 5 || user.string < 10) return m.reply(`Nicht genügend Materialien!\nUm einen Bogen herzustellen, benötigst du: ${user.kayu < 10 ? `\n${10 - user.kayu} Holz 🪵` : ''}${user.iron < 5 ? `\n${5 - user.iron} Eisen ⛓` : ''}${user.string < 10 ? `\n${10 - user.string} Schnur 🕸️` : ''}`);
                    user.kayu -= 10;
                    user.iron -= 5;
                    user.string -= 10;
                    user.bow += 1;
                    user.bowdurability = 40;
                    m.reply("Erfolgreich 1 Bogen hergestellt 🏹");
                    break;
                case 'katana':
                    if (user.katana > 0) return m.reply('Du besitzt bereits ein Katana!');
                    if (user.kayu < 10 || user.iron < 15 || user.Diamant < 5 || user.emerald < 3) return m.reply(`Nicht genügend Materialien!\nUm ein Katana herzustellen, benötigst du: ${user.kayu < 10 ? `\n${10 - user.kayu} Holz 🪵` : ''}${user.iron < 15 ? `\n${15 - user.iron} Eisen ⛓` : ''}${user.Diamant < 5 ? `\n${5 - user.Diamant} Diamant 💎` : ''}${user.emerald < 3 ? `\n${3 - user.emerald} Smaragd 🟩` : ''}`);
                    user.kayu -= 10;
                    user.iron -= 15;
                    user.Diamant -= 5;
                    user.emerald -= 3;
                    user.katana += 1;
                    user.katanadurability = 40;
                    m.reply("Erfolgreich 1 Katana hergestellt 🦯");
                    break;
                case 'Rüstung':
                    if (user.Rüstung > 0) return m.reply('Du besitzt bereits eine Rüstung!');
                    if (user.iron < 5 || user.Diamant < 1) return m.reply(`Nicht genügend Materialien!\nUm eine Rüstung herzustellen, benötigst du: ${user.iron < 5 ? `\n${5 - user.iron} Eisen ⛓️` : ''}${user.Diamant < 1 ? `\n${1 - user.Diamant} Diamant 💎` : ''}`);
                    user.iron -= 5;
                    user.Diamant -= 1;
                    user.Rüstung += 1;
                    user.armordurability = 50;
                    m.reply("Erfolgreich 1 Rüstung hergestellt 🥼");
                    break;
                default:
                    await conn.reply(m.chat, caption, m, {
                        contextInfo: {
                            externalAdReply: {
                                mediaType: 1,
                                title: 'RPG-SCHMIEDE',
                                thumbnailUrl: 'https://telegra.ph/file/ed878d04e7842407c2b89.jpg',
                                renderLargerThumbnail: true,
                                sourceUrl: ''
                            }
                        }
                    });
            }
        } else if (/enchant|enchan/i.test(command)) {
            const count = args[2] && args[2].length > 0 ? Math.min(99999999, Math.max(parseInt(args[2]), 1)) : !args[2] || args.length < 4 ? 1 : Math.min(1, count);
            switch (_type) {
                case 't':
                    break;
                case '':
                    break;
                default:
                    m.reply(caption);
            }
        }
    } catch (err) {
        m.reply("Error\n\n\n" + err.stack);
    }
};

handler.help = ['craft', 'schmiede', 'herstellen'];
handler.tags = ['rpg'];
handler.command = /^(craft|crafting|schmiede|herstellen|blacksmith)/i;
handler.register = true;
handler.group = true;
handler.rpg = true

module.exports = handler;