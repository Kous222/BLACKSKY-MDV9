// Funktion zur Umwandlung der Zeit in das Format Stunden:Minuten:Sekunden
function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor(ms / 60000) % 60;
  let s = Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}

let handler = async (m, { conn, text }) => {
  try {
    let user = global.db.data.users[m.sender];
    
    // Registrieren der Attribute, die trainiert werden können
    const attributes = ['attack', 'speed', 'strength', 'Gesundheit', 'defense'];

    // Prüfen, ob das angeforderte Attribut gültig ist
    let attribute = text.toLowerCase().trim();
    if (!attributes.includes(attribute)) {
      conn.reply(m.chat, `乂 *T R A I N I N G*\n\nBitte wähle ein *Attribut* aus, das du trainieren möchtest:\n\n- Attack\n- Speed\n- Strength\n- Gesundheit\n- Defense\n\n_Beispiel_ :\n.training defense`, m, {
            contextInfo: {
                externalAdReply: {
                    mediaType: 1,
                    title: 'BETABOTZ RPG',
                    thumbnailUrl: 'https://telegra.ph/file/05daab7b42157c06636b3.jpg',
                    renderLargerThumbnail: true,
                    sourceUrl: ''
                }
            }
        })
      return;
    }

    // Prüfen, ob der Benutzer genug Ausdauer hat
    if (user.Ausdauer < 10) {
      conn.reply(m.chat, '🌡️ Du hast nicht genug Ausdauer zum Training. Benötigte Ausdauer: 10.', m);
      return;
    }

    // Ausdauer des Benutzers reduzieren
    user.Ausdauer -= 10;

    // Attributsteigerung berechnen
    let increase = 1; // Immer 1 zum Attribut hinzufügen

    // Steigerung zum ausgewählten Attribut hinzufügen
    user[attribute] += increase;

    // Nachricht über das Trainingsergebnis
    let message = `🏋️‍♂️ Du hast gerade ${attribute} trainiert und eine Steigerung erhalten:\n\n`;
    message += `❤️ Dein ${attribute} jetzt: ${user[attribute]}\n`;
    message += `✨ Erzielte Steigerung: ${increase}\n`;
    message += `⚡ Verbleibende Ausdauer: ${user.Ausdauer}\n`;

    conn.reply(m.chat, message, m, {
            contextInfo: {
                externalAdReply: {
                    mediaType: 1,
                    title: 'BETABOTZ RPG',
                    thumbnailUrl: 'https://telegra.ph/file/05daab7b42157c06636b3.jpg',
                    renderLargerThumbnail: true,
                    sourceUrl: ''
                }
            }
        })
  } catch (e) {
    console.log(e);
    conn.reply(m.chat, 'Error', m);
  }
}

handler.help = ['training <attribut>', 'trainieren <attribut>'];
handler.tags = ['rpg'];
handler.command = /^(training|trainieren|berlatih)$/i;
handler.limit = true;
handler.group = true;
handler.rpg = true
handler.fail = null;

module.exports = handler;