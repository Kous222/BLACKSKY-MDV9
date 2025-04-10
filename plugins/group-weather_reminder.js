const axios = require('axios');
const { setInterval } = require('timers');

let location = 'Jakarta'; 

async function getWeatherInfo() {
    try {
        const url = `https://api.betabotz.eu.org/api/tools/cuaca?query=${encodeURIComponent(location)}&apikey=${lann}`;
        const response = await axios.get(url);
        const res = response.data.result;

        if (!res) {
            console.log('Data cuaca nicht verfügbar');
            return;
        }

        const weatherInfo = {
            location: res.location,
            country: res.country,
            weather: res.weather,
            currentTemp: res.currentTemp,
            maxTemp: res.maxTemp,
            minTemp: res.minTemp,
            humidity: res.humidity,
            windSpeed: res.windSpeed,
        };
        

        console.log(`
        Standort: ${weatherInfo.location}
        Wetter: ${weatherInfo.weather}
        Aktuelle Temperatur: ${weatherInfo.currentTemp}
        Höchsttemperatur: ${weatherInfo.maxTemp}
        Tiefsttemperatur: ${weatherInfo.minTemp}
        Luftfeuchtigkeit: ${weatherInfo.humidity}
        Wind: ${weatherInfo.windSpeed}
        `);

        sendWeatherReminderToGroups(weatherInfo);
    } catch (error) {
        console.error('[❗] Ein Fehler ist beim Abrufen der Wetterdaten aufgetreten:', error);
    }
}

async function sendWeatherReminderToGroups(weatherInfo) {
    for (const chatId of Object.keys(global.db.data.chats)) {
        const chat = global.db.data.chats[chatId];
        if (chat.notifcuaca) {
            const reminderMessage = `🌤️ *WETTER-ERINNERUNG* 🌤️\n\n📍 Standort: ${weatherInfo.location}\n🌍 Land: ${weatherInfo.country}\n🌦️ Wetter: ${weatherInfo.weather}\n🌡️ Aktuelle Temperatur: ${weatherInfo.currentTemp}\n🌡️ Höchsttemperatur: ${weatherInfo.maxTemp}\n🌡️ Tiefsttemperatur: ${weatherInfo.minTemp}\n💧 Luftfeuchtigkeit: ${weatherInfo.humidity}\n🌬️ Wind: ${weatherInfo.windSpeed}\n\nBleiben Sie wachsam und achten Sie auf Ihre Gesundheit!`;
            await sendReminderToGroup(chatId, reminderMessage); 
        }
    }
}

async function sendReminderToGroup(chatId, text) {
    await conn.sendMessage(chatId, { text }); // Nachricht direkt an die Gruppe senden
}

function checkTimeAndSendWeather() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    // if ((hours === 7 || hours === 12 || hours === 18) && minutes === 0) 
    // Dies kann angepasst werden, um die Benachrichtigungszeiten zu ändern, nach Ihren Wünschen
    if ((hours === 7 || hours === 12 || hours === 18) && minutes === 0) { 
        console.log('Aktuelle Wetterdaten werden abgerufen...');
        getWeatherInfo(); 
    }
}

function startDailyWeatherReminder() {
    setInterval(() => {
        checkTimeAndSendWeather(); 
    }, 60 * 1000); // Überprüfung jede Minute
}

startDailyWeatherReminder();
