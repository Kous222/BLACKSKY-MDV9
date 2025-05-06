/** !! DIESER CODE WURDE VON RODOTZBOT GENERIERT !! **/

const ZUSTÄNDE = {
  UNTÄTIG: 0,
  SUCHT: 1,
  VERFOLGT: 2,
};

function zufallsZahl(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const handler = async (m, { conn, usedPrefix, command, args }) => {
  const sender = m.sender;
  const user = global.db.data.users[sender];
  conn.spieler = conn.spieler || {};
  const spieler = conn.spieler[sender] || { geld: 0, gefassteDiebe: 0, letzteSuche: 0, lupe: 0, stufe: 1, zustand: ZUSTÄNDE.UNTÄTIG };

  if (command === "polizei") {
    if (args.length === 0) {
      conn.reply(m.chat, "*👮‍♂️ Willkommen beim Polizei-und-Dieb-Spiel 👮‍♂️*\n\n" +
        "🔍 Nutze den Befehl *.polizei suchen*, um nach einem Dieb zu suchen.\n" +
        "🚓 Wenn du Spuren findest, musst du die richtige Aktion wählen, um ihn zu fangen.\n" +
        "💰 Du bekommst eine Belohnung, wenn du erfolgreich bist.\n" +
        "🚨 Wähle eine Aktion aus: verfolgen, schießen, werfen oder fangen.\n" +
        "🔍 Nutze *.polizei <aktion>*, um den Dieb zu erwischen.\n" +
        "🔎 Kaufe eine Lupe mit *.polizei gegenstand lupe*, um deine Chancen zu erhöhen.\n" +
        "🏆 Zeige das Ranking mit *.polizei rangliste* an.\n" +
        "ℹ️ Nutze *.polizei status*, um deinen aktuellen Status zu sehen.", m, {
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

    const unterBefehl = args[0];
    if (unterBefehl === "suchen") {
      if (spieler.zustand !== ZUSTÄNDE.UNTÄTIG) {
        return conn.reply(m.chat, "*🔍 Du suchst bereits...*", m);
      }

      if (Date.now() - spieler.letzteSuche < 30000) {
        return conn.reply(m.chat, "*⏱️ Du musst etwas warten, bevor du erneut suchen kannst.*", m);
      }

      spieler.zustand = ZUSTÄNDE.SUCHT;
      spieler.letzteSuche = Date.now();

      const stufe = spieler.stufe;
      const aktionen = {
        1: "verfolgen",
        2: "schießen",
        3: "werfen",
        4: "fangen",
      };
      const diebAktion = aktionen[stufe];

      conn.reply(m.chat, `*🔍 Du hast eine Spur eines Diebs der Stufe ${stufe} gefunden!* Führe die Aktion *${diebAktion.toUpperCase()}* aus, um ihn zu fangen.`, m);

      spieler.aktion = diebAktion;
    } else if (unterBefehl === "status") {
      conn.reply(m.chat, `*👮‍♂️ Polizeistatus 👮‍♂️*\n\n🔍 Suche aktiv: ${spieler.zustand === ZUSTÄNDE.SUCHT ? "Ja" : "Nein"}\n🚓 Gefasste Diebe: ${spieler.gefassteDiebe}\n💰 Geld: €${spieler.geld.toLocaleString()}\n🏆 Diebstufe: ${spieler.stufe}`, m);
    } else if (unterBefehl === "gegenstand") {
      if (args.length === 1) {
        conn.reply(m.chat, "*🛒 Gegenstand-Shop 🛒*\n\nLupe - 200 Münzen\n" +
          `Nutze *${usedPrefix}polizei gegenstand lupe*, um eine Lupe zu kaufen.`, m);
      } else {
        const gegenstand = args[1]?.toLowerCase();
        if (gegenstand === "lupe") {
          if (spieler.lupe) {
            return conn.reply(m.chat, "*🛒 Du besitzt bereits eine Lupe.*", m);
          }

          if (spieler.geld < 200) {
            return conn.reply(m.chat, "*🛒 Du hast nicht genug Geld, um eine Lupe zu kaufen.*", m);
          }

          spieler.lupe = 1;
          spieler.geld -= 200;
          conn.reply(m.chat, "*🛒 Du hast erfolgreich eine Lupe gekauft.* Nutze 'polizei suchen', um deine Chancen zu verbessern.", m);
        } else {
          conn.reply(m.chat, "*🛒 Unbekannter Gegenstand.*", m);
        }
      }
    } else if (unterBefehl === "rangliste") {
      const rangliste = Object.entries(conn.spieler)
        .map(([id, daten]) => ({ id, gefassteDiebe: daten.gefassteDiebe }))
        .sort((a, b) => b.gefassteDiebe - a.gefassteDiebe)
        .slice(0, 5);

      let msg = "*🏆 Rangliste 🏆*\n\n";
      for (let i = 0; i < rangliste.length; i++) {
        msg += `${i + 1}. @${rangliste[i].id.split("@")[0]} – ${rangliste[i].gefassteDiebe} Diebe gefasst\n`;
      }

      conn.reply(m.chat, msg, m);
    } else if (unterBefehl === "stoppen") {
      user.Münzen += spieler.geld * spieler.gefassteDiebe;
      let endMsg = `*🏁 Spiel beendet 🏁*\n\n🚓 Gefasste Diebe: ${spieler.gefassteDiebe}\n💰 Gesamtgeld: €${spieler.geld.toLocaleString()}\n🏆 Stufe: ${spieler.stufe}`;
      conn.reply(m.chat, `*👮‍♂️ Deine Spielsitzung wurde beendet.*\n\n${endMsg}`, m);
      spieler.zustand = ZUSTÄNDE.UNTÄTIG;
      spieler.aktion = undefined;
    } else {
      if (spieler.zustand !== ZUSTÄNDE.SUCHT) {
        return conn.reply(m.chat, "*🔍 Du musst zuerst einen Dieb suchen mit dem Befehl 'polizei suchen'.*", m);
      }

      const polizeiAktion = unterBefehl.toLowerCase();
      const stufe = spieler.stufe;
      const erlaubteAktionen = {
        1: ["verfolgen", "schießen", "werfen"],
        2: ["schießen", "fangen"],
        3: ["fangen"],
      };

      if (!erlaubteAktionen[stufe].includes(polizeiAktion)) {
        return conn.reply(m.chat, `*🚓 Deine Aktion (${polizeiAktion.toUpperCase()}) passt nicht zur gefundenen Spur.*`, m);
      }

      if (erlaubteAktionen[stufe].includes(spieler.aktion)) {
        let belohnung = 0;
        switch (polizeiAktion) {
          case "verfolgen":
            belohnung = 1000 * stufe;
            break;
          case "schießen":
            belohnung = 2000 * stufe;
            break;
          case "werfen":
            belohnung = 3000 * stufe;
            break;
          case "fangen":
            belohnung = 5000 * stufe;
            break;
        }

        spieler.gefassteDiebe++;
        spieler.geld += belohnung;
        user.Münzen += belohnung;
        if (spieler.geld < 5000) {
          spieler.geld = 5000;
        }

        conn.reply(m.chat, `*🚓 Du hast erfolgreich einen Dieb der Stufe ${stufe} gefasst!* Belohnung: €${belohnung.toLocaleString()}. Gesamtgeld: €${spieler.geld.toLocaleString()}.`, m);
      } else {
        conn.reply(m.chat, "*🚓 Falsche Aktion – der Dieb ist entkommen!*", m);
      }

      spieler.zustand = ZUSTÄNDE.UNTÄTIG;
      spieler.aktion = undefined;
    }

    conn.spieler[sender] = spieler;
  } else if (command === "info") {
    conn.reply(m.chat, "*ℹ️ Nutze den Befehl 'polizei', um das Polizei-und-Dieb-Spiel zu starten.*", m);
  }
};

handler.help = ["polizei", "polizei suchen", "polizei status", "polizei gegenstand <gegenstand>", "polizei rangliste", "polizei stoppen"];
handler.tags = ["rpg"];
handler.group = true;
handler.command = ["polizei"];
handler.rpg = true;

module.exports = handler;
