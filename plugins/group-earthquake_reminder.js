const axios = require('axios');
const { setInterval } = require('timers');

let lastGempaData = null; 

async function getGempaInfo() {
    try {
        const url = `https://api.betabotz.eu.org/api/search/gempa?apikey=${lann}`;
        const response = await axios.get(url);
        const res = response.data.result.result;

        if (!res) {
            console.log('Data gempa nicht verfügbar');
            return;
        }


        if (lastGempaData && lastGempaData.Zeit === res.Zeit) {
            console.log('Data gempa noch nicht berubah, nicht gibt pengingat.');
            return;
        }

        lastGempaData = res; 

        const gempaInfo = {
            Zeit: res.Zeit,
            lintang: res.Lintang,
            bujur: res.Bujur,
            magnitude: res.Magnitudo,
            kedalaman: res.Kedalaman,
            wilayah: res.Wilayah,
            potensi: res.Potensi,
            Bild: res.image
        };

        console.log(`
        Zeit Gempa: ${gempaInfo.Zeit}
        Magnitudo: ${gempaInfo.magnitude}
        Wilayah: ${gempaInfo.wilayah}
        Potensi: ${gempaInfo.potensi}
        Bild: ${gempaInfo.Bild}
        `);

        sendGempaReminderToGroups(gempaInfo); 
    } catch (error) {
        console.error('[❗] Ein Error ist aufgetreten wenn mengambil data gempa:', error);
    }
}

async function sendGempaReminderToGroups(gempaInfo) {
    for (const chatId of Object.keys(global.db.data.chats)) {
        const chat = global.db.data.chats[chatId];
        if (chat.notifgempa) {
            const reminderMessage = `🚨 *PENGINGAT GEMPA BUMI* 🚨\n\n🕒 Zeit: ${gempaInfo.Zeit}\n🌍 Wilayah: ${gempaInfo.wilayah}\n💥 Magnitudo: ${gempaInfo.magnitude}\n🌐 Lintang: ${gempaInfo.lintang}\n🌐 Bujur: ${gempaInfo.bujur}\n🔍 Kedalaman: ${gempaInfo.kedalaman}\n🌊 Potensi: ${gempaInfo.potensi}\n📷 Bild Peta: ${gempaInfo.Bild}\n\nJaga keselamatan ihr!`;
            await sendReminderToGroup(chatId, reminderMessage); 
        }
    }
}

async function sendReminderToGroup(chatId, text) {
    await conn.sendMessage(chatId, { text }); 
}


function startGempaReminder() {
    setInterval(() => {
        console.log('Mengecek data gempa neueste...');
        getGempaInfo();
    }, 60 * 60 * 1000); 
}

startGempaReminder();