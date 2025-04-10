const jimp = require('jimp')

const resize = async (image, width, height) => {
    const read = await jimp.read(image);
    const data = await read.resize(width, height).getBufferAsync(jimp.MIME_JPEG);
    return data;
};

const {
    emoji_role,
    sesi,
    playerOnGame,
    playerOnRoom,
    playerExit,
    dataPlayer,
    dataPlayerById,
    getPlayerById,
    getPlayerById2,
    killWerewolf,
    killww,
    dreamySeer,
    sorcerer,
    protectGuardian,
    roleShuffle,
    roleChanger,
    roleAmount,
    roleGenerator,
    addTimer,
    startGame,
    playerHidup,
    playerMati,
    vote,
    voteResult,
    clearAllVote,
    getWinner,
    win,
    pagi,
    malam,
    Fähigkeit,
    voteStart,
    voteDone,
    voting,
    run,
    run_vote,
    run_malam,
    run_pagi
} = require('../lib/werewolf')

let thumb =
    "https://user-images.githubusercontent.com/72728486/235316834-f9f84ba0-8df3-4444-81d8-db5270995e6d.jpg";

let handler = async (m, {
    conn,
    command,
    usedPrefix,
    args
}) => {
    const {
        sender,
        chat
    } = m;
    conn.werewolf = conn.werewolf ? conn.werewolf : {};
    const ww = conn.werewolf ? conn.werewolf : {};
    const data = ww[chat];
    const value = args[0];
    const target = args[1];

    // [ Raum erstellen ]
    if (value === "create") {
        if (chat in ww) return m.reply("Gruppe befindet sich noch in einer Spielsitzung");
        if (playerOnGame(sender, ww) === true)
            return m.reply("Du bist noch in einer Spielsitzung");
        ww[chat] = {
            room: chat,
            owner: sender,
            Status: false,
            iswin: null,
            cooldown: null,
            day: 0,
            time: "nacht",
            player: [],
            dead: [],
            voting: false,
            seer: false,
            guardian: [],
        };
        await m.reply("Raum erfolgreich erstellt, tippe *.ww join* zum Beitreten");

    } else if (value === "join") {
        if (!ww[chat]) return m.reply("Es gibt noch keine Spielsitzung");
        if (ww[chat].Status === true)
            return m.reply("Die Spielsitzung wurde bereits gestartet");
        if (ww[chat].player.length > 16)
            return m.reply("Entschuldigung, die maximale Spieleranzahl wurde erreicht");
        if (playerOnRoom(sender, chat, ww) === true)
            return m.reply("Du bist diesem Raum bereits beigetreten");
        if (playerOnGame(sender, ww) === true)
            return m.reply("Du bist noch in einer anderen Spielsitzung");
        let data = {
            id: sender,
            number: ww[chat].player.length + 1,
            sesi: chat,
            Status: false,
            role: false,
            effect: [],
            vote: 0,
            isdead: false,
            isvote: false,
        };
        ww[chat].player.push(data);
        let player = [];
        let text = `\n*⌂ W E R E W O L F - P L A Y E R*\n\n`;
        for (let i = 0; i < ww[chat].player.length; i++) {
            text += `${ww[chat].player[i].number}) @${ww[chat].player[i].id.replace(
          "@s.whatsapp.net",
          ""
        )}\n`;
            player.push(ww[chat].player[i].id);
        }
        text += "\nDie Mindestanzahl an Spielern ist 5 und maximal 15";
        conn.sendMessage(
            m.chat, {
                text: text.trim(),
                contextInfo: {
                    externalAdReply: {
                        title: "W E R E W O L F",
                        mediaType: 1,
                        renderLargerThumbnail: true,
                        thumbnail: await resize(thumb, 300, 175),
                        sourceUrl: "",
                        mediaUrl: thumb,
                    },
                    mentionedJid: player,
                },
            }, {
                quoted: m
            }
        );

        // [ Spiel Play ]
    } else if (value === "start") {
        if (!ww[chat]) return m.reply("Noch nicht gibt sesi Spiel");
        if (ww[chat].player.length === 0)
            return m.reply("Room noch nicht memiliki player");
        if (ww[chat].player.length < 5)
            return m.reply("Entschuldigung Anzahl player noch nicht memenuhi syarat");
        if (playerOnRoom(sender, chat, ww) === false)
            return m.reply("du noch nicht join in room dies");
        if (ww[chat].cooldown > 0) {
            if (ww[chat].time === "voting") {
                clearAllVote(chat, ww);
                addTimer(chat, ww);
                return await run_vote(conn, chat, ww);
            } else if (ww[chat].time === "malem") {
                clearAllVote(chat, ww);
                addTimer(chat, ww);
                return await run_malam(conn, chat, ww);
            } else if (ww[chat].time === "pagi") {
                clearAllVote(chat, ww);
                addTimer(chat, ww);
                return await run_pagi(conn, chat, ww);
            }
        }
        if (ww[chat].Status === true)
            return m.reply("Sesi Spiel hat distarten");
        if (ww[chat].owner !== sender)
            return m.reply(
                `Nur Spieler das/der/die memerstellen room das/der/die kann mestarten Spiel`);
        let list1 = "";
        let list2 = "";
        let player = [];
        roleGenerator(chat, ww);
        addTimer(chat, ww);
        startGame(chat, ww);
        for (let i = 0; i < ww[chat].player.length; i++) {
            list1 += `(${ww[chat].player[i].number}) @${ww[chat].player[
          i
        ].id.replace("@s.whatsapp.net", "")}\n`;
            player.push(ww[chat].player[i].id);
        }
        for (let i = 0; i < ww[chat].player.length; i++) {
            list2 += `(${ww[chat].player[i].number}) @${ww[chat].player[
          i
        ].id.replace("@s.whatsapp.net", "")} ${
          ww[chat].player[i].role === "werewolf" ||
          ww[chat].player[i].role === "sorcerer"
            ? `[${ww[chat].player[i].role}]`
            : ""
        }\n`;
            player.push(ww[chat].player[i].id);
        }
        for (let i = 0; i < ww[chat].player.length; i++) {
            // [ Werewolf ]
            if (ww[chat].player[i].role === "werewolf") {
                if (ww[chat].player[i].isdead != true) {
                    var text = `hallo ${conn.getName(
              ww[chat].player[i].id
            )}, du hat diauswählen für memerankan *Werewolf* ${emoji_role(
              "werewolf"
            )} auf Spiel mal dies, bitte auswählen falsch satu player das/der/die ingin du essen auf malam Tag dies\n*LIST PLAYER*:\n${list2}\n\nTippe *.wwpc kill nomor* für membunuh player`;                 
                    await conn.sendMessage(ww[chat].player[i].id, {
                        text: text,
                        mentions: player,
                    });
                }

                // [ villager ]
            } else if (ww[chat].player[i].role === "warga") {
                if (ww[chat].player[i].isdead != true) {
                    let text = `*⌂ W E R E W O L F - G A M E*\n\nHallo ${conn.getName(
              ww[chat].player[i].id
            )} Peran du ist *Warga Desa* ${emoji_role(
              "warga"
            )}, tetap waspada, vielleicht *Werewolf* wird memakanmu malam dies, silakan eintreten kerumah jeweils jeweils.\n*LIST PLAYER*:\n${list1}`;
                    await conn.sendMessage(ww[chat].player[i].id, {
                        text: text,
                        mentions: player,
                    });
                }

                // [ Penerawangan ]
            } else if (ww[chat].player[i].role === "seer") {
                if (ww[chat].player[i].isdead != true) {
                    let text = `hallo ${conn.getName(
              ww[chat].player[i].id
            )} du hat terauswählen  für werden *Penerawang* ${emoji_role(
              "seer"
            )}. Mit sihir das/der/die du haben, du kann mengetahui peran Spieler auswählenanmu.\n*LIST PLAYER*:\n${list1}\n\nTippe *.wwpc dreamy nomor* für meansehen role player`;
                 
                    await conn.sendMessage(ww[chat].player[i].id, {
                        text: text,
                        mentions: player,
                    });
                }

                // [ Guardian ]
            } else if (ww[chat].player[i].role === "guardian") {
                if (ww[chat].player[i].isdead != true) {
                    let text = `hallo ${conn.getName(
              ww[chat].player[i].id
            )} du terauswählen für memerankan *Malaikat Beschützer* ${emoji_role(
              "guardian"
            )}, mit Kraft das/der/die du miliki, du kann melindungi die warga, bitte auswählen falsch 1 player das/der/die ingin du lindungi\n*LIST PLAYER*:\n${list1}\n\nTippe *.wwpc deff nomor* für melindungi player`;
                 
                    await conn.sendMessage(ww[chat].player[i].id, {
                        text: text,
                        mentions: player,
                    });
                }

                // [ Sorcerer ]
            } else if (ww[chat].player[i].role === "sorcerer") {
                if (ww[chat].player[i].isdead != true) {
                    let text = `hallo ${conn.getName(
              ww[chat].player[i].id
            )} du terauswählen als Zauberer ${emoji_role(
              "sorcerer"
            )}, mit kekuasaan das/der/die du haben, du kann öffnen identitas die player, silakan auswählen 1 person das/der/die ingin du buka identitasnya\n*LIST PLAYER*:\n${list2}\n\nTippe *.wwpc sorcerer nomor* für meansehen role player`;
                
                    await conn.sendMessage(ww[chat].player[i].id, {
                        text: text,
                        mentions: player,
                    });
                }
            }
        }
        await conn.sendMessage(m.chat, {
            text: "*⌂ W E R E W O L F - G A M E*\n\nGame hat distarten, die player wird memerankan perannya jeweils jeweils, bitte cek chat pribadi für meansehen role ihr. Berhati-hatilah die warga, vielleicht malam dies ist stattdessen letzter untukmu",
            contextInfo: {
                externalAdReply: {
                    title: "W E R E W O L F",
                    mediaType: 1,
                    renderLargerThumbnail: true,
                    thumbnail: await resize(thumb, 300, 175),
                    sourceUrl: "",
                    mediaUrl: thumb,
                },
                mentionedJid: player,
            },
        });
        await run(conn, chat, ww);
    } else if (value === "vote") {
        if (!ww[chat]) return m.reply("Noch nicht gibt sesi Spiel");
        if (ww[chat].Status === false)
            return m.reply("Sesi Spiel noch nicht distarten");
        if (ww[chat].time !== "voting")
            return m.reply("Sesi voting noch nicht distarten");
        if (playerOnRoom(sender, chat, ww) === false)
            return m.reply("du nicht player");
        if (dataPlayer(sender, ww).isdead === true)
            return m.reply("du bereits mati");
        if (!target || target.length < 1)
            return m.reply("Anmeldenan nomor player");
        if (isNaN(target)) return m.reply("Benutze nur nomor");
        if (dataPlayer(sender, ww).isvote === true)
            return m.reply("du bereits durchführen voting");
        let b = getPlayerById(chat, sender, parseInt(target), ww);
        if (b.db.isdead === true)
            return m.reply(`Player ${target} bereits mati.`);
        if (ww[chat].player.length < parseInt(target))
            return m.reply("Invalid");
        if (getPlayerById(chat, sender, parseInt(target), ww) === false)
            return m.reply("Player nicht registriert!");
        vote(chat, parseInt(target), sender, ww);
        conn.sendMessage(m.chat, {
            react: {
                text: '✅',
                key: m.key,
            }
        })
    } else if (value == "exit") {
        if (!ww[chat]) return m.reply("Nein gibt sesi Spiel");
        if (playerOnRoom(sender, chat, ww) === false)
            return m.reply("du nicht in sesi Spiel");
        if (ww[chat].Status === true)
            return m.reply("Spiel bereits distarten, du nicht kann ausgehen");
        m.reply(`@${sender.split("@")[0]} Beenden von Spiel`, {
            withTag: true,
        });
        playerExit(chat, sender, ww);
    } else if (value === "delete") {
        if (!ww[chat]) return m.reply("Nein gibt sesi Spiel");
        if (ww[chat].owner !== sender)
            return m.reply(
                `Nur @${
            ww[chat].owner.split("@")[0]
          } das/der/die kann menglöschen sesi Spiel dies`
            );
        m.reply("Sesi Spiel erfolgreich dilöschen").then(() => {
            delete ww[chat];
        });
    } else if (value === "player") {
        if (!ww[chat]) return m.reply("Nein gibt sesi Spiel");
        if (playerOnRoom(sender, chat, ww) === false)
            return m.reply("du nicht in sesi Spiel");
        if (ww[chat].player.length === 0)
            return m.reply("Sesi Spiel noch nicht memiliki player");
        let player = [];
        let text = "\n*⌂ W E R E W O L F - G A M E*\n\nLIST PLAYER:\n";
        for (let i = 0; i < ww[chat].player.length; i++) {
            text += `(${ww[chat].player[i].number}) @${ww[chat].player[i].id.replace(
          "@s.whatsapp.net",
          ""
        )} ${
          ww[chat].player[i].isdead === true
            ? `☠️ ${ww[chat].player[i].role}`
            : ""
        }\n`;
            player.push(ww[chat].player[i].id);
        }
        conn.sendMessage(
            m.chat, {
                text: text,
                contextInfo: {
                    externalAdReply: {
                        title: "W E R E W O L F",
                        mediaType: 1,
                        renderLargerThumbnail: true,
                        thumbnail: await resize(thumb, 300, 175),
                        sourceUrl: "",
                        mediaUrl: thumb,
                    },
                    mentionedJid: player,
                },
            }, {
                quoted: m
            }
        );
    } else {
        let text = `\n*⌂ W E R E W O L F - G A M E*\n\nEin soziales Spiel, das in mehreren Runden gespielt wird. Die Spieler müssen einen Verbrecher finden, der sich im Spiel versteckt. Jeder Spieler erhält eine Rolle, Zeit und seine eigenen Fähigkeiten, um dieses Spiel zu spielen.\n\n*⌂ B E F E H L E*\n`;
        text += ` • ww create\n`;
        text += ` • ww join\n`;
        text += ` • ww start\n`;
        text += ` • ww exit\n`;
        text += ` • ww delete\n`;
        text += ` • ww player\n`;
        text += `\nDieses Spiel kann von 5 bis 15 Personen gespielt werden.`;
        conn.sendMessage(
            m.chat, {
                text: text.trim(),
                contextInfo: {
                    externalAdReply: {
                        title: "W E R E W O L F",
                        mediaType: 1,
                        renderLargerThumbnail: true,
                        thumbnail: await resize(thumb, 300, 175),
                        sourceUrl: "",
                        mediaUrl: thumb,
                    },
                },
            }, {
                quoted: m
            }
        );
    }
}
handler.help = ['werewolf'];
handler.tags = ['spiel'];
handler.command = ['ww','werewolf'];
handler.group = true;
module.exports = handler
