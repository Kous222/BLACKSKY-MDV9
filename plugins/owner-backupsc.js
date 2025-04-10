const fs = require("fs");
const { exec } = require("child_process");
const cp = require("child_process");
const { promisify } = require("util");
let exec_ = promisify(exec).bind(cp);

let handler = async (m, { conn, isROwner }) => {
   try {
      let zipFileName = `BackupScript.zip`;

      m.reply("Backup-Prozess gestartet. Bitte warten...");

      setTimeout(() => {
         let zipCommand = `zip -r ${zipFileName} * -x "node_modules/*"`;
         exec_(zipCommand, (err, stdout) => {
            if (err) {
               m.reply("Ein Fehler ist beim Erstellen der ZIP-Datei aufgetreten.");
               console.error(err);
               return;
            }

            setTimeout(() => {
               if (fs.existsSync(zipFileName)) {
                  const file = fs.readFileSync(zipFileName);
                  conn.sendMessage(
                     m.chat,
                     {
                        document: file,
                        mimetype: "application/zip",
                        fileName: zipFileName,
                        caption: "Backup fertig. Bitte laden Sie die Backup-Datei herunter.",
                     },
                     { quoted: m }
                  );

                  setTimeout(() => {
                     fs.unlinkSync(zipFileName);
                     m.reply("Backup-Datei wurde gelöscht.");
                  }, 5000);
               } else {
                  m.reply("ZIP-Datei nicht gefunden.");
               }
            }, 60000); // Wait for 1 minute to ensure the zip file is created
         });
      }, 1000);
   } catch (error) {
      m.reply("Ein Fehler ist beim Durchführen des Backups aufgetreten.");
      console.error(error);
   }
};

handler.help = ["backupsc", "sicherung"];
handler.tags = ["owner"];
handler.command = ["backupsc", "sicherung"];
handler.owner = true;

module.exports = handler;
