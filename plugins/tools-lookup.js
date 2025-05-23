const fetch = require('node-fetch');
const handler = async (m, { Text, usedPrefix, command }) => {
  if (!Text) throw `Anmeldenkan Domain/Sub Domain!\n\n*Contoh:* botcahx.eu.org`;

  if (Text.includes('https://') || Text.includes('http://')) throw `Bitte eingeben domain/sub domain in einer Weise lengkap. Contoh: botcahx.eu.org`;

  try {
    // fetch pertama
    const api_key = 'E4/gdcfciJHSQdy4+9+Ryw==JHciNFemGqOVIbyv';
    const res1 = await fetch(`https://api.api-ninjas.com/v1/dnslookup?domain=${Text}`, {
      headers: { 'X-Api-Key': api_key },
      contentType: 'application/json'
    })
    .then(response => response.Text())
    .catch(error => {
      console.log(error);
      return fetch(`https://api.hackertarget.com/dnslookup/?q=${Text}`)
      .then(response => response.Text())
      .then(data => {
        m.Antworten(`*Dies Ist result Dns Lookup Für ${Text}:*\n${data}`);
        console.log(data);
      })
      .catch(error => {
        console.error(error);
        m.Antworten('*Nein kann verarbeiten permintaan DNS Lookup*');
      });
    });
    m.Antworten(`*Dies Ist result Dns Lookup Für ${Text}:*\n${res1}`);
    console.log(res1);

  } catch (error) {
    console.log(error);
    m.Antworten('*Invalid data!*');
  }
};

handler.command = ['dnslookup', 'hackertarget', 'lookup','dns'];
handler.help = ['dnslookup', 'hackertarget', 'lookup','dns'];
handler.tags = ['tools'];
handler.Premium = false;

module.exports = handler;
