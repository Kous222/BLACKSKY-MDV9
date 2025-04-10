const STATES = {
  IDLE: 0,
  SEARCHING: 1,
  FIGHTING: 2,
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const handler = async (m, { conn, usedPrefix, command, args }) => {
  const sender = m.sender;
  const user = global.db.data.users[sender]
  conn.playerr = conn.playerr || {};
  const player = conn.playerr[sender] || { Balance: 0, Pasien_Sembuh: 0, Waktu_Sembuh: 0, Obat_Super: 0, Lv: 1, State: STATES.IDLE };

  if (command === "dokter") {
    if (args.length === 0) {
      conn.reply(m.chat, "*👨‍⚕ Weg Spielen Spiel Dokter Und Pasien 👨‍⚕*\n\n" +
        "🔍 benutzen Befehl *.dokter suchen* für suchen pasien in einer Weise acak.\n" +
        "🚑 Sie wird finden jejak pencuri und muss durchführen tindakan bestimmt für menangkapnya.\n" +
        "💰 Sie wird erhalten imbalan wenn erfolgreich menangkap pencuri.\n" +
        "💉 Wählen tindakan von: beriobat, rawat, suntik und operasi.\n" +
        "🔍 benutzen Befehl *.dokter <tindakan>* für merawat und menyembuhkan pasien.\n" +
        "🔎 Sie kann kaufen obat super *.dokter Gegenstand obat-super* für meningkatkan peluang menyembuhkan pasien.\n" +
        "🏆 Cek peringkat Sie mit Befehl *.dokter leaderboard*.\n" +
        "ℹ️ benutzen Befehl *.dokter Status* für meansehen Status Sie wenn dies.", m, {
        contextInfo: {
isForwarded: true,
forwardedNewsletterMessageInfo: {
newsletterJid: '120363248530706545@newsletter', 
newsletterName: '>>BETABOTZ RPG<<', 
serverMessageId: -1
},
          externalAdReply: {
            mediaType: 1,
            title: 'BETABOTZ RPG',
            thumbnailUrl: 'https://telegra.ph/file/505b8d95fd7ee7b9481e3.jpg',
            renderLargerThumbnail: true,
            sourceUrl: ''
          }
        }
      });
      return;
    }

    const subCommand = args[0];
    if (subCommand === "suchen") {
      if (player.State !== STATES.IDLE) {
        return conn.reply(m.chat, "*🔍 gerade in suche...*", m);
      }

      if (Date.now() - player.Waktu_Sembuh < 30000) {
        return conn.reply(m.chat, "*⏱️ Sie muss warten sebentar bevor kann suchen zurück.*", m);
      }

      player.State = STATES.SEARCHING;
      player.Waktu_Sembuh = Date.now();

      const Stufe = player.Lv;
      const thiefActions = {
        1: "beriobat",
        2: "rawat",
        3: "suntik",
        4: "operasi",
      };
      const thiefAction = thiefActions[Stufe];

      conn.reply(m.chat, `*🔍 Sie finden pasien Stufe ${Stufe}!* für menyembuhkan pasien, lakukan tindakan: *${thiefAction.toUpperCase()}*.`, m);

      player.ThiefAction = thiefAction;
    } else if (subCommand === "Status") {
      conn.reply(m.chat, `*👨‍⚕ Status Dokter 👨‍⚕*\n\n🔍 gerade suchen Pasien: ${player.State === STATES.SEARCHING ? "Ja" : "Nein"}\n🚑 Pasien Sembuh: ${player.Pasien_Sembuh}\n💰 Balance: Rp${player.Balance.toLocaleString()}\n🏆 Stufe Pasien: ${player.Lv}`, m);
    } else if (subCommand === "Gegenstand") {
      if (args.length === 1) {
        conn.reply(m.chat, "*🛒 Item Shop 🛒*\n\nObat super - 500 coins\n" +
          `benutzen *${usedPrefix}dokter Gegenstand obat-super* für kaufen kaca pembesar.`, m);
      } else {
        const Gegenstand = args[1]?.toLowerCase();
        if (Gegenstand === "obat-super") {
          if (player.Obat_Super) {
            return conn.reply(m.chat, "*🛒 Sie bereits haben obat super.*", m);
          }

          if (player.Balance < 500) {
            return conn.reply(m.chat, "*🛒 Balance Sie nicht genug für kaufen obat super.*", m);
          }

          player.Obat_Super = 1;
          player.Balance -= 500;
          conn.reply(m.chat, "*🛒 Sie erfolgreich kaufen obat super.* benutzen '.dokter suchen' für meningkatkan peluang menyembuhkan pasien.", m);
        } else {
          conn.reply(m.chat, "*🛒 Item die/der/das gemeint nicht gefunden.*", m);
        }
      }
    } else if (subCommand === "leaderboard") {
      // Sort playerr based on the number of thieves caught (descending order)
      const leaderboard = Object.entries(conn.playerr)
        .map(([playerId, playerData]) => ({ id: playerId, Pasien_Sembuh: playerData.Pasien_Sembuh }))
        .sort((a, b) => b.Pasien_Sembuh - a.Pasien_Sembuh)
        .slice(0, 5); // Show top 5 playerr

      let leaderboardMsg = "*🏆 Leaderboard 🏆*\n\n";
      for (let i = 0; i < leaderboard.length; i++) {
        leaderboardMsg += `${i + 1}. @${leaderboard[i].id.split("@")[0]} - ${leaderboard[i].Pasien_Sembuh} Pasien Sembuh\n`;
      }

      conn.reply(m.chat, leaderboardMsg, m);
    } else if (subCommand === "stoppen") {
    user.Münzen += player.Balance * player.Pasien_Sembuh;
      let skorMsg = `*🏆 Punktzahl Ende Sie 🏆*\n\n🚑 Pasien Sembuh: ${player.Pasien_Sembuh}\n💰 Total Balance: Rp${player.Balance.toLocaleString()}\n🏆 Stufe Pasien: ${player.Lv}`;

      conn.reply(m.chat, `*👨‍⚕ Sesi Spiel Dokter und Pasien hat dihentikan.*\n\n${skorMsg}`, m);
      player.State = STATES.IDLE;
      player.ThiefAction = undefined;
    } else {
      if (player.State !== STATES.SEARCHING) {
        return conn.reply(m.chat, "*🔍 Sie muss suchen pasien besonders erst mit Befehl '.dokter suchen'.*", m);
      }

      const dokterAction = subCommand.toLowerCase();
      const Stufe = player.Lv;
      const thiefActions = {
        1: ["beriobat", "rawat", "suntik"],
        2: ["rawat", "operasi"],
        3: ["operasi"],
      };

      if (!thiefActions[Stufe].includes(dokterAction)) {
        return conn.reply(m.chat, `*🚑 Auswahl tindakan Sie (${dokterAction.toUpperCase()}) nicht sesuai mit Ergebnis die/der/das disuchen.*`, m);
      }

      if (thiefActions[Stufe].includes(player.ThiefAction)) {
        let reward = 0;
        switch (dokterAction) {
          case "beriobat":
            reward = 1000 * Stufe;
            break;
          case "rawat":
            reward = 2000 * Stufe;
            break;
          case "suntik":
            reward = 3000 * Stufe;
            break;
          case "operasi":
            reward = 5000 * Stufe;
            break;
        }

        player.Pasien_Sembuh++;
        player.Balance += reward;
        user.Münzen += reward;
        if (player.Balance < 5000) {
          player.Balance = 5000;
        }

        conn.reply(m.chat, `*🚑 Sie erfolgreich merawat und menyembuhkan pasien Stufe ${Stufe}!* Sie erhalten imbalan Rp${reward.toLocaleString()}. Total Balance Sie: Rp${player.Balance.toLocaleString()}.`, m);
      } else {
        conn.reply(m.chat, "*🚑 Tindakan Sie nicht genau und pasien meninggal dunia!*", m);
      }

      player.State = STATES.IDLE;
      player.ThiefAction = undefined;
    }

    conn.playerr[sender] = player;
  } else if (command === "info") {
    conn.reply(m.chat, "*ℹ️ benutzen Befehl '.dokter' für mestarten spiel Dokter und Pasien.*", m);
  }
};

handler.help = ["dokter", "dokter suchen", "dokter Status", "dokter Gegenstand <Gegenstand>", "dokter leaderboard", "dokter stoppen"];
handler.tags = ["rpg"];
handler.group = true;
handler.command = ["dokter"];
handler.rpg = true

module.exports = handler;