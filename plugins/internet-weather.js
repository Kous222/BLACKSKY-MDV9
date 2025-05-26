const fetch = require('node-fetch');

const PIXABAY_API_KEY = '50501244-09ccdc8208acf2c3c83b9dbfb'; // Ersetze das mit deinem Key

async function getWeather(location) {
    try {
        const url = `https://wttr.in/${encodeURIComponent(location)}?format=j1`;
        const response = await fetch(url);
        const data = await response.json();

        const current = data.current_condition[0];
        const forecast = data.weather[0];
        const astronomy = forecast.astronomy[0];

        return {
            location: data.nearest_area[0].areaName[0].value,
            country: data.nearest_area[0].country[0].value,
            weather: current.weatherDesc[0].value,
            currentTemp: current.temp_C,
            feelsLike: current.FeelsLikeC,
            maxTemp: forecast.maxtempC,
            minTemp: forecast.mintempC,
            humidity: `${current.humidity}%`,
            windSpeed: `${current.windspeedKmph} km/h`,
            sunrise: astronomy.sunrise,
            sunset: astronomy.sunset,
        };
    } catch (error) {
        console.error('[wttr.in Fehler]:', error);
        throw new Error('Wetterdaten konnten nicht abgerufen werden.');
    }
}

function formatWeather(data) {
    return `
🌍 *Standort:* ${data.location}, ${data.country}

🌤️ *Wetter:* ${data.weather}
🌡️ *Temperatur:* ${data.currentTemp}°C
🤒 *Gefühlt wie:* ${data.feelsLike}°C

🔼 *Maximal:* ${data.maxTemp}°C
🔽 *Minimal:* ${data.minTemp}°C

💧 *Luftfeuchtigkeit:* ${data.humidity}
💨 *Windgeschwindigkeit:* ${data.windSpeed}

🌅 *Sonnenaufgang:* ${data.sunrise}
🌇 *Sonnenuntergang:* ${data.sunset}
`.trim();
}

async function getCityImage(city) {
    try {
        const url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(city)}&image_type=photo&per_page=3&safesearch=true`;
        const res = await fetch(url);
        const json = await res.json();
        if (json.hits && json.hits.length > 0) {
            return json.hits[0].largeImageURL;
        }
        return null;
    } catch (e) {
        console.error('[Pixabay Fehler]:', e);
        return null;
    }
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) {
        throw `❗ *Verwendung:*\n${usedPrefix + command} <Ort>\n\n📍 *Beispiel:* ${usedPrefix + command} Berlin`;
    }

    let searchText = text;
    if (!/germany|deutschland/i.test(text) && /^[\wäöüß\s-]+$/i.test(text)) {
        searchText += ', Germany';
    }

    await m.reply(`🌐 Suche Wetterdaten für *${text}*...`);

    try {
        const data = await getWeather(searchText);
        const caption = formatWeather(data);

        let imageUrl = await getCityImage(data.location);
        if (!imageUrl) {
            // Fallback auf wttr.in Wetterbild
            imageUrl = `https://wttr.in/${encodeURIComponent(searchText)}.png?m`;
        }

        await conn.sendFile(m.chat, imageUrl, 'wetter.jpg', caption, m);
    } catch (err) {
        console.error('[Fehler beim Abrufen]', err);
        await m.reply(`⚠️ *Wetterdaten konnten nicht abgerufen werden für:* ${text}`);
    }
};

handler.help = ['wetter'];
handler.tags = ['internet'];
handler.command = /^wetter|weather$/i;

module.exports = handler;
