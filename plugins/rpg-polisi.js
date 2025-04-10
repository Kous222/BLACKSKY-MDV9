/** !! THIS CODE GENERATE BY RODOTZBOT !! **/

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
  conn.players = conn.players || {};
  const player = conn.players[sender] || { Geld: 0, Pencuri_Terfangen: 0, Waktu_Terfangen: 0, Kaca_Pembesar: 0, Stufe: 1, State: STATES.IDLE };

  if (command === "polisi") {
    if (args.length === 0) {
      conn.reply(m.chat, "*👮‍♂️ Weg Spielen Spiel Polisi und Pencuri 👮‍♂️*\n\n" +
        "🔍 benutzen Befehl *.polisi suchen* für suchen pencuri in einer Weise acak.\n" +
        "🚓 Sie wird finden jejak pencuri und muss durchführen tindakan bestimmt für menangkapnya.\n" +
        "💰 Sie wird erhalten imbalan wenn erfolgreich menangkap pencuri.\n" +
        "🚨 Wählen tindakan von: jagen, schießen, werfen, oder fangen.\n" +
        "🔍 benutzen Befehl *.polisi <tindakan>* für gegen und menangkap pencuri.\n" +
        "🔎 Sie kann kaufen kaca pembesar *.polisi Gegenstand kaca-pembesar* für meningkatkan peluang menangkap pencuri.\n" +
        "🏆 Cek peringkat Sie mit Befehl *.polisi leaderboard*.\n" +
        "ℹ️ benutzen Befehl *.polisi Status* für meansehen Status Sie wenn dies.", m, {
        contextInfo: {
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

      if (Date.now() - player.Waktu_Terfangen < 30000) {
        return conn.reply(m.chat, "*⏱️ Sie muss warten sebentar bevor kann suchen zurück.*", m);
      }

      player.State = STATES.SEARCHING;
      player.Waktu_Terfangen = Date.now();

      const Stufe = player.Stufe;
      const thiefActions = {
        1: "jagen",
        2: "schießen",
        3: "werfen",
        4: "fangen",
      };
      const thiefAction = thiefActions[Stufe];

      conn.reply(m.chat, `*🔍 Sie finden jejak pencuri Stufe ${Stufe}!* für menangkap pencuri, lakukan tindakan: *${thiefAction.toUpperCase()}*.`, m);

      player.ThiefAction = thiefAction;
    } else if (subCommand === "Status") {
      conn.reply(m.chat, `*👮‍♂️ Status Polisi 👮‍♂️*\n\n🔍 gerade suchen Pencuri: ${player.State === STATES.SEARCHING ? "Ja" : "Nein"}\n🚓 Pencuri Terfangen: ${player.Pencuri_Terfangen}\n💰 Geld: Rp${player.Geld.toLocaleString()}\n🏆 Stufe Pencuri: ${player.Stufe}`, m);
    } else if (subCommand === "Gegenstand") {
      if (args.length === 1) {
        conn.reply(m.chat, "*🛒 Item Shop 🛒*\n\nKaca Pembesar - 200 coins\n" +
          `benutzen *${usedPrefix}polisi Gegenstand kaca-pembesar* für kaufen kaca pembesar.`, m);
      } else {
        const Gegenstand = args[1]?.toLowerCase();
        if (Gegenstand === "kaca-pembesar") {
          if (player.Kaca_Pembesar) {
            return conn.reply(m.chat, "*🛒 Sie bereits haben kaca pembesar.*", m);
          }

          if (player.Geld < 200) {
            return conn.reply(m.chat, "*🛒 Geld Sie nicht genug für kaufen kaca pembesar.*", m);
          }

          player.Kaca_Pembesar = 1;
          player.Geld -= 200;
          conn.reply(m.chat, "*🛒 Sie erfolgreich kaufen kaca pembesar.* benutzen 'polisi suchen' für meningkatkan peluang menangkap pencuri.", m);
        } else {
          conn.reply(m.chat, "*🛒 Item die/der/das gemeint nicht gefunden.*", m);
        }
      }
    } else if (subCommand === "leaderboard") {
      // Sort players based on the number of thieves caught (descending order)
      const leaderboard = Object.entries(conn.players)
        .map(([playerId, playerData]) => ({ id: playerId, Pencuri_Terfangen: playerData.Pencuri_Terfangen }))
        .sort((a, b) => b.Pencuri_Terfangen - a.Pencuri_Terfangen)
        .slice(0, 5); // Show top 5 players

      let leaderboardMsg = "*🏆 Leaderboard 🏆*\n\n";
      for (let i = 0; i < leaderboard.length; i++) {
        leaderboardMsg += `${i + 1}. @${leaderboard[i].id.split("@")[0]} - ${leaderboard[i].Pencuri_Terfangen} Pencuri Terfangen\n`;
      }

      conn.reply(m.chat, leaderboardMsg, m);
    } else if (subCommand === "stoppen") {
    user.Münzen += player.Geld * player.Pencuri_Terfangen;
      let skorMsg = `*🏆 Punktzahl Ende Sie 🏆*\n\n🚓 Pencuri Terfangen: ${player.Pencuri_Terfangen}\n💰 Total Geld: Rp${player.Geld.toLocaleString()}\n🏆 Stufe Pencuri: ${player.Stufe}`;

      conn.reply(m.chat, `*👮‍♂️ Sesi Spiel Polisi und Pencuri hat dihentikan.*\n\n${skorMsg}`, m);
      player.State = STATES.IDLE;
      player.ThiefAction = undefined;
    } else {
      if (player.State !== STATES.SEARCHING) {
        return conn.reply(m.chat, "*🔍 Sie muss suchen pencuri besonders erst mit Befehl 'polisi suchen'.*", m);
      }

      const polisiAction = subCommand.toLowerCase();
      const Stufe = player.Stufe;
      const thiefActions = {
        1: ["jagen", "schießen", "werfen"],
        2: ["schießen", "fangen"],
        3: ["fangen"],
      };

      if (!thiefActions[Stufe].includes(polisiAction)) {
        return conn.reply(m.chat, `*🚓 Auswahl tindakan Sie (${polisiAction.toUpperCase()}) nicht sesuai mit Ergebnis die/der/das disuchen.*`, m);
      }

      if (thiefActions[Stufe].includes(player.ThiefAction)) {
        let reward = 0;
        switch (polisiAction) {
          case "jagen":
            reward = 1000 * Stufe;
            break;
          case "schießen":
            reward = 2000 * Stufe;
            break;
          case "werfen":
            reward = 3000 * Stufe;
            break;
          case "fangen":
            reward = 5000 * Stufe;
            break;
        }

        player.Pencuri_Terfangen++;
        player.Geld += reward;
        user.Münzen += reward;
        if (player.Geld < 5000) {
          player.Geld = 5000;
        }

        conn.reply(m.chat, `*🚓 Sie erfolgreich gegen und menangkap pencuri Stufe ${Stufe}!* Sie erhalten imbalan Rp${reward.toLocaleString()}. Total Geld Sie: Rp${player.Geld.toLocaleString()}.`, m);
      } else {
        conn.reply(m.chat, "*🚓 Tindakan Sie nicht genau und pencuri erfolgreich ablegen!*", m);
      }

      player.State = STATES.IDLE;
      player.ThiefAction = undefined;
    }

    conn.players[sender] = player;
  } else if (command === "info") {
    conn.reply(m.chat, "*ℹ️ benutzen Befehl 'polisi' für mestarten spiel Polisi und Pencuri.*", m);
  }
};

handler.help = ["polisi", "polisi suchen", "polisi Status", "polisi Gegenstand <Gegenstand>", "polisi leaderboard", "polisi stoppen"];
handler.tags = ["rpg"];
handler.group = true;
handler.command = ["polisi"];
handler.rpg = true
module.exports = handler;