let handler = async (m, { conn, usedPrefix, command }) => {
    // List of jokes
    const jokes = [
        "Warum können Geister so schlecht lügen? Weil man durch sie hindurchsehen kann!",
        "Was macht ein Pirat am Computer? Er drückt die Enter-Taste!",
        "Warum können Bienen so gut rechnen? Weil sie immer einen Schwarm an Ideen haben!",
        "Was ist schwarz-weiß und schlägt ständig auf den Tisch? Ein Zebra mit einem Hammer!",
        "Warum können Geister keine Lügen erzählen? Weil man durch sie hindurchsehen kann!",
        "Warum gehen Pilze immer in den Club? Weil sie die Champignons sind!",
        "Was ist orange und läuft durch den Wald? Eine Wanderine!",
        "Warum dürfen Bienen keine Witze erzählen? Weil sie immer stechen!",
        "Was macht ein Keks unter einem Baum? Krümel!",
        "Was ist klein, grün und dreieckig? Ein Frosch im Paprikakostüm!",
        "Warum können Skelette so schlecht lügen? Weil sie keine Eingeweide haben!",
        "Was sagt der eine Hallo zum anderen Hallo? Komm, wir schwimmen ein Stück!",
        "Warum tragen Geheimagenten immer Brillen? Damit sie nicht gesehen werden!",
        "Was ist der Lieblingstanz von Geistern? Der Spuk!",
        "Was macht ein Mathbuch in der pause? Es ruht sich aus!",
        "Was ist rot und sitzt in der Ecke? Eine freche Tomate, die Nachsitzen hat!",
        "Was ist der Unterschied zwischen einem Schneemann und einer Schneefrau? Die Schneebälle!",
        "Was machen zwei wütende Schafe? Sie kriegen sich in die Wolle!",
        "Was ist braun, sehr gefährlich und läuft durch den Wald? Ein Reh mit einer Bazooka!",
        "Warum hat der Mathematiker seinen Taschenrechner beerdigt? Weil er sich verrechnet hat!",
        "Was ist grün und steht vor der Tür? Ein Klopfsalat!",
        "Treffen sich zwei Magnete. Sagt der eine: 'Was soll ich heute bloß anziehen?'",
        "Sagt der Kellner zum Gast: 'Hier ist Ihr Kaffee.' Darauf der Gast: 'Ich habe doch Tee bestellt!' Kellner: 'Oh, entschuldigen Sie, ich dachte, Sie wären Kaffee-Trinker.'" ,
        "Warum nimmt ein Bäcker immer eine Tüte zum Schlafen mit? Um seine Brötchen reinzutun!",
        "Was sagt ein Papagei, wenn er gegen eine Laterne fliegt? 'Autsch.'",
        "Was liegt am Strand und spricht undeutlich? Eine Nuschel!",
        "Warum können Seeräuber keine Kreise berechnen? Weil sie Pi-raten sind!",
        "Was ist ein Känguru, das den ganzen Tag nichts tut? Ein Faultier!",
        "Sitzen zwei Blinde im Kino. Sagt der eine: 'Du, kennst du eigentlich den Film?' – 'Nein, ich hab das Buch nicht gelesen.'",
        "Was ist ein Cowboy ohne Pferd? Ein Sattelschlepper!",
        "Treffen sich zwei Kerzen: 'Gehen wir heute Abend aus?'",
        "Was ist ein Eisbär? Ein eisbärender Bär!",
        "Warum gehen Ameisen nicht in die Kirche? Weil sie Insekten sind!",
        "Was hat grüne Haare und kann durch Wände gehen? Ein Geisterkopfsalat!",
        "Wie nennt man einen Hund ohne Beine? Ist egal, er kommt sowieso nicht, wenn man ihn ruft!",
        "Was sagt ein verzweifelter Pantomime zu seiner Frau? 'Ich weiß nicht, wie ich es dir erklären soll!'"
    ];

    // Choose a random joke
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];

    // Send the joke as a message
    m.reply(randomJoke);
};

handler.help = ['joke', 'witz', 'witze'];
handler.tags = ['spaß'];
handler.command = /^(joke|witz|witze)$/i;

module.exports = handler;
