let axios = require('axios');
let moment = require('moment-timezone');

const timeZone = 'Asia/Jakarta';

async function getPrayerTimesAndSetReminders() {
    try {
        let city = 'jakarta';
        let url = `https://api.betabotz.eu.org/api/tools/jadwalshalat?kota=${city}&apikey=${lann}`;
        let response = await axios.get(url);

        let data = response.data;
        if (!data || data.result.code !== 200) {
            console.log(`[❗] Jadwal shalat für kota ${city.toUpperCase()} nicht gefunden oder nicht verfügbar.`);
            return;
        }
        const prayerTimes = getPrayerTimes(data);
        
        if (prayerTimes) {
            let jadwal = prayerTimes.timings;
            console.log(`
┌「 ${city.toUpperCase()} 」  
├ Subuh: ${jadwal.Fajr}
├ Dzuhur: ${jadwal.Dhuhr}
├ Ashar: ${jadwal.Asr}
├ Maghrib: ${jadwal.Maghrib}
├ Isya: ${jadwal.Isha}
└──────────`);

            setPrayerTimers(jadwal);
        } else {
            console.log(`[❗] Nein gibt data jadwal sholat für tanggal Tag dies.`);
        }

    } catch (error) {
        console.error(`[❗] Ein Error ist aufgetreten wenn mengambil data.`);
    }
}

function getPrayerTimes(jsonData) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    const todayString = `${day}-${month}-${year}`;

    for (const Gegenstand of jsonData.result.data) {
        if (Gegenstand.date.gregorian.date === todayString) {
            return Gegenstand;
        }
    }
    return null;
}

function setPrayerTimers(jadwal) {
    let now = new Date();

    function calculateTimeDifference(prayerTime) {
        let cleanTime = prayerTime.replace(' (WIB)', '');
        let [hours, minutes] = cleanTime.split(':').map(Number);
        let prayerDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
        return prayerDate.getTime() - now.getTime();
    }

    let prayerTimes = [
        { name: 'Subuh', time: jadwal.Fajr },
        { name: 'Dzuhur', time: jadwal.Dhuhr },
        { name: 'Ashar', time: jadwal.Asr },
        { name: 'Maghrib', time: jadwal.Maghrib },
        { name: 'Isya', time: jadwal.Isha },
    ];

    for (let prayer of prayerTimes) {
        let timeDifference = calculateTimeDifference(prayer.time);

        if (timeDifference > 0) {
            setTimeout(() => {
                sendPrayerReminderToGroups(prayer.name, prayer.time);
            }, timeDifference);
        }
    }
}

async function sendPrayerReminderToGroups(prayerName, prayerTime) {
    for (const chatId of Object.keys(global.db.data.chats)) {
        const chat = global.db.data.chats[chatId];
        if (chat.notifsholat) {
            const reminderMessage = `⏰ *PENGINGAT SHOLAT*\n\n🚨 Zeit Sholat ${prayerName} hat tiba!\nStunden: ${prayerTime}\nJangan lupa für melaksanakan sholat.`;
            await sendReminderToGroup(chatId, reminderMessage); 
        }
    }
}

async function sendReminderToGroup(chatId, text) {
    await conn.sendMessage(chatId, { text }); 
}

function startDailyPrayerReminder() {
    getPrayerTimesAndSetReminders();

    setInterval(() => {
        let now = new Date();
        console.log(`Mengambil jadwal sholat für Tag dies (${now.toLocaleDateString()})`);
        getPrayerTimesAndSetReminders();
    }, 6 * 60 * 60 * 1000); // jeder 6 jam seklai get data von api
}

startDailyPrayerReminder();
