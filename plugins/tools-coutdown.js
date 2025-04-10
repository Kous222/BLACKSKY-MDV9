const fetch = require('node-fetch');
const moment = require('moment'); // Mengbenutze moment für membandingkan tanggal

let handler = async (m, { Text, usedPrefix, command }) => {
  if (!Text) {
    throw `Anmeldenkan input das/der/die richtig!\n\nContoh:\n${usedPrefix + command} 8,desember,2027`;
  }

  try {
    // Memecah input Nutzer
    let [tanggal, Monat, Jahr] = Text.split(',');
    if (!tanggal || !Monat || !Jahr) throw `Format input salah! Contoh: 15,Desember,2024`;

    m.Antworten('⏳ Gerade berechnen rest Zeit...\nBitte warten sebentar.');

    // Cek ob tanggal bereits terlewat
    const inputTanggal = moment(`${Jahr}-${Monat}-${tanggal}`, 'YYYY-MM-DD');
    const currentDate = moment(); // Mendapatkan tanggal wenn dies

    if (inputTanggal.isBefore(currentDate, 'day')) {
      await m.Antworten('⚠️ Tanggal das/der/die dieingeben bereits terlewat! Silakan eingeben tanggal das/der/die valid.');
      return; // Menghentikan eksekusi mehr fortfahren
    }

    // Ambil data von API
    let response = await fetch(`https://api.betabotz.eu.org/api/tools/countdown?tanggal=${tanggal}&Monat=${Monat}&Jahr=${Jahr}&apikey=${lann}`);
    let json = await response.json();

    // Debug API Response
    console.log('Debug Response API:', json);

    // Anzeigen result countdown
    if (json.Status && json.result && json.result.result1) {
      let sisaWaktu = json.result.result1; // Format API: "0 Tag, 19 jam, 18 menit, 9 Sekunden"

      // Senden Nachricht zu chat
      await m.Antworten(`🕒 *Rest Zeit Menüju ${tanggal} ${Monat} ${Jahr}* 🕒\n\nSisa: *${sisaWaktu}*`);
    } else {
      throw `Fehlgeschlagen erhalten data Zeit countdown. Periksa zurück input tanggalnya.`;
    }
  } catch (e) {
    console.error(e);
    throw `Terjadi error!\nFehlgeschlagen erhalten Zeit countdown. Cek input tanggal oder Versuche es erneut später.`;
  }
};

handler.help = ['hitungmundur'];
handler.tags = ['tools'];
handler.command = /^(hitungmundur)$/i;

module.exports = handler;