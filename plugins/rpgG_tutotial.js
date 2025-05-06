let handler = async (m, { conn, usedPrefix }) => {
    let tutorial = `
🏰 *Gilden-Tutorial*

1. *Gilde erstellen*
   ${usedPrefix}createguild <gildenname>
   Beispiel: ${usedPrefix}createguild TheDark

2. *Gildeninfo anzeigen*
   ${usedPrefix}guildinfo [@user]
   Beispiel: ${usedPrefix}guildinfo @user

3. *Mit Gilde beitreten*
   ${usedPrefix}joinguild <gildenname>
   Beispiel: ${usedPrefix}joinguild TheDark

4. *Mitglied in die Gilde einladen*
   ${usedPrefix}guildinvite @user
   Beispiel: ${usedPrefix}guildinvite @user

5. *Mitglied zur Gilde annehmen (Nur Besitzer oder Staff)*
   ${usedPrefix}guildaccept @user
   Beispiel: ${usedPrefix}guildaccept @user

6. *Gilde verlassen*
   ${usedPrefix}guildleave
   Beispiel: ${usedPrefix}guildleave

7. *Eigene Gilde anzeigen*
   ${usedPrefix}myguild
   Beispiel: ${usedPrefix}myguild

8. *Gilde upgraden*
   ${usedPrefix}guildupgrade
   Beispiel: ${usedPrefix}guildupgrade

9. *Gilde löschen (Nur Besitzer)*
   ${usedPrefix}delguild <gilden_id>
   Beispiel: ${usedPrefix}delguild 2

10. *Tägliche Missionen für Elixier und Schatz*
    ${usedPrefix}dailyg
    Beispiel: ${usedPrefix}dailyg

11. *Gildenkrieg starten*
    ${usedPrefix}warguild
    Beispiel: ${usedPrefix}warguild

12. *Gildenverteidigung starten*
    ${usedPrefix}deffguild
    Beispiel: ${usedPrefix}deffguild

ℹ️ Weitere Informationen zu jedem Befehl, benutze ${usedPrefix}help [command].

🔗 Viel Spaß beim Entdecken der Gildenfunktionen!
    `;

    conn.reply(m.chat, tutorial, m);
};

handler.help = ['tutorguild'];
handler.tags = ['rpgG'];
handler.command = /^tutorguild$/i;
handler.rpg = true; 
module.exports = handler;
