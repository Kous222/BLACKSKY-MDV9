let handler = async (m, { conn, usedPrefix }) => {
    let tutorial = `
🏰 *Tutorial Gilde*

1. *Memerstellen Gilde*
   ${usedPrefix}createguild <nama_guild>
   Contoh: ${usedPrefix}createguild TheDark

2. *Meansehen Info Gilde*
   ${usedPrefix}guildinfo [@user]
   Contoh: ${usedPrefix}guildinfo @user

3. *Bergabung mit Gilde*
   ${usedPrefix}joinguild <nama_guild>
   Contoh: ${usedPrefix}joinguild TheDark

4. *Mengundang Mitglied zu Gilde*
   ${usedPrefix}guildinvite @user
   Contoh: ${usedPrefix}guildinvite @user

5. *Empfangen Mitglied zu Gilde (Nur Owner oder Staff)*
   ${usedPrefix}guildaccept @user
   Contoh: ${usedPrefix}guildaccept @user

6. *Meninggalkan Gilde*
   ${usedPrefix}guildleave
   Contoh: ${usedPrefix}guildleave

7. *Meansehen Gilde Sendiri*
   ${usedPrefix}myguild
   Contoh: ${usedPrefix}myguild

8. *Upgrade Gilde*
   ${usedPrefix}guildupgrade
   Contoh: ${usedPrefix}guildupgrade

9. *Menglöschen Gilde (Nur Owner)*
   ${usedPrefix}delguild <nomor_guild>
   Contoh: ${usedPrefix}delguild 2

10. *Misi Tagean für Mendapatkan Eksir und Harta*
    ${usedPrefix}dailyg
    Contoh: ${usedPrefix}dailyg

11. *Menjalankan WarGuild*
    ${usedPrefix}warguild
    Contoh: ${usedPrefix}warguild

12. *Menjalankan DeffGuild*
    ${usedPrefix}deffguild
    Contoh: ${usedPrefix}deffguild

ℹ️ Für information mehr fortfahren über jede Befehl, benutze ${usedPrefix}help [command].

🔗 Herzlichen Glückwunsch menjelajahi Funktion Gilde!
    `;

    conn.reply(m.chat, tutorial, m);
};

handler.help = ['tutorguild'];
handler.tags = ['rpgG'];
handler.command = /^tutorguild$/i;
handler.rpg = true; 
module.exports = handler;