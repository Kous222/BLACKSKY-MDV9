let handler = async (m, { conn, usedPrefix, command }) => {
    // Liste der Yo Mama Witze
    const yomamaJokes = [
        "Deine Mutter ist so langsam, sie hat zwei Stunden gebraucht, um *60 Minuten* zu schauen.",
        "Deine Mutter ist so klein, sie kann auf einem Dorito Gleitschirmfliegen machen.",
        "Deine Mutter ist so dick, wenn sie einen gelben Mantel trägt, ruft jeder 'Taxi!'",
        "Deine Mutter ist so alt, ihr Geburtszertifikat sagt 'Abgelaufen'.",
        "Deine Mutter ist so dumm, sie starrte 12 Stunden lang auf eine Tasse Orangensaft, weil darauf 'Konzentrieren' stand.",
        "Deine Mutter ist so arm, sie ging zu McDonald's und legte einen Milchshake auf Ratenzahlung.",
        "Deine Mutter ist so hässlich, selbst Scooby-Doo will dieses Geheimnis nicht lösen.",
        "Deine Mutter ist so faul, sie hat ihre Nase aus dem Fenster gestreckt und ließ den Wind sie blasen.",
        "Deine Mutter ist so tollpatschig, sie ist über eine drahtlose Internetverbindung gestolpert.",
        "Deine Mutter ist so behaart, der Yeti hat ein Bild von ihr gemacht.",
        "Deine Mutter ist so dick, wenn sie einen gelben Mantel trägt, ruft jeder 'Bleib auf dem Bürgersteig!'",
        "Deine Mutter ist so dick, wenn sie ein rotes Kleid trägt, ruft jeder 'Ketchup!'",
        "Deine Mutter ist so klein, sie ging zum Weihnachtsmann und er sagte ihr, sie solle zurück an die Arbeit gehen.",
        "Deine Mutter ist so alt, sie ging in ein Antiquitätengeschäft und sie behielten sie.",
        "Deine Mutter ist so dick, wenn sie auf die Waage geht, sagt sie 'Einzeln bitte.'",
        "Deine Mutter ist so dumm, sie versuchte, den Berg Tau zu erklimmen.",
        "Deine Mutter ist so arm, sie kann nicht einmal aufpassen.",
        "Deine Mutter ist so groß, wenn sie zum Strand geht, kommt die Flut.",
        "Deine Mutter ist so dick, ihr Bauchnabel kommt 15 Minuten vor ihr nach Hause.",
        "Deine Mutter ist so faul, sie versuchte ein Nickerchen zu machen und verpasste es.",
        "Deine Mutter ist so alt, als sie in der Schule war, hat sie Geschichte persönlich erlebt.",
        "Deine Mutter ist so groß, sie benutzt einen Bumerang, um sich den Rücken zu waschen.",
        "Deine Mutter ist so unordentlich, McDonald's hat ihre Bilder in der Küche, um Kinder vom Essen abzuhalten.",
        "Deine Mutter ist so hässlich, als sie in die Bank ging, schalteten sie die Überwachungskameras aus.",
        "Deine Mutter ist so dumm, sie hat versucht, einen Donut zu ertränken.",
        "Deine Mutter ist so dick, sie hat ihr eigenes Postleitzahlengebiet.",
        "Deine Mutter ist so hässlich, wenn sie in den Spiegel schaut, dreht sich ihr Spiegelbild weg.",
        "Deine Mutter ist so alt, sie hat mit Dinosauriern gespielt, als sie noch klein war.",
        "Deine Mutter ist so tollpatschig, sie ist über WLAN gestolpert.",
        "Deine Mutter ist so dumm, sie denkt, dass Taco Bell eine mexikanische Telefongesellschaft ist.",
        "Deine Mutter ist so hässlich, dass nicht einmal Google sie finden kann.",
        "Deine Mutter ist so alt, ihr Personalausweis ist in römischen Ziffern.",
        "Deine Mutter ist so dumm, sie ging zum Augenarzt, um ihre iPhone-Sicht zu verbessern.",
        "Deine Mutter ist so arm, sie kann keinen Witz erzählen.",
        "Deine Mutter ist so dick, wenn sie in einem Harry-Potter-Film mitspielen würde, wäre sie der Hogwarts-Express.",
        "Deine Mutter ist so alt, sie hat Jesus noch beim Fingermalenkurs kennengelernt.",
        "Deine Mutter ist so dumm, sie ist in der Apotheke angestanden, um ein iPhone zu kaufen.",
        "Deine Mutter ist so hässlich, wenn sie auf einer Demonstration ist, demonstrieren alle gegen sie.",
        "Deine Mutter ist so dick, sie hat ihr eigenes Kraftfeld.",
        "Deine Mutter hat so viele Falten, dass ihr T-Shirt mehr Nähte hat als ein Baseball."
    ];

    // Wähle einen zufälligen Yo Mama Witz aus
    const randomYoMamaJoke = yomamaJokes[Math.floor(Math.random() * yomamaJokes.length)];

    // Sende den Yo Mama Witz
    m.reply(randomYoMamaJoke);
};

handler.help = ['yomama', 'deinemutter', 'yomama'];
handler.tags = ['spaß', 'fun'];
handler.command = /^(yomama|deinemutter|mama)$/i;

module.exports = handler;
