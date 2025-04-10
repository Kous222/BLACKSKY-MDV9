let handler = async (m, { conn, usedPrefix, command }) => {
    // List of dad jokes
    const dadJokes = [
        "Warum können Bienen so gut rechnen? Weil sie immer einen Summenplan haben.",
        "Warum gehen Pilze immer zu Partys? Weil sie die Champignons sind.",
        "Warum können Geister so schlecht lügen? Weil man durch sie hindurchsehen kann.",
        "Was macht ein Pirat am Computer? Er drückt die Enter-Taste.",
        "Ich wollte einen Witz über ein Fahrrad erzählen, aber er war zu schräg.",
        "Warum können Bienen so gut schwimmen? Sie haben den besten 'Flügel' der Welt.",
        "Was macht ein Mathematiker, wenn er einen Bleistift spitzt? Er spitzt seine Argumente.",
        "Was ist orange und läuft durch den Wald? Eine Wanderine.",
        "Warum schlich der Pilz immer durch den Wald? Weil er ein Champignon war!",
        "Was ist ein Cowboy ohne Pferd? Ein Hühnerfarmer.",
        "Was ist weiß und stört beim Reden? Ein Buchstabensalat.",
        "Warum können Geister keine Lügen erzählen? Weil man durch sie hindurchsehen kann.",
        "Warum klettern Geister immer auf Bäume? Weil sie ein bisschen in den Ästen hängen wollen.",
        "Was macht ein Keks unter einem Baum? Krümel!",
        "Warum können Bäume so gut rechnen? Weil sie immer so viele Äste haben.",
        "Warum können Golfer so gut sprechen? Weil sie immer einen Abschlag haben.",
        "Was macht ein Fisch, wenn er seine Mutter sieht? Er winkt.",
        "Warum können Katzen so gut singen? Weil sie viel 'Miau-sik' haben.",
        "Wie nennt man einen Boomerang, der nicht zurückkommt? Stock!",
        "Was macht ein Clown im Büro? Faxen!",
        "Wo wohnen Katzen? Im Miezhaus!",
        "Warum können Skelette keine Lügen erzählen? Sie sind zu durchschaubar!",
        "Was sagt ein Gen, wenn es stolpert? 'Ich glaube, ich habe mich ver-DNS!'",
        "Warum sind Fische so schlecht im Basketball? Sie haben Angst vorm Dribbling!",
        "Was steht auf dem Grabstein eines Mathematikers? 'Damit hat er nicht gerechnet.'",
        "Was sagt ein Deutscher, wenn er einen Raum betritt? 'Da bin ich wieder!'",
        "Wie nennt man ein Rudel aggressiver Wölfe? Wolfgang!",
        "Warum gibt der Wendler ein Konzert im Wald? Damit ihm keiner zuhört!",
        "Was macht ein Tischler, wenn er in ein Restaurant geht? Er schaut, ob der Tisch auch gerade steht!",
        "Was bestellt ein Maulwurf im Restaurant? Ein Drei-Gänge-Menü!",
        "Wie nennt man eine Fee, die an einer Tankstelle arbeitet? Zapfee!",
        "Wenn ich könnte, würde ich ja ein Wortspiel über Tischler machen, aber es würde wahrscheinlich nicht funktionieren!",
        "Warum können Vampir-Freundinnen so nervig sein? Sie saugen einem die Lebensenergie aus!",
        "Was ist der Lieblingskuchen eines Elektrikers? Streuselkuchen!",
        "Was sagt ein Informatiker, wenn er ins Kino geht? Hoffentlich ist der Film nicht komprimiert!",
        "Wie nennt man jemanden ohne Körper und ohne Nase? Niemand weiß es!",
        "Warum nimmt ein Vampir Kopfschmerztabletten? Wegen Migräne-Durst!",
        "Warum kann ein Kaktus nicht lügen? Weil er immer die Stachel-Wahrheit sagt!"
    ];

    // Pick a random dad joke
    const randomDadJoke = dadJokes[Math.floor(Math.random() * dadJokes.length)];

    // Send the dad joke
    m.reply(randomDadJoke);
};

handler.help = ['dadjoke', 'vaterwitz', 'papawitze'];
handler.tags = ['spaß'];
handler.command = /^(dadjoke|vaterwitz|papawitze)$/i;

module.exports = handler;
