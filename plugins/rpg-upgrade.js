const handler = async (m, {
    conn,
    command,
    args,
    usedPrefix
}) => {
    try {
        let user = global.db.data.users[m.sender];
        let fishingrod = user.fishingrod * 1;
        let pickaxe = user.pickaxe * 1;
        let sword = user.sword * 1;
        let Rüstung = user.Rüstung * 1;
        let katana = user.katana * 1;
        let axe = user.axe * 1;
        let bow = user.bow * 1;
        let pisau = user.pisau * 1;

        let type = (args[0] || '').toLowerCase();
        let prefix = usedPrefix;

        let lmao1 = `乂 *A U F R Ü S T E N*

乂 *A U F R Ü S T - L I S T E*
*[ 🎣 ]* • Angelrute
*[ ⛏️ ]* • Spitzhacke
*[ 🗡 ]* • Schwert
*[ 🛡 ]* • Rüstung
*[ 🦯 ]* • Katana
*[ 🏹 ]* • Bogen
*[ 🪓 ]* • Axt
*[ 🔪 ]* • Messer

乂 *A N L E I T U N G*
• _Beispiel_ :
.uptool _sword_
`.trim();

        switch (type) {
            case 'fishingrod':
                if (fishingrod == 0) {
                    m.reply(`Sie haben noch keine *🎣Angelrute*\nUm eine zu bekommen, tippe *${usedPrefix}craft fishingrod*`);
                } else if (fishingrod > 9) {
                    m.reply(`*🎣Angelrute* bereits auf maximaler Stufe`);
                } else {
                    let _kayu = fishingrod * 25;
                    let _string = fishingrod * 15;
                    let _Münzen = fishingrod * 10000;
                    if (user.kayu < _kayu || user.string < _string || user.Münzen < _Münzen) {
                        m.reply(`Material nicht ausreichend!!${user.kayu < _kayu ? `\n🪵Holz fehlt: *${_kayu - user.kayu}*` : ''}${user.string < _string ? `\n🧶Schnur fehlt: *${_string - user.string}*` : ''}${user.Münzen < _Münzen ? `\n💰Münzen fehlen: *${_Münzen - user.Münzen}*` : ''}`);
                    } else {
                        user.fishingrod += 1;
                        user.kayu -= _kayu;
                        user.string -= _string;
                        user.Münzen -= _Münzen;
                        user.fishingroddurability = 0;
                        user.fishingroddurability += fishingrod * 50;
                        m.reply(`Erfolgreich *🎣Angelrute* aufgerüstet`);
                    }
                }
                break;
            case 'pickaxe':
                if (pickaxe == 0) {
                    m.reply(`Sie haben noch keine *⛏Spitzhacke*\nUm eine zu bekommen, tippe *${usedPrefix}craft pickaxe*`);
                } else if (pickaxe > 9) {
                    m.reply(`*⛏Spitzhacke* bereits auf maximaler Stufe`);
                } else {
                    let __batu = pickaxe * 25;
                    let __kayu = pickaxe * 15;
                    let __Münzen = pickaxe * 15000;
                    if (user.batu < __batu || user.kayu < __kayu || user.Münzen < __Münzen) {
                        m.reply(`Material nicht ausreichend!!${user.batu < __batu ? `\n🪨Stein fehlt: *${__batu - user.batu}*` : ''}${user.kayu < __kayu ? `\n🪵Holz fehlt: *${__kayu - user.kayu}*` : ''}${user.Münzen < __Münzen ? `\n💰Münzen fehlen: *${__Münzen - user.Münzen}*` : ''}`);
                    } else {
                        user.pickaxe += 1;
                        user.kayu -= __kayu;
                        user.batu -= __batu;
                        user.Münzen -= __Münzen;
                        user.pickaxedurability = 0;
                        user.pickaxedurability += pickaxe * 50;
                        m.reply(`Erfolgreich *⛏Spitzhacke* aufgerüstet`);
                    }
                }
                break;
                case 'axe':
                if (axe == 0) {
                    m.reply(`Sie haben noch keine *🪓Axt*\nUm eine zu bekommen, tippe *${usedPrefix}craft axe*`);
                } else if (axe > 9) {
                    m.reply(`*🪓Axt* bereits auf maximaler Stufe`);
                } else {
                    let __batu = axe * 25;
                    let __kayu = axe * 15;
                    let __Münzen = axe * 15000;
                    if (user.batu < __batu || user.kayu < __kayu || user.Münzen < __Münzen) {
                        m.reply(`Material nicht ausreichend!!${user.batu < __batu ? `\n🪨Stein fehlt: *${__batu - user.batu}*` : ''}${user.kayu < __kayu ? `\n🪵Holz fehlt: *${__kayu - user.kayu}*` : ''}${user.Münzen < __Münzen ? `\n💰Münzen fehlen: *${__Münzen - user.Münzen}*` : ''}`);
                    } else {
                        user.axe += 1;
                        user.kayu -= __kayu;
                        user.batu -= __batu;
                        user.Münzen -= __Münzen;
                        user.axedurability = 0;
                        user.axedurability += axe * 50;
                        m.reply(`Erfolgreich *🪓Axt* aufgerüstet`);
                    }
                }
                break;
                case 'bow':
                if (bow == 0) {
                    m.reply(`Sie haben noch keinen *🏹Bogen*\nUm einen zu bekommen, tippe *${usedPrefix}craft bow*`);
                } else if (bow > 9) {
                    m.reply(`*🏹Bogen* bereits auf maximaler Stufe`);
                } else {
                    let __batu = bow * 25;
                    let __kayu = bow * 15;
                    let __Münzen = bow * 15000;
                    if (user.batu < __batu || user.kayu < __kayu || user.Münzen < __Münzen) {
                        m.reply(`Material nicht ausreichend!!${user.batu < __batu ? `\n🪨Stein fehlt: *${__batu - user.batu}*` : ''}${user.kayu < __kayu ? `\n🪵Holz fehlt: *${__kayu - user.kayu}*` : ''}${user.Münzen < __Münzen ? `\n💰Münzen fehlen: *${__Münzen - user.Münzen}*` : ''}`);
                    } else {
                        user.bow += 1;
                        user.kayu -= __kayu;
                        user.batu -= __batu;
                        user.Münzen -= __Münzen;
                        user.bowdurability = 0;
                        user.bowdurability += bow * 50;
                        m.reply(`Erfolgreich *🏹Bogen* aufgerüstet`);
                    }
                }
                break;
            case 'sword':
                if (sword == 0) {
                    m.reply(`Sie haben noch kein *🗡Schwert*\nUm eines zu bekommen, tippe *${usedPrefix}craft sword*`);
                } else if (sword > 9) {
                    m.reply(`*🗡Schwert* bereits auf maximaler Stufe`);
                } else {
                    let _iron = sword * 25;
                    let ___kayu = sword * 15;
                    let ___Münzen = sword * 10000;
                    if (user.iron < _iron || user.kayu < ___kayu || user.Münzen < ___Münzen) {
                        m.reply(`Material nicht ausreichend!!${user.iron < _iron ? `\n🔩Eisen fehlt: *${_iron - user.iron}*` : ''}${user.kayu < ___kayu ? `\n🪵Holz fehlt: *${___kayu - user.kayu}*` : ''}${user.Münzen < ___Münzen ? `\n💰Münzen fehlen: *${___Münzen - user.Münzen}*` : ''}`);
                    } else {
                        user.sword += 1;
                        user.iron -= _iron;
                        user.kayu -= ___kayu;
                        user.Münzen -= ___Münzen;
                        user.sworddurability = 0;
                        user.sworddurability += sword * 50;
                        m.reply(`Erfolgreich *🗡Schwert* aufgerüstet`);
                    }
                }
                break;
                case 'pisau':
                if (pisau == 0) {
                    m.reply(`Sie haben noch kein *🔪Messer*\nUm eines zu bekommen, tippe *${usedPrefix}craft pisau*`);
                } else if (pisau > 9) {
                    m.reply(`*🔪Messer* bereits auf maximaler Stufe`);
                } else {
                    let _iron = pisau * 25;
                    let ___kayu = pisau * 15;
                    let ___Münzen = pisau * 10000;
                    if (user.iron < _iron || user.kayu < ___kayu || user.Münzen < ___Münzen) {
                        m.reply(`Material nicht ausreichend!!${user.iron < _iron ? `\n🔩Eisen fehlt: *${_iron - user.iron}*` : ''}${user.kayu < ___kayu ? `\n🪵Holz fehlt: *${___kayu - user.kayu}*` : ''}${user.Münzen < ___Münzen ? `\n💰Münzen fehlen: *${___Münzen - user.Münzen}*` : ''}`);
                    } else {
                        user.pisau += 1;
                        user.iron -= _iron;
                        user.kayu -= ___kayu;
                        user.Münzen -= ___Münzen;
                        user.pisaudurability = 0;
                        user.pisaudurability += pisau * 50;
                        m.reply(`Erfolgreich *🔪Messer* aufgerüstet`);
                    }
                }
                break;
            case 'katana':
                if (katana == 0) {
                    m.reply(`Sie haben noch keine *🦯Katana*\nUm eine zu bekommen, tippe *${usedPrefix}craft katana*`);
                } else if (katana > 9) {
                    m.reply(`*🦯Katana* bereits auf maximaler Stufe`);
                } else {
                    let _iron = katana * 30;
                    let ___kayu = katana * 15;
                    let ___diamond = katana * 10;
                    let ___emerald = katana * 5;
                    let ___Münzen = katana * 50000;
                    if (user.iron < _iron || user.kayu < ___kayu || user.Diamant < ___diamond || user.emerald < ___emerald || user.Münzen < ___Münzen) {
                        m.reply(`Material nicht ausreichend!!${user.iron < _iron ? `\n🔩Eisen fehlt: *${_iron - user.iron}*` : ''}${user.kayu < ___kayu ? `\n🪵Holz fehlt: *${___kayu - user.kayu}*` : ''}${user.Diamant < ___diamond ? `\n💎Diamant fehlt: *${___diamond - user.Diamant}*` : ''}${user.emerald < ___emerald ? `\n🟩Smaragd fehlt: *${___emerald - user.emerald}*` : ''}${user.Münzen < ___Münzen ? `\n💰Münzen fehlen: *${___Münzen - user.Münzen}*` : ''}`);
                    } else {
                        user.katana += 1;
                        user.iron -= _iron;
                        user.kayu -= ___kayu;
                        user.Diamant -= ___diamond;
                        user.emerald -= ___emerald;
                        user.Münzen -= ___Münzen;
                        user.katanadurability = 0;
                        user.katanadurability += katana * 50;
                        m.reply(`Erfolgreich *🦯Katana* aufgerüstet`);
                    }
                }
                break;
            case 'Rüstung':
                if (Rüstung == 0) {
                    m.reply(`Sie haben noch keine *🛡Rüstung*\nUm eine zu bekommen, tippe *${usedPrefix}craft Rüstung*`);
                } else if (Rüstung > 9) {
                    m.reply(`*🛡Rüstung* bereits auf maximaler Stufe`);
                } else {
                    let __iron = Rüstung * 10;
                    let ___diamond = Rüstung * 5;
                    let ___Münzen = Rüstung * 30000;
                    if (user.iron < __iron || user.Diamant < ___diamond || user.Münzen < ___Münzen) {
                        m.reply(`Material nicht ausreichend!!${user.iron < __iron ? `\n🔩Eisen fehlt: *${__iron - user.iron}*` : ''}${user.Diamant < ___diamond ? `\n💎Diamant fehlt: *${___diamond - user.Diamant}*` : ''}${user.Münzen < ___Münzen ? `\n💰Münzen fehlen: *${___Münzen - user.Münzen}*` : ''}`);
                    } else {
                        user.Rüstung += 1;
                        user.iron -= __iron;
                        user.Diamant -= ___diamond;
                        user.Münzen -= ___Münzen;
                        user.armordurability = 0;
                        user.armordurability += Rüstung * 50;
                        m.reply(`Erfolgreich *🛡Rüstung* aufgerüstet`);
                    }
                }
                break;
            default:
                await conn.reply(m.chat, lmao1, m, {
                    contextInfo: {
                        externalAdReply: {
                            mediaType: 1,
                            title: 'BETABOTZ RPG',
                            thumbnailUrl: 'https://telegra.ph/file/97dba25a7bd8084913166.jpg',
                            renderLargerThumbnail: true,
                            sourceUrl: ''
                        }
                    }
                });
        }
    } catch (e) {
        console.log(e);
        throw e;
    }
};

handler.help = ['uptool'];
handler.tags = ['rpg'];
handler.command = /^(up(tool)?)$/i;
handler.fail = null;
handler.group = true;
handler.rpg = true

module.exports = handler;