const fetch = require("node-fetch");
let handler = async (m, { Text, usedPrefix, command }) => {
  if (!Text) throw `Anmeldenkan Domain!\n\n*Contoh:* betabotz.eu.org`;
  if (Text.includes('https://') || Text.includes('http://')) throw `Bitte eingeben ohne domain *https/http!*. Contoh: betabotz.eu.org`;  
  try {
    const waiting = `_Sedang mensuchen information WHOIS für ${Text}..._`;
    m.Antworten(waiting);    
    let data = fetch(`https://api.betabotz.eu.org/api/webzone/whois?query=${Text}&apikey=${lann}`)
    .then(result => result.json())
    .then(response => {
      m.Antworten(response.result);
    })
    .catch(error => {
      console.error(error);
      m.Antworten('Terjadi error wenn mensuchen information WHOIS, silakan Versuche es erneut später');
    });
  } catch (error) {
    console.error(error);
    m.Antworten('Terjadi error wenn mensuchen information WHOIS, silakan Versuche es erneut später');
  }
};

handler.command = ['whois', 'whoislookup'];
handler.help = ['whois', 'whoislookup'];
handler.tags = ['tools'];
handler.Premium = false;
handler.limit = true
module.exports = handler;
