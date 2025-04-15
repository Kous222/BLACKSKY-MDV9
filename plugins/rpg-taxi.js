let handler = async (m, { conn, text, usedPrefix, command }) => {
  // Zielbenutzer ermitteln
  let target = text ? (text.includes('@') ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : text) : m.sender;
  const user = global.db.data.users[target];

  // Wenn der Benutzer nicht existiert
  if (!user) return m.reply('Benutzer nicht gefunden. Bitte überprüfe den Benutzernamen.');

  // Wenn Jail-Status und Arbeitszeit nicht definiert sind, initialisieren
  if (user.jail === undefined) user.jail = false;
  if (user.perkerjaandua === undefined) user.perkerjaandua = 0;

  // Falls der Benutzer im Gefängnis ist und die Zeit noch läuft
  if (user.jail && user.perkerjaandua > Date.now()) {
    let remainingTime = user.perkerjaandua - Date.now();
    let minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
    let seconds = Math.floor((remainingTime / 1000) % 60);

    // Wenn der Zielbenutzer der Absender ist
    if (target === m.sender) {
      return m.reply(`*Du befindest dich noch im Gefängnis!* 😞\n*Verbleibende Zeit:* ${minutes} Minuten und ${seconds} Sekunden.`);
    } else {
      return m.reply(`*Diese Person ist noch im Gefängnis!* ⛓️\n*Verbleibende Zeit:* ${minutes} Minuten und ${seconds} Sekunden.`, null, {
        mentions: [target]
      });
    }
  }

  // Wenn der Benutzer lebenslänglich im Gefängnis ist
  if (user.jail === true && user.perkerjaandua === 0) {
    if (target === m.sender) {
      return m.reply('*Du bist lebenslang im Gefängnis!* 🚨\nEs gibt kein Entkommen mehr!');
    } else {
      return m.reply(`*Diese Person ist lebenslang im Gefängnis!* 🚨\nEs gibt kein Entkommen mehr.`, null, {
        mentions: [target]
      });
    }
  }

  // Wenn der Benutzer nicht im Gefängnis ist
  if (target === m.sender) {
    return m.reply('*Du bist nicht im Gefängnis.* ✅\nDu kannst frei agieren!');
  } else {
    return m.reply(`*Diese Person ist nicht im Gefängnis.* ✅\nKeine Haftstrafe für sie!`, null, {
      mentions: [target]
    });
  }

  // TAXI LOGIC
  // Wenn der Benutzer schon auf einen Taxi-Auftrag wartet
  if (user.lasttaxi + 1800000 > new Date * 1) {
    let timers = ms((user.lasttaxi + 1800000) - (new Date * 1))
    m.reply(`Du musst noch ${timers} warten, bevor du wieder einen Auftrag annehmen kannst!`)
  } else {
    // Bei erfolgreicher Auftragannahme
    m.reply('🔍 Auftrag wird gesucht...')

    // Simuliere Taxi-Road/Progression
    let roadProgress = ['🔲 Beginn der Fahrt...', '🛣️ Auf dem Weg...', '🚗 Du bist fast da...', '🏁 Ankunft!']
    let roadStage = 0;

    let roadInterval = setInterval(() => {
      if (roadStage < roadProgress.length) {
        m.reply(roadProgress[roadStage]);
        roadStage++;
      } else {
        clearInterval(roadInterval);
      }
    }, 5000);  // Alle 5 Sekunden ein Fortschritt, bis der "Auftrag abgeschlossen" ist

    setTimeout(() => {
        m.reply('🛑 Auftrag wurde storniert.')
    }, 10000) // Time limit for taxi journey cancellation

    setTimeout(() => {
        m.reply('🚗 Auftragsvermittlung abgeschlossen, steige ein!')
    }, 15000)

    user.lasttaxi = new Date * 1
  }
};

handler.help = ['taxi']
handler.tags = ['rpg']
handler.command = /^(taxi)$/i
handler.register = true
handler.group = true
handler.rpg = true

module.exports = handler;
