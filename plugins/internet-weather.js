const fetch = require('node-fetch');

// Alternative weather API as fallback
async function getWeatherFallback(location) {
    try {
        // This is a free API that doesn't require a key
        const url = `https://wttr.in/${encodeURIComponent(location)}?format=j1`;
        const response = await fetch(url);
        const data = await response.json();
        
        // Extract the weather data
        const current = data.current_condition[0];
        const forecast = data.weather[0];
        
        return {
            location: data.nearest_area[0].areaName[0].value,
            country: data.nearest_area[0].country[0].value,
            weather: current.weatherDesc[0].value,
            currentTemp: current.temp_C,
            maxTemp: forecast.maxtempC,
            minTemp: forecast.mintempC,
            humidity: current.humidity + '%',
            windSpeed: current.windspeedKmph + ' km/h'
        };
    } catch (error) {
        console.error('Fallback weather API error:', error);
        throw new Error('Fallback API failed');
    }
}

let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `Verwendung:\n${usedPrefix + command} <Ort>\nBeispiel: ${usedPrefix + command} Berlin`;
    
    // For smaller German towns, it helps to add Germany for better recognition
    let searchText = text;
    if (!text.toLowerCase().includes('germany') && !text.toLowerCase().includes('deutschland')) {
        // If it looks like a German city but doesn't include the country, add it
        if (/^[A-Za-zäöüÄÖÜß\s-]+$/.test(text)) {
            searchText = `${text}, Germany`;
        }
    }
    
    m.reply(`🔍 Suche nach Wetterdaten für *${text}*...`);
    
    try {
        // Get the API key from config
        const lann = global.lann || global.betabotz || global.apikey || '';
        
        // Properly encode the location and format the URL
        const url = `https://api.betabotz.eu.org/api/tools/cuaca?query=${encodeURIComponent(searchText)}&apikey=${lann}`;
        console.log('Weather API URL:', url);
        
        let res = await fetch(url);
        let responseText = await res.text(); // Get response as text for better debugging
        console.log('Weather API raw response:', responseText);
        
        let json;
        try {
            json = JSON.parse(responseText);
        } catch (e) {
            throw new Error(`JSON Parse Error: ${e.message} - Raw: ${responseText}`);
        }
        
        // Check for API limit exceeded
        if (json.status === 403 && json.message && json.message.includes('limit is 0')) {
            console.log('API limit exceeded, switching to fallback API');
            // Try fallback API
            const weatherData = await getWeatherFallback(searchText);
            
            m.reply(`🌦️ *Wetterbericht für ${weatherData.location}, ${weatherData.country}* (Fallback-API)\n\n` + 
                `🌡️ *Aktuell:* ${weatherData.weather}, ${weatherData.currentTemp}°C\n` +
                `🔼 *Höchsttemperatur:* ${weatherData.maxTemp}°C\n` + 
                `🔽 *Tiefsttemperatur:* ${weatherData.minTemp}°C\n` + 
                `💧 *Luftfeuchtigkeit:* ${weatherData.humidity}\n` + 
                `💨 *Wind:* ${weatherData.windSpeed}`);
            return;
        }
        
        // Primary API error checks
        if (!res.ok) {
            throw new Error(`API Error: Status ${res.status} - ${responseText}`);
        }
        
        if (!json.status || json.status !== true) {
            // Try alternative search - try just the city name without country
            if (searchText !== text && searchText.includes(',')) {
                console.log('Trying alternative search with just the city name');
                // Try fallback API instead
                throw new Error('Primary API: Location not found');
            } else {
                throw new Error('API meldet: Standort nicht gefunden');
            }
        }
        
        let result = json.result;
        if (!result || !result.location) {
            throw new Error('Keine Wetterdaten verfügbar für diesen Ort');
        }
        
        // Properly interpolate the values inside the response string
        m.reply(`🌦️ *Wetterbericht für ${result.location}, ${result.country}*\n\n` + 
                `🌡️ *Aktuell:* ${result.weather}, ${result.currentTemp}°C\n` +
                `🔼 *Höchsttemperatur:* ${result.maxTemp}°C\n` + 
                `🔽 *Tiefsttemperatur:* ${result.minTemp}°C\n` + 
                `💧 *Luftfeuchtigkeit:* ${result.humidity}\n` + 
                `💨 *Wind:* ${result.windSpeed} km/h`);
    } catch (error) {
        console.error('Weather error:', error);
        
        // Try fallback API if original fails
        try {
            console.log('Trying fallback weather API for:', searchText);
            const weatherData = await getWeatherFallback(searchText);
            
            m.reply(`🌦️ *Wetterbericht für ${weatherData.location}, ${weatherData.country}* (Fallback-API)\n\n` + 
                `🌡️ *Aktuell:* ${weatherData.weather}, ${weatherData.currentTemp}°C\n` +
                `🔼 *Höchsttemperatur:* ${weatherData.maxTemp}°C\n` + 
                `🔽 *Tiefsttemperatur:* ${weatherData.minTemp}°C\n` + 
                `💧 *Luftfeuchtigkeit:* ${weatherData.humidity}\n` + 
                `💨 *Wind:* ${weatherData.windSpeed}`);
        } catch (fallbackError) {
            console.error('Fallback weather API also failed:', fallbackError);
            m.reply(`⚠️ Wetterdaten für "${text}" konnten nicht abgerufen werden.\n\nDas tägliche API-Limit wurde erreicht. Bitte versuche es morgen erneut oder verwende einen anderen Befehl.`);
        }
    }
};

handler.help = ['wetter'];
handler.tags = ['internet'];
handler.command = /^(wetter|weather)$/i;

module.exports = handler;

