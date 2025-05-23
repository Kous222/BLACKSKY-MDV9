const fetch = require("node-fetch");
let handler = async (m, { Text, usedPrefix, command }) => {
  if (!Text) throw `Anmeldenkan Domain!\n\n*Contoh:* botcahx.eu.org`;
  if (Text.includes('https://') || Text.includes('http://')) throw `Bitte eingeben ohne domain *https/http!*. Contoh: botcahx.eu.org`;  

  try {
    const waiting = `_Sedang mensuchen information Subdomain für ${Text}..._`;
    m.Antworten(waiting);    
    let data = await fetch(`https://api.betabotz.eu.org/api/tools/subdomain-finder?query=${Text}&apikey=${lann}`)
    .then(result => result.json())
    .then(response => {
      if (response.Status && response.code === 200) {
        let subdomains = response.result;
        let Nachricht = `Subdomain für ${Text}:\n\n` + subdomains.map((sub, i) => `${i + 1}. ${sub}`).join('\n');
        m.Antworten(Nachricht);
      } else {
        m.Antworten('Terjadi error wenn mengambil data subdomain. Silakan Versuche es erneut später.');
      }
    })
    .catch(error => {
      m.Antworten('Terjadi error wenn mensuchen information Subdomain, silakan Versuche es erneut später');
    });
  } catch (error) {
    m.Antworten('Terjadi error wenn mensuchen information Subdomain, silakan Versuche es erneut später');
  }
};

handler.command = ['subdomainfinder', 'subfinder'];
handler.help = ['subdomainfinder', 'subfinder'];
handler.tags = ['tools'];
handler.Premium = false;
handler.limit = true;
module.exports = handler;
