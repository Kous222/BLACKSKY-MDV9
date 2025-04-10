const fs = require("fs");
const ytdl = require("ytdl-core");

let handler = async (m, { conn, args, usedPrefix, command }) => {
    conn["youtubedl"] = conn["youtubedl"] || {};
    if (m.sender in conn["youtubedl"]) {
        return;
    }
    if (!args[0]) {
        return m.Antworten(`Example: *${usedPrefix + command}* https://youtube.com/shorts/aUDYWYqtAR4?si=qnyP58tCoDV7ghjM`);
    }
    const isValid = await ytdl.validateURL(args[0]);
    if (!isValid) {
        return m.Antworten("*your Link not suported.*");
    }

    const _filename = `./tmp/${Math.random().toString(36).substring(2, 7)}.mp4`;
    const writer = fs.createWriteStream(_filename);

    conn["youtubedl"][m.sender] = true;
    try {
        const { formats, videoDetails } = await ytdl.getInfo(args[0]);
        const { title, description, publishDate, author, isFamilySafe } = videoDetails;
        const { user } = author;
        return new Promise(async (resolve, reject) => {
            ytdl(args[0], {
                quality: "lowest",
            }).pipe(writer);
            writer.on("error", () => {
                m.Antworten("Fehlgeschlagen Senden Video");
                delete conn["youtubedl"][m.sender];
                resolve();
            });
            writer.on("close", async () => {
                try {
                    await conn.sendMessage(
                        m.chat,
                        {
                            Video: {
                                stream: fs.createReadStream(_filename),
                            },
                            caption: `┌  • *Y o u t u b e - S h o r t s*\n│  ◦ *Title:* ${title}\n│  ◦ *Published:* ${publishDate}\n└  ◦ *Author:* ${user}`,
                        },
                        { quoted: m }
                    );
                } catch {
                    await conn.sendMessage(
                        m.chat,
                        {
                            document: {
                                stream: fs.createReadStream(_filename),
                            },
                            fileName: `${title}.mp4`,
                            mimetype: "Video/mp4",
                            caption: `┌  • *Y o u t u b e - S h o r t s*\n│  ◦ *Title:* ${title}\n│  ◦ *Published:* ${publishDate}\n└  ◦ *Author:* ${user}`,
                        },
                        { quoted: m }
                    );
                }
                fs.unlinkSync(_filename);
                delete conn["youtubedl"][m.sender];
                resolve();
            });
        });
    } catch {
        m.Antworten("*Fehlgeschlagen get a Video!*");
    }
};

handler.help = ["ytshorts"].map((v) => v + ' url');
handler.tags = ["herunterladener"];
handler.command = /^(ytshorts|shorts|short)$/i;
handler.register = false;

module.exports = handler;
