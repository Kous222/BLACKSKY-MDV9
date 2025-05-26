
const PhoneNumber = require('awesome-phonenumber');

let handler = async (m, { conn, text }) => {
    function getRandomElement(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    const fitnahMessages = [
        "😱 *Breaking News!* @user wurde gestern gesichtet, wie er/sie mit dem Hamster um die Wette gelaufen ist!",
        "😂 @user hat wohl letzte Nacht das WLAN der ganzen Nachbarschaft leer gesaugt – krasser Move!",
        "🤭 Oha, @user wurde dabei erwischt, wie er/sie heimlich TikTok-Tänze vor dem Spiegel geübt hat!",
        "😴 @user liebt es, während des Unterrichts zu schlafen und dabei leise vor sich hin zu schnarchen. Multitasking-Profi!",
        "🍜 @user isst am liebsten in der Kantine... und vergisst dann, die Rechnung zu bezahlen. Klassiker!",
        "🎤 Gerüchten zufolge hat @user beim Duschen das ganze Haus mit einer privaten Karaoke-Show unterhalten. Standing Ovations von der Nachbarschaft!",
        "📷 Wow, @user lädt täglich Essensfotos hoch – aber das Essen gehört meistens jemand anderem. #FoodieLife",
        "💡 Wusstet ihr schon? @user hat einen Fake-Account erstellt, um den Crush heimlich zu stalken... #NinjaMoves",
        "🚗 Haha, @user hat mit einem Spielzeugauto angegeben, als wäre es ein Ferrari. Täuschend echt!",
        "📚 @user wurde letzte Woche dabei erwischt, wie er/sie den Unterricht geschwänzt hat, um Memes zu sammeln!",
        "💬 @user hat einen Chat-Draft mit 300 Nachrichten… und keiner davon wurde jemals gesendet. Schreibfaul deluxe!",
        "💸 Achtung, Leute! @user hat es geschafft, in der Kantine alle Snacks auf einmal zu klauen – und dann drei Tage später zu bezahlen!",
        "😎 Gerüchte sagen, @user hat beim Karaoke versehentlich ein Kinderlied gesungen. Aber hey, Stimmung war top!",
        "🧼 @user geht angeblich nur einmal im Jahr duschen – und das ist heute. Glück gehabt, Leute!",
        "🕺 Gerüchten zufolge ist @user der geheime Star bei TikTok. Man munkelt, die Moves sind legendär!",
        "🎉 @user feiert sogar beim Verlieren beim Spiel. Optimismus-Level: 1000!"
    ];

    if (!m.isGroup) return conn.reply(m.chat, '❌ Dieser Befehl funktioniert nur in Gruppen!', m);

    const participants = (await conn.groupMetadata(m.chat)).participants;

    let randomUser = null;

    if (!text) {
        randomUser = getRandomElement(participants).id;
    } else {
        const mentionedUser = text.match(/@([0-9]{7,16})/);
        if (mentionedUser) {
            const mentionedUserId = mentionedUser[1];
            randomUser = participants.find(user => user.id.includes(mentionedUserId))?.id;
        }
    }

    if (!randomUser) return conn.reply(m.chat, '❗ Der erwähnte Nutzer wurde nicht gefunden!', m);

    const selectedMessage = getRandomElement(fitnahMessages).replace(/@user/g, `@${randomUser.split('@')[0]}`);

    conn.reply(m.chat, `🎉 *Fun Gerücht!*\n\n${selectedMessage}`, m, { mentions: [randomUser] });
};

handler.help = ['fitnah'];
handler.tags = ['fun'];
handler.command = /^fitnah$/i;
handler.group = true;

module.exports = handler;
