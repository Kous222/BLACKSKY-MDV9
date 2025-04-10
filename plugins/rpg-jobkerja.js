const cooldown = 300000; // Cooldown default (5 menit in miliSekunden)
const cooldownAfterWork = 5 * 60 * 1000; // Cooldown nach arbeiten während 5 menit (in miliSekunden)

let handler = async (m, { isPrems, conn, text, usedPrefix, command }) => {
    const user = global.db.data.users[m.sender];

    if (user.job === 'Pengangguran') {
        throw `du noch nicht haben pekerjaan. Tippe *${usedPrefix}lamarkerja* für melamar pekerjaan`;
    }


    if (user.jail === true) {
        throw '*du nicht kann durchführen aktivitas weil noch in penjara!*';
    }
    if (user.culik === true) {
        throw '*du nicht kann durchführen aktivitas weil noch in sel penculik!*';
    }
        

    // Cek cooldown zwischen pekerjaan und cooldown nach arbeiten während 5 menit
    if (new Date() - user.pekerjaansatu < cooldown || user.pekerjaansatu + cooldownAfterWork > new Date()) {
        let remainingTime;
        if (new Date() - user.pekerjaansatu < cooldown) {
            remainingTime = user.pekerjaansatu + cooldown - new Date();
        } else {
            remainingTime = user.pekerjaansatu + cooldownAfterWork - new Date();
        }
        let formattedTime = new Date(remainingTime).toISOString().substr(11, 8);
        throw `du bereits pergi arbeiten vorher. warten während *${formattedTime}* für arbeiten wieder`;
    }

  
    const jobList = {
        'gojek': [11000, 10000, 10000],
        'kantoran': [32000, 32000, 40000],
        'spiel developer': [420000, 410000, 400000],
        'backend developer': [130000, 130000, 140000],
        'web developer': [72000, 72000, 80000],
        'sopir': [26000, 25000, 25000],
        'kurir': [15000, 14000, 14000],
        'frontend developer': [52000, 52000, 60000],
        'fullstack developer': [210000, 210000, 200000],
        'Spieler sepak bola': [900000, 900000, 1000000],
        'karyawan indomaret': [27000, 27000, 30000],
        'pembunuh bayaran': [31000, 31000, 40000],    
        'pemburu manusia': [31000, 31000, 40000],        
        'polisi': [31000, 31000, 40000],
        'trader': [1700000, 1700000, 2000000],
        'dokter': [1700000, 1700000, 2000000],
        'hunter': [1700000, 1700000, 2000000]
    };

    if (jobList[user.job]) {
        let [MünzenMax, expMax, bankMax] = jobList[user.job];
        let Münzen = Math.floor(Math.random() * MünzenMax);
        let exp = Math.floor(Math.random() * expMax);
        let bank = Math.floor(Math.random() * bankMax);

        user.Münzen += Münzen;
        user.exp += exp;
        user.jobexp += 1;
        user.pekerjaansatu = new Date().getTime();

        let message = `*folgende pendapatan von pekerjaan ${user.job}* 
        \n• Money : Rp. ${Münzen}
        \n• Exp : ${exp}
        \n• Tingkat arbeiten Keras : +1 🧟‍♂️`;

        conn.reply(m.chat, message, m);
    }
};
handler.help = ['jobkerja'];
handler.tags = ['rpg'];
handler.command = /^(jobkerja)$/i;
handler.limit = true;

module.exports = handler;