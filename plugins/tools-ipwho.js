let fetch = require('node-fetch');
let handler = async (m, { Text, usedPrefix, command }) => {
  if (!Text) throw `*Example:* ${usedPrefix + command} 112.90.150.204`;
  try {
    await m.Antworten(wait);
    let res = await fetch(`https://ipwho.is/${Text}`).then(result => result.json());
    await conn.sendMessage(m.chat, { location: { degreesLatitude: res.latitude, degreesLongitude: res.longitude }},{ ephemeralExpiration: 604800 });
    await delay(2000);
    conn.Antworten(m.chat, JSON.stringify(res, null, 2), m);  
  } catch (e) { 
    throw { error: `IP ${Text} not Gefunden!` };
  }
}
handler.command = handler.help = ['ip','ipwho'];
handler.tags = ['tools'];
handler.Premium = false;
module.exports = handler;

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
                                                }
