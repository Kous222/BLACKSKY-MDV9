let handler = async (m, { conn }) => {
    const dareImage = 'https://i.ibb.co/305yt26/bf84f20635dedd5dde31e7e5b6983ae9.jpg';
    const dares = [
        "Iss eine rohe Zwiebel.",
        "Tanze 1 Minute lang ohne Musik.",
        "Rufe jemanden an und singe ein Lied.",
        "Trage deine Kleidung verkehrt herum für den Rest des Tages.",
        "Erzähle einen peinlichen Moment aus deinem Leben.",
        "Lies einen lustigen Witz laut vor.",
        "Mach 20 Liegestütze.",
        "Zieh dir ein lustiges Kostüm an und mach ein Foto.",
        "Poste ein Bild von deinem Schreibtisch oder Arbeitsplatz.",
        "Zeig deinen peinlichsten Tanzmove für 30 Sekunden.",
        "Mach ein Selfie mit einer Grimasse.",
        "Iss ein Löffel Senf.",
        "Schreibe einen lustigen Spruch und sende ihn in der Gruppe.",
        "Lass dir die Haare von einem Familienmitglied stylen.",
        "Gib einem Freund einen originellen Spitznamen.",
        "Mache ein Lied aus deinem Namen und singe es laut.",
        "Erzähle einen Witz, der niemanden lachen lässt, und tu so, als ob du der einzige bist, der ihn lustig findet.",
        "Lies einen kurzen Text rückwärts vor.",
        "Schick einer Person in der Gruppe eine Nachricht, die nur aus Emojis besteht.",
        "Hüpfe 20 Mal auf einem Bein."
    ];

    const randomDare = dares[Math.floor(Math.random() * dares.length)];
    const dareText = `*🎯 MUTPROBE – TRAUST DU DICH?*\n\n"${randomDare}"\n\n🔹 *Benutze:* \`.dare\` für eine neue Herausforderung.`;

    await conn.sendFile(m.chat, dareImage, 'mutprobe.jpg', dareText, m);
};

handler.help = ['dare', 'mutprobe', 'wagnis', 'herausforderung'];
handler.tags = ['spaß'];
handler.command = /^(dare|herausforderung|mutprobe|wagnis)$/i;
handler.limit = true;

module.exports = handler;
