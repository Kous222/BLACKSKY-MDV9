let handler = async (m, { isPrems, conn, text, usedPrefix, command }) => {  
    const user = global.db.data.users[m.sender];  
    const who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : text ? text.replace(/[@ .+-]/g, '').replace(/^\+/, '').replace(/-/g, '') + '@s.whatsapp.net' : m.sender;  

    // if der Nutzer noch keinen Job beantragt hat
    if (user.job === '-') {    
        throw 'Du hast dich noch nicht für einen Job beworben. Bitte bewirb dich zuerst, um mit einem Job zu starten. Beispiel: .lamarkerja _gojek_';  
    }  

    // Sicherstellen, dass jobexp definiert ist
    if (user.jobexp === undefined) {    
        user.jobexp = 0;    
    }  

    let job = `${user.job}`;    
    let kapital = capitalizeFirstLetter(job);  

    if (user.jail === true) {    
        throw '*Du kannst keine Aktivitäten durchführen, da du noch im Gefängnis bist!*';  
    }  

    let jobs = {    
        'gojek': {      
            thumb: 'https://telegra.ph/file/1bb2e5ff8e3b434b379dc.jpg',      
            special: '*.Fahrer*'    
        },    
        'kurier': {      
            thumb: 'https://telegra.ph/file/64d8e80ee172257f1b8ca.jpg',      
            special: '-'    
        },    
        'sopir': {      
            thumb: 'https://telegra.ph/file/57f5f98cae56774fc398b.jpg',      
            special: '-'    
        },    
        'karyawan indomaret': {      
            thumb: 'https://telegra.ph/file/59ccf16e7d753698b674b.jpg',      
            special: '-'    
        },    
        'kantoran': {      
            thumb: 'https://telegra.ph/file/1b2398b334d1cc7a74cb0.jpg',      
            special: '-'    
        },    
        'dokter': {      
            thumb: 'https://telegra.ph/file/951334d75d222eb7fa1b3.jpg',      
            special: '*.heilen*'    
        },    
        'frontend developer': {      
            thumb: 'https://telegra.ph/file/3b28a547ba457c1681544.jpg',      
            special: '-'    
        },    
        'web developer': {      
            thumb: 'https://telegra.ph/file/dae4c03250e6c43e92a72.jpg',      
            special: '-'    
        },    
        'backend developer': {      
            thumb: 'https://telegra.ph/file/ccc87e4468bf754d312cb.jpg',      
            special: '-'    
        },    
        'fullstack developer': {      
            thumb: 'https://telegra.ph/file/1c8111cef2063b9db5d66.jpg',      
            special: '-'    
        },    
        'spiel developer': {      
            thumb: 'https://telegra.ph/file/e621f007affe38df8e748.jpg',      
            special: '-'    
        },    
        'Spieler sepak bola': {      
            thumb: 'https://telegra.ph/file/5a72645b7cd852b87493d.jpg',      
            special: '-'    
        },    
        'trader': {      
            thumb: 'https://telegra.ph/file/ed5c581836d61c70298bd.jpg',      
            special: '-'    
        },    
        'hunter': {      
            thumb: 'https://telegra.ph/file/2ba7ade78cbd36e3f35a4.jpg',      
            special: '*.jagen*'    
        },    
        'polisi': {      
            thumb: 'https://telegra.ph/file/d34aa031a8035e13b5bbb.jpg',      
            special: '*.gefängnis*'    
        }  
    };  

    let jobInfo = jobs[user.job];  

    if (jobInfo) {    
        let caption = `*JOB INFO* Job: ${kapital} Arbeitseinsatz: ${user.jobexp}% / 500% Der Arbeitseinsatz wird mit jedem Befehl *.jobkerja* um 1% erhöht. Dein spezieller Befehl ist ${jobInfo.special}`.trim();    
        await conn.sendFile(m.chat, jobInfo.thumb, `${user.job}.jpg`, caption, m);  
    } else {    
        throw 'Job nicht gefunden oder ungültig!';  
    }
};

handler.help = ['job'];  
handler.tags = ['rpg'];  
handler.command = /^(job)$/i;  
handler.rpg = true;  
module.exports = handler;

function capitalizeFirstLetter(str) {  
    let words = str.split(" ");  
    for (let i = 0; i < words.length; i++) {    
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();  
    }  
    return words.join(" ");  
}
