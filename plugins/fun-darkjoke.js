let handler = async (m, { conn, usedPrefix, command }) => {
    // List of dark jokes
    const darkJokes = [
        "Ich habe gestern einen Horrorfilm gesehen. Es war über einen Typen, der versuchte, aus einer SMS-Konversation zu entkommen.",
        "Warum graben Särge immer so schnell? Weil sie zu schnell ans Ziel kommen!",
        "Ich wollte ein Buch über Todesursachen schreiben, aber ich konnte nicht entscheiden, wie es enden sollte.",
        "Was ist der Lieblingsgeruch von Zombies? Die frische Luft eines frisch gegrabenen Grabes.",
        "Warum wird das Leben manchmal so dunkel? Vielleicht, weil die Dunkelheit der einzige Ort ist, wo man Ruhe finden kann.",
        "Was passiert, wenn man in einen dunklen Raum geht? Der Raum erhellt sich nicht, aber du wirst es sicher nie wieder sehen.",
        "Ich hab gestern meine Zukunft in einer Kristallkugel gesehen... und sie sah ziemlich düster aus.",
        "Es gibt zwei Dinge, die wir nie aus den Augen verlieren sollten: Das Leben und die Rechnung für die Beerdigung.",
        "Ich dachte immer, dass der Tod das Ende von allem ist, aber dann habe ich die Steuererklärung gemacht.",
        "Warum war der Friedhof der beliebteste Ort in der Stadt? Es war der einzige Ort, an dem niemand mit einem Handy ankam.",
        "Worüber nachzudenken macht den Tod noch schlimmer? Über die Rechnungen, die man hinterlässt.",
        "Die einzige Konstante im Leben ist der Tod… und die Steuern.",
        "Ich wollte mich über die ewige Dunkelheit lustig machen… aber es schien zu ernst zu sein.",
        "Was sagt ein Kannibale nach einem veganen Essen? Das war eine geschmacklose Erfahrung.",
        "Warum kann der Henker keinen Witz erzählen? Sein Humor ist immer zum Aufhängen.",
        "Was ist der Unterschied zwischen einer Katze und einem Komma? Eine Katze hat Krallen an den Pfötchen, ein Komma ist ein Pünktchen mit Schwänzchen.",
        "Mein Lieblingsfilm über Friedhöfe? 'Ruhe in Frieden – Ein Spaziergang zwischen den Grabsteinen'. Ist halt ein echter Grabenkracher.",
        "Ich würde gerne einen Witz über Chemie machen, aber ich erwarte keine Reaktion.",
        "Was ist der Unterschied zwischen einem Chirurgen und einem Serienmörder? Die Präzision.",
        "Haben Sie schon mal von dem Kannibalenrestaurant gehört? Da werden die Kunden immer ganz besonders eingeladen.",
        "Was ist das Schlimmste am Vegetarismus? Die ganzen verpassten Steaks.",
        "Das Leben ist wie ein Tunnel. Man sieht kein Licht am Ende, aber wenn man eines sieht, ist es wahrscheinlich ein Zug.",
        "Ein Skelett geht in eine Bar und bestellt: 'Ein Bier und einen Wischeimer, bitte.'",
        "Was ist der Unterschied zwischen Tauben und Statuen? Bei Statuen kacken die Tauben drauf, bei Tauben nicht die Statuen.",
        "Warum ist der Friedhof ein so beliebter Ort? Da sind die Leute ruhig und entspannt.",
        "Was ist schwarz-weiß und rollt? Ein Pinguin mit Rollschuhen und eine Krähe mit einem halben Flügel.",
        "Hast du schon den neuen Bestattungstrend gehört? Sie nennen es 'Grabhopping' – man bleibt nie lange an einem Ort.",
        "Was ist der Unterschied zwischen einer Leiche und einem Trampolin? Man zieht seine Schuhe aus, bevor man auf ein Trampolin springt.",
        "Leben ist wie Kaffee trinken. Am Anfang ist es zu heiß, am Ende ist es zu kalt, und man hat nie Zeit, es zu genießen.",
        "Wenn Vegetarier Menschen essen, sind sie dann immer noch Vegetarier?",
        "Der letzte Wunsch eines Todeskandidaten? Ein Pfefferminzbonbon, damit er mit frischem Atem in die Hölle kommt."
    ];

    // Pick a random dark joke
    const randomDarkJoke = darkJokes[Math.floor(Math.random() * darkJokes.length)];

    // Send the dark joke
    m.reply(randomDarkJoke);
};

handler.help = ['darkjoke', 'schwarzerhumor', 'düsterwitz'];
handler.tags = ['spaß'];
handler.command = /^(darkjoke|schwarzerhumor|düsterwitz)$/i;

module.exports = handler;
