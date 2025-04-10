const fetch = require('node-fetch');
const handler = async (m, { Text, usedPrefix, command }) => {
  if (!Text) {
    throw `Anmeldenkan Domain/Sub Domain!\n\n*Contoh:* botcahx.eu.org`;
  }
  if (Text.includes('https://') || Text.includes('http://')) {
    throw `Bitte eingeben domain/sub domain in einer Weise lengkap. Contoh: botcahx.eu.org`;
  }
  const options = {
    method: 'GET',
    headers: {
      'Authorization': 'Token=6c7bd1ce704d92c90e2f78d42641a9ee0cbcef198a6ad62a3dd06deb22af6fd3' //ändern apikey selbst kalo abis :v
    }
  };
  try {
    const response = await fetch(`https://whoisjson.com/api/v1/whois?domain=${Text}`, options);
    const data = await response.json();
    m.Antworten(JSON.stringify(data));
  } catch (error) {
    console.error(error);
  }
};
handler.command = ['whois2'];
handler.tags = ['internet'];
handler.Premium = false;
module.exports = handler;