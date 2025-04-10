const cooldown = 30000;

const items = {
    buygun: {
        speer: { Münzen: 50000000 },
        bogen: { Münzen: 10000000 },
        anakpanah: { Münzen: 8000000 },
        glock: { dana: 3000000 },
        ammo: { gopay: 3500000 },
        ak47: { dana: 6400000 },
        m4: { dana: 3400000 },
        m16: { dana: 8400000 },
        ar15: { ovo: 7700000 },
        scar: { gopay: 9000000 },
        famas: { ovo: 9000000 },
        aug: { dana: 9400000 },
        uzi: { dana: 5500000 },
        mp5: { ovo: 5000000 },
        p90: { Münzen: 6400000 },
        mac10: { Münzen: 4000000 },
        vector: { gopay: 4200000 },
        barrettm82: { Münzen: 19900000 },
        remington700: { ovo: 2000000 },
        dragunovsvd: { dana: 88000000 },
        m40: { ovo: 40000000 },
        m24: { ovo: 40000000 }
    },
    sellgun: {
        speer: { Münzen: 2500000 },
        bogen: { Münzen: 500000 },
        anakpanah: { Münzen: 400000 },
        glock: { Münzen: 1500000 },
        ammo: { Münzen: 1750000 },
        ak47: { Münzen: 3200000 },
        m4: { Münzen: 170000 },
        m16: { Münzen: 420000 },
        ar15: { Münzen: 385000 },
        scar: { Münzen: 450000 },
        famas: { Münzen: 450000 },
        aug: { Münzen: 470000 },
        uzi: { Münzen: 275000 },
        mp5: { Münzen: 250000 },
        p90: { Münzen: 320000 },
        mac10: { Münzen: 200000 },
        vector: { Münzen: 210000 },
        barrettm82: { Münzen: 9950000 },
        remington700: { Münzen: 100000 },
        dragunovsvd: { Münzen: 4400000 },
        m40: { Münzen: 200000 },
        m24: { Münzen: 200000 }
    }
};

const handler = async (m, { conn, command, usedPrefix, args, text, isPrems }) => {
    global.db.users = global.db.users || {}; // Ensure the users object is initialized
    let user = global.db.users[m.sender] = global.db.users[m.sender] || {};

    if (user.jail === true) {
        throw '*du kannst keine Aktivitäten durchführen, weil du im Gefängnis bist!*';
    }

    if (new Date() - user.pekerjaantiga < cooldown) {
        const remainingTime = new Date(user.pekerjaantiga + cooldown) - new Date();
        const formattedTime = new Date(remainingTime).toISOString().substr(11, 8);
        throw `du warst gerade im Geschäft! Warte noch *${formattedTime}*`;
    }

    if (command.toLowerCase() == 'gunshop') {
        let text = `
*🏪 Waffengeschäft*

Möchtest du das *Waffengeschäft* besuchen?
Gib _.buygun_ ein, um Waffen zu kaufen!
Gib _.sellgun_ ein, um Waffen zu verkaufen!
        `.trim();
        conn.reply(m.chat, text, m);
        return;
    }

    const listItems = Object.fromEntries(Object.entries(items[command.toLowerCase()])
        .filter(([v, { Münzen, dana, gopay, ovo }]) => {
            if (Münzen && user.Münzen < Münzen) return false;
            if (dana && user.dana < dana) return false;
            if (gopay && user.gopay < gopay) return false;
            if (ovo && user.ovo < ovo) return false;
            return v && v in user;
        }));

    const info = `
*Beispiel:* ${usedPrefix}${command} ak47 1
    
*Waffenliste:* 
${Object.keys(items[command.toLowerCase()]).map((v) => {
            let paymentMethod = Object.keys(items[command.toLowerCase()][v])[0];
            return `${emojis(v)}${capitalizeFirstLetter(v)} | ${toSimple(items[command.toLowerCase()][v][paymentMethod])} ${emojis(paymentMethod)}${capitalizeFirstLetter(paymentMethod)}`.trim();
        }).join('\n')}
`.trim();

    const Gegenstand = (args[0] || '').toLowerCase();

    if (!items[command.toLowerCase()][Gegenstand]) {
        return m.reply(info);
    }

    if (!args[1]) {
        m.reply(info);
        return;
    }

    let total = Math.floor(isNumber(args[1]) ? Math.min(Math.max(parseInt(args[1]), 1)) : 1) * ({"K": 1e3, "M": 1e6, "B": 1e9, "T": 1e12, "QA": 1e15, "QI": 1e18, "SX": 1e21, "SP": 1e24, "OC": 1e27, "N": 1e30, "DC": 1e33, "UD": 1e36, "DD": 1e39, "TD": 1e42, "QUA": 1e45, "QUI": 1e48, "SXD": 1e51, "SPD": 1e54, "OCD": 1e57, "NOD": 1e60, "VG": 1e63}[args[1].toUpperCase().replace(/[^KMBTQAISXONDCUP]/g, '')] || 1);

    if (command.toLowerCase() == 'buygun') {
        const paymentMethods = ['Münzen', 'dana', 'gopay', 'ovo'];
        const paymentMethod = paymentMethods[Math.floor(Math.random() * paymentMethods.length)];
        if (user[paymentMethod] < items[command.toLowerCase()][Gegenstand][paymentMethod] * total) {
            return m.reply(`du hast nicht genug ${emojis(paymentMethod)}${paymentMethod}, um *${toSimple(total)}* ${emojis(Gegenstand)}${capitalizeFirstLetter(Gegenstand)} zu kaufen. du benötigst noch *${toSimple((items[command.toLowerCase()][Gegenstand][paymentMethod] * total) - user[paymentMethod])}* ${paymentMethod} um es zu kaufen`);
        }

        user[paymentMethod] -= items[command.toLowerCase()][Gegenstand][paymentMethod] * total;
        user[Gegenstand] = (user[Gegenstand] || 0) + total;
        user.pekerjaantiga = new Date() * 1;

        return m.reply(`du hast *${toSimple(total)}* ${emojis(Gegenstand)}${capitalizeFirstLetter(Gegenstand)} für ${emojis(paymentMethod)}${paymentMethod} gekauft`);
    } else if (command.toLowerCase() == 'sellgun') {
        if (isPrems && /all/i.test(args[1])) {
            total = user[Gegenstand];
        }
        if (user[Gegenstand] < total) {
            return m.reply(`du hast nicht genug *${emojis(Gegenstand)}${capitalizeFirstLetter(Gegenstand)}* um es zu verkaufen. Du hast nur ${toSimple(user[Gegenstand])} Stück`);
        }
        const reward = items[command.toLowerCase()][Gegenstand];
        const rewardKey = Object.keys(reward)[0];
        if (!(rewardKey in user)) {
            throw new Error(`Der Nutzer hat kein ${rewardKey} in ihrer database, aber die Belohnung gibt es!`);
        }

        user[Gegenstand] -= total;
        user[rewardKey] += items[command.toLowerCase()][Gegenstand][rewardKey] * total;
        user.pekerjaantiga = new Date() * 1;

        return m.reply(`du hast *${toSimple(total)}* ${emojis(Gegenstand)}${capitalizeFirstLetter(Gegenstand)} verkauft und *${toSimple(items[command.toLowerCase()][Gegenstand][rewardKey] * total)}* ${emojis(rewardKey)} get`);
    }
    return;
};

handler.help = ['gunshop', 'laden', 'geschäft'].map(v => v + '');
handler.tags = ['rpg'];
handler.command = /^(((gunshop|buygun|sellgun)$|laden|geschäft)|laden|geschäft)/i;
handler.cooldown = cooldown;
handler.rpg = true;
module.exports = handler;

function isNumber(number) {
    if (!number) return number;
    number = parseInt(number);
    return typeof number == 'number' && !isNaN(number);
}

function toSimple(number) {
    if (isNaN(parseFloat(number))) return number;
    if (parseFloat(number) === 0) return '0';
    number = parseFloat(number).toFixed(0);
    const suffixes = ['', 'K', 'JT', 'M', 'T'];
    const base = 1000;
    const exponent = Math.floor(Math.log10(Math.abs(number)) / 3);
    const suffix = suffixes[Math.min(exponent, suffixes.length - 1)];
    return (number / Math.pow(base, exponent)).toFixed(1) + suffix;
}

function emojis(Gegenstand) {
    switch (Gegenstand.toLowerCase()) {
        case 'speer': return '🪓';
        case 'bogen': return '🏹';
        case 'anakpanah': return '🏹';
        case 'glock': return '🔫';
        case 'ammo': return '🔫';
        case 'ak47': return '🔫';
        case 'm4': return '🔫';
        case 'm16': return '🔫';
        case 'ar15': return '🔫';
        case 'scar': return '🔫';
        case 'famas': return '🔫';
        case 'aug': return '🔫';
        case 'uzi': return '🔫';
        case 'mp5': return '🔫';
        case 'p90': return '🔫';
        case 'mac10': return '🔫';
        case 'vector': return '🔫';
        case 'barrettm82': return '🔫';
        case 'remington700': return '🔫';
        case 'dragunovsvd': return '🔫';
        case 'm40': return '🔫';
        case 'm24': return '🔫';
        case 'Münzen': return '💵';
        case 'dana': return '💰';
        case 'gopay': return '💳';
        case 'ovo': return '📱';
        default: return '';
    }
}

function capitalizeFirstLetter(str) {
    let words = str.split(" ");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
    }
    return words.join(" ");
}