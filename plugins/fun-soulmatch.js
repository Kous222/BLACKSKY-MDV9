const moment = require('moment-timezone');

let handler = async (m, { text, conn }) => {
    if (!text) {
        return m.reply(`╭═══❯ *BELAHAN JIWA* ❮═══
│
│ ❌ Anmeldenkan 2 name für dianalisis!
│ 
│ 📝 *Format:*
│ .enc nama1|nama2
│
│ 📌 *Beispiel:*
│ .enc Raiden|Mei
│
╰════════════════════`);
    }

    try {
        const [nama1, nama2] = text.split("|").map(name => name.trim());

        if (!nama2) {
            return m.reply("❌ Format falsch! Benutze tanda '|' für memisahkan name\nContoh: .enc Raiden|Mei");
        }

        const generateSoulData = (name, previousElement) => {
            const numerologyValue = name.toLowerCase().split('')
                .map(char => char.charCodeAt(0) - 96)
                .reduce((a, b) => a + b, 0) % 9 + 1;

            const elements = ['Api 🔥', 'Air 💧', 'Tanah 🌍', 'Angin 🌪️', 'Petir ⚡', 'Es ❄️', 'Cahaya ✨', 'Bayangan 🌑'];


            let element;
            do {
                element = elements[Math.floor(Math.random() * elements.length)];
            } while (element === previousElement); 

            const zodiacSigns = ['♈ Aries', '♉ Taurus', '♊ Gemini', '♋ Cancer', '♌ Leo', '♍ Virgo', 
                                 '♎ Libra', '♏ Scorpio', '♐ Sagittarius', '♑ Capricorn', '♒ Aquarius', '♓ Pisces'];
            const zodiac = zodiacSigns[Math.floor(Math.random() * zodiacSigns.length)]; 

            return { numerologyValue, element, zodiac };
        };

        let previousElement = null; 
        const soul1 = generateSoulData(nama1, previousElement);
        previousElement = soul1.element; 

        const soul2 = generateSoulData(nama2, previousElement);

        const calculateCompatibility = () => Math.floor(Math.random() * 100) + 1;

        const compatibility = calculateCompatibility();

    
        const soulTypes = [
            "Pemimpin Jang Berani", "Penyeimbang Bijaksana", "Kreator Ekspresif", "Pembangun Solid", 
            "Abenteurer Frei", "Beschützer Setia", "Pemikir Mistis", "Penakluk Kuat", "Humanitarian Murni"
        ];

        const getRandomSoulType = () => soulTypes[Math.floor(Math.random() * soulTypes.length)];

        const getMatchDescription = (score) => {
            if (score >= 90) return "💫 Takdir Sejati";
            if (score >= 80) return "✨ Harmoni Sempurna";
            if (score >= 70) return "🌟 Koneksi Kuat";
            if (score >= 60) return "⭐ Potensi Gut";
            if (score >= 50) return "🌙 Brauchen Perjuangan";
            return "🌑 Herausforderung Berat";
        };

        const generateSoulReading = (compatibility) => {
            const readings = [
                compatibility >= 90 ? [
                    "│ ✨ Jiwa ihr memiliki koneksi das/der/die sehr",
                    "│    istimewa und langka",
                    "│ 🌟 Takdir hat merencanakan pertemuan dies",
                    "│ 💫 Resonansi jiwa ihr menciptakan",
                    "│    harmoni sempurna"
                ] : compatibility >= 80 ? [
                    "│ 🌟 Gibt chemistry das/der/die sehr kuat in zwischen",
                    "│    ihr",
                    "│ ✨ Jiwa ihr saling melengkapi mit",
                    "│    Art das/der/die unik",
                    "│ 💫 Pertemuan ihr membawa Energie positif"
                ] : compatibility >= 70 ? [
                    "│ 🌙 Potensi hubungan das/der/die in und berarti",
                    "│ ✨ Perbedaan ihr gerade menciptakan",
                    "│    harmoni",
                    "│ 💫 Gibt pelajaran berharga in pertemuan",
                    "│    dies"
                ] : compatibility >= 60 ? [
                    "│ 🌟 Butuh Zeit für saling memahami",
                    "│ 💫 Jeder herausforderung wird memperkuat ikatan",
                    "│ ✨ Fokus auf hal positif von perbedaan",
                    "│    ihr"
                ] : compatibility >= 50 ? [
                    "│ 🌙 Brauchen usaha ekstra für harmonisasi",
                    "│ ✨ Herausforderung wird menguji kesungguhan",
                    "│ 💫 Komunikasi also kunci utama hubungan"
                ] : [
                    "│ 🌑 Perbedaan das/der/die signifikan in Energie",
                    "│    jiwa",
                    "│ ✨ Butuh viel adaptasi und pengertian",
                    "│ 💫 Jeder hubungan haben maksud tersendiri"
                ]
            ];

            return readings[0].join('\n');
        };

        const caption = `╭═══❯ *BELAHAN JIWA* ❮═══
│
│ 👤 *${nama1}*
│ ├ 🔮 Soul Type: ${getRandomSoulType()}
│ ├ 🌟 element: ${soul1.element}
│ └ 🎯 Zodiac: ${soul1.zodiac}
│
│ 👤 *${nama2}*
│ ├ 🔮 Soul Type: ${getRandomSoulType()}
│ ├ 🌟 element: ${soul2.element}
│ └ 🎯 Zodiac: ${soul2.zodiac}
│
│ 💫 *COMPATIBILITY*
│ ├ 📊 Score: ${compatibility}%
│ └ 🎭 Status: ${getMatchDescription(compatibility)}
│
│ 🔮 *Soul Reading*
${generateSoulReading(compatibility)}
│
╰════════════════════

📅 *Analysis Date:* ${moment().tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm:ss')}`;

        return m.reply(caption);

    } catch (error) {
        console.error('Error in soulmatch command:', error);
        return m.reply(`╭══════════════════════
│ ❌ *Terjadi Kesalahan*
│ Bitte coba einige wenn wieder
╰═════════════════════`);
    }
};

handler.help = ['soulmatch'];
handler.tags = ['fun'];
handler.command = /^soulmatch$/i;
handler.group = true;
handler.limit = 1;

module.exports = handler;


//base by DEVOLUTION-MD1
//recode by danaputra133