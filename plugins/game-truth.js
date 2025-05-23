let handler = async (m, { conn }) => {
    const truthImage = 'https://i.ibb.co/305yt26/bf84f20635dedd5dde31e7e5b6983ae9.jpg';
    const truths = [
        "Was ist das peinlichste, das dir je passiert ist?",
        "Hast du jemals jemanden betrogen?",
        "Was ist dein größtes Geheimnis?",
        "Was ist etwas, das du nie öffentlich zugeben würdest?",
        "Was ist deine größte Angst?",
        "Hast du jemals etwas gestohlen?",
        "Erzähl uns von deinem größten Fehler im Leben.",
        "Was würdest du an deinem Aussehen ändern, wenn du könntest?",
        "Was ist die größte Lüge, die du je erzählt hast?",
        "Hast du jemals jemanden hintergangen?",
        "Erzähle von einem peinlichen Vorfall in der Schule oder Arbeit.",
        "Was ist das Verrückteste, das du je getan hast?",
        "Welchen Traum hast du, den niemand kennt?",
        "Was ist das schlimmste Gerücht, das du über dich gehört hast?",
        "Hast du jemals mit jemandem geflirtet, nur um etwas zu erreichen?",
        "Was ist etwas, das du nie zu deinen Eltern sagen würdest?",
        "Was war das unangenehmste Kompliment, das du je erhalten hast?",
        "Hast du jemals jemanden ignoriert, den du mochtest?",
        "Was würdest du tun, wenn du für einen Tag unsichtbar wärst?"
    ];

    const randomTruth = truths[Math.floor(Math.random() * truths.length)];
    const truthText = `*🎯 WAHRHEIT – TRAUST DU DICH?*\n\n"${randomTruth}"\n\n🔹 *Benutze:* \`.truth\` für eine neue Herausforderung.`;

    await conn.sendFile(m.chat, truthImage, 'truth.jpg', truthText, m);
};

handler.help = ['truth', 'wahrheit', 'ehrlich'];
handler.tags = ['spaß'];
handler.command = /^(truth|wahrheit|ehrlich)$/i;
handler.limit = true;

module.exports = handler;
