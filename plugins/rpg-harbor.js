const handler = async (m, { conn, args }) => {
    const command = args[0];
    const user = global.db.data.users[m.sender];

    // Initialisierung des Hafens aus Nutzerdaten
    class Hafen {
        constructor(user) {
            this.stufe = user.hafenLevel || 1;
            this.maxPassagiere = user.hafenMaxPassagiere || 10;
            this.guthaben = user.hafenGuthaben || 100;
            this.einnahmenProPassagier = user.hafenEinnahmenProPassagier || 5;
            this.passagierAnzahl = user.hafenPassagierAnzahl || 0;
            this.upgradeKosten = user.hafenUpgradeKosten || 50;
        }

        // Methode zum Verbessern des Hafens
        verbessern() {
            if (this.guthaben >= this.upgradeKosten) {
                this.guthaben -= this.upgradeKosten;
                this.stufe++;
                this.maxPassagiere += 1;
                this.einnahmenProPassagier += 1;
                this.upgradeKosten += 100;

                // Änderungen in der Datenbank speichern
                this.speichernInDatenbank();
                
                conn.reply(m.chat, `\`GLÜCKWUNSCH 🎊\`
- [ 🚢 ] Hafen erfolgreich auf Stufe ${this.stufe} aufgewertet!
- [ 👤 ] Maximale Passagiere jetzt: ${this.maxPassagiere}
- [ 💸 ] Einnahmen pro Passagier jetzt: ${this.einnahmenProPassagier}
- [ 💰 ] Verbleibendes Guthaben: ${this.guthaben}
- [ 🪙 ] Kosten für nächstes Upgrade: ${this.upgradeKosten}`);
            } else {
                conn.reply(m.chat, "Nicht genug Guthaben für die Verbesserung!");
            }
        }

        // Methode zum Hinzufügen von Guthaben
        guthabenHinzufuegen(anzahl) {
            this.guthaben += anzahl;
            this.speichernInDatenbank();
            conn.reply(m.chat, `Guthaben erfolgreich hinzugefügt. Aktuelles Guthaben: ${this.guthaben}`);
        }

        // Methode zum Berechnen der Einnahmen pro Stunde
        einnahmenBerechnen() {
            const einnahmen = this.passagierAnzahl * this.einnahmenProPassagier;
            this.guthaben += einnahmen;
            this.speichernInDatenbank();
            conn.reply(m.chat, `Einnahmen von ${this.passagierAnzahl} Passagieren: ${einnahmen}. Aktuelles Guthaben: ${this.guthaben}`);
        }

        // Methode zum Anzeigen der Hafeninformationen
        info() {
            conn.reply(m.chat, `\`STATUSINFORMATIONEN DEINER KREUZFAHRT\`

- [ 🚢 ] Stufe deines Kreuzfahrtschiffs: ${this.stufe}
- [ 👤 ] Maximale Passagiere: ${this.maxPassagiere}
- [ 👥 ] Aktuelle Passagieranzahl: ${this.passagierAnzahl}
- [ 💰 ] Dein Guthaben: ${this.guthaben}
- [ 💵 ] Einnahmen pro Passagier: ${this.einnahmenProPassagier}
- [ 💶 ] Kosten für nächstes Upgrade: ${this.upgradeKosten}`);
        }

        // Methode zum Hinzufügen von Passagieren
        passagierHinzufuegen() {
            if (this.passagierAnzahl < this.maxPassagiere) {
                this.passagierAnzahl += 1; // Einen Passagier hinzufügen
                this.speichernInDatenbank(); // Änderungen in der Datenbank speichern
            }
        }

        // Methode zum Speichern der Daten in der Datenbank
        speichernInDatenbank() {
            user.hafenLevel = this.stufe;
            user.hafenMaxPassagiere = this.maxPassagiere;
            user.hafenGuthaben = this.guthaben;
            user.hafenEinnahmenProPassagier = this.einnahmenProPassagier;
            user.hafenPassagierAnzahl = this.passagierAnzahl;
            user.hafenUpgradeKosten = this.upgradeKosten;
            user.hafenLetztesSpielen = user.hafenLetztesSpielen || 0; // Zeit des letzten Spielens
            user.hafenAbklingzeit = 1; // Abklingzeit in Tagen
        }

        // Methode zum Spielen
        spielen(dauerMinuten) {
            const jetzt = Date.now();
            const abklingzeit = 1 * 86400000; // Abklingzeit von 1 Tag

            // Überprüfen, ob die Abklingzeit noch aktiv ist
            if (jetzt < user.hafenLetztesSpielen + abklingzeit) {
                const verbleibendeZeit = (user.hafenLetztesSpielen + abklingzeit) - jetzt;
                const verbleibendeMinuten = Math.ceil(verbleibendeZeit / 60000);
                return conn.reply(m.chat, `Du bist noch in der Abklingzeit. Bitte warte ${verbleibendeMinuten} Minuten, bevor du wieder spielen kannst.`);
            }

            // Wenn die Abklingzeit vorbei ist, Spielzeit speichern
            user.hafenLetztesSpielen = jetzt;

            let minute = 0;

            const interval = setInterval(() => {
                minute++;
                this.passagierHinzufuegen(); // Passagier hinzufügen
                const einnahmen = this.passagierAnzahl * this.einnahmenProPassagier;
                this.guthaben += einnahmen; // Guthaben entsprechend der Passagieranzahl hinzufügen
                this.speichernInDatenbank(); // Änderungen in der Datenbank speichern
                conn.reply(m.chat, `\`STATUS-UPDATE\`
                
- Minute ${minute}: aktuelle Passagieranzahl ist ${this.passagierAnzahl}

- Einnahmen von ${this.passagierAnzahl} Passagieren: ${einnahmen}. Aktuelles Guthaben: ${this.guthaben}`);

                // Wenn die Dauer erreicht wurde, Interval beenden
                if (minute >= dauerMinuten) {
                    clearInterval(interval);
                    conn.reply(m.chat, `Spiel nach ${dauerMinuten} Minuten beendet.`);
                }
            }, 60000); // 60000 ms = 1 Minute
        }
    }  

    // Initialisierung des Hafens aus Nutzerdaten
    const hafen = new Hafen(user);
    const dauerMinuten = 5; // Dauer in Minuten

    switch (command) {
        case 'hilfe':
            conn.reply(m.chat, `\`AUSWAHLMENÜ HAFENSPIEL\`
1. hafen info
2. hafen verbessern
3. hafen einnahmen
4. hafen spielen`);
            break;
        case 'info':
            hafen.info();
            break;
        case 'verbessern':
            hafen.verbessern();
            break;
        case 'einnahmen':
            hafen.einnahmenBerechnen();
            break;
        case 'spielen':
            hafen.spielen(dauerMinuten);
            break;
        default:
            conn.reply(m.chat, `\`AUSWAHLMENÜ HAFENSPIEL\`
1. hafen info
2. hafen verbessern
3. hafen einnahmen
4. hafen spielen`);
    }
};

handler.help = ['hafen <befehl>', 'kreuzfahrt <befehl>'];
handler.tags = ['spiel'];
handler.command = /^(hafen|kreuzfahrt)$/i;
handler.limit = true;
handler.rpg = true;
handler.group = true;

module.exports = handler;
