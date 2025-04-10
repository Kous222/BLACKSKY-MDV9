const handler = async (m, { conn }) => {
    conn.koboy = conn.koboy || {};
    const user = global.db.data.users[m.sender];

    const cooldownPeriod = 5 * 60 * 60 * 1000; // 5 jam in miliSekunden
    const lastPlayed = user.lastKoboy || 0;
    const now = Date.now();

    if (now - lastPlayed < cooldownPeriod) {
        const remainingTime = cooldownPeriod - (now - lastPlayed);
        const hours = Math.floor(remainingTime / (60 * 60 * 1000));
        const minutes = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));
        const seconds = Math.floor((remainingTime % (60 * 1000)) / 1000);
        return m.reply(`Sie bereits menangkap penjahat. warten ${hours} jam ${minutes} menit ${seconds} Sekunden wieder.`);
    }

    if (conn.koboy[m.chat]) return m.reply('du gerade spielen spiel Koboy!');

    let playerPosition, criminalPosition;
    do {
        playerPosition = Math.floor(Math.random() * 6);
        criminalPosition = Math.floor(Math.random() * 6);
    } while (playerPosition === criminalPosition);

    let gameState = `🤠 Koboy Mengejar Penjahat 🏃‍♂️

Wilayah ich:
${"・".repeat(playerPosition)}🤠${"・".repeat(5 - playerPosition)}
Wilayah penjahat:
${"・".repeat(criminalPosition)}🏃‍♂️${"・".repeat(5 - criminalPosition)}
Tippe *'kanan'* für bergerak zu kanan.
Tippe *'kiri'* für bergerak zu kiri.`;

    let { key } = await conn.reply(m.chat, gameState, m);

    conn.koboy[m.chat] = {
        playerPosition,
        criminalPosition,
        key,
        oldkey: key,
        earnedExp: 10000,
        earnedMoney: 1000000,
        sender: m.sender,
        moveCount: 0,
        maxMoves: 5,
        roomId: m.chat,
        timeout: setTimeout(() => {
            if (conn.koboy && conn.koboy[m.chat] && conn.koboy[m.chat].roomId === m.chat) {
                conn.sendMessage(m.chat, { delete: key });
                delete conn.koboy[m.chat];
            }
        }, 60000 * 2),
    };

    user.lastKoboy = now; // save zeit letzter mal Spiel distarten
};

handler.before = async (m, { conn }) => {
    conn.koboy = conn.koboy || {};
    let user = global.db.data.users[m.sender];
    if (!conn.koboy[m.chat] || conn.koboy[m.chat].roomId !== m.chat || !['kiri', 'kanan'].includes(m.text.toLowerCase())) return;

    let gameData = conn.koboy[m.chat];
    let { playerPosition, criminalPosition, key, oldkey, moveCount, maxMoves, timeout, earnedExp, earnedMoney, sender } = gameData;

    if (m.quoted || m.quoted.id == key) {
        if (m.text.toLowerCase() === 'kiri') {
            if (playerPosition > 0) {
                playerPosition--;
                moveCount++;
            } else {
                return m.reply('Sie bereits befindet sich in batas kiri!');
            }
        } else if (m.text.toLowerCase() === 'kanan') {
            if (playerPosition < 5) {
                playerPosition++;
                moveCount++;
            } else {
                return m.reply('Sie bereits befindet sich in batas kanan!');
            }
        }

        if (playerPosition === criminalPosition) {
            conn.sendMessage(m.chat, { delete: oldkey });
            let earnedMoneys = randomMoney(earnedMoney, 1);
            let earnedExps = randomMoney(earnedExp, 1);
            user.Münzen = (user.Münzen || 0) + earnedMoneys;
            user.exp = (user.exp || 0) + earnedExps;
            delete conn.koboy[m.chat];
            return conn.reply(m.chat, `🎉 Herzlichen Glückwunsch! @${sender.split('@')[0]} erfolgreich mengejar penjahat! 🎉\n\n💰 erhalten Geld senilai *${formatRupiah(earnedMoneys)}*\n🔧 Dapatkan *${earnedExps}* EXP\n`, m, { mentions: [sender] });
        } else if (moveCount === maxMoves) {
            conn.sendMessage(m.chat, { delete: oldkey });
            delete conn.koboy[m.chat];
            return conn.reply(m.chat, `😞 du verlieren! @${sender.split('@')[0]} bereits mencapai batas maksimum gerakan.`, m, { mentions: [sender] });
        }

        let gameState = `🤠 Koboy Mengejar Penjahat 🏃‍♂️

Wilayah ich:
${"・".repeat(playerPosition)}🤠${"・".repeat(5 - playerPosition)}
Wilayah penjahat:
${"・".repeat(criminalPosition)}🏃‍♂️${"・".repeat(5 - criminalPosition)}
Tippe *'kanan'* für bergerak zu kanan.
Tippe *'kiri'* für bergerak zu kiri.`;

        let msg = await conn.relayMessage(m.chat, {
            protocolMessage: {
                key: key,
                type: 14,
                bearbeitenedMessage: {
                    conversation: gameState
                }
            }
        }, {});

        let additionalData = {
            ...gameData,
            playerPosition,
            moveCount,
            key: { id: msg }
        };

        conn.koboy[m.chat] = Object.assign({}, conn.koboy[m.chat], additionalData);
    }
};

handler.help = ['koboy'];
handler.tags = ['rpg'];
handler.command = /^(koboy)$/i;
handler.group = true;
handler.rpg = true;

module.exports = handler;

function randomMoney(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatRupiah(number) {
    const formatter = new Intl.NumberFormat('id-id', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    });

    return formatter.format(number);
}