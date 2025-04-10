let handler = async (m, { conn, participants }) => {
    const introMessage = `╭─── *「 Intro-Karte 」*
│ Willkommen im Gruppen-Intro!
│ Bitte teile uns einige Informationen über dich.
│
│ *Name*: (Bitte deinen Namen angeben)
│ *Geschlecht*: (Männlich / Weiblich / Andere)
│ *Alter*: (Gib dein Alter ein)
│ *Hobby*: (Was sind deine Hobbys?)
│ *Klasse/Beruf*: (In welcher Klasse bist du? Oder was arbeitest du?)
│ *Herkunft*: (Woher kommst du?)
│ *Religion*: (Bitte gib deine Religion an)
│ *Status*: (Bist du Single, in einer Beziehung, etc.?)
╰────────────────────`

    const collectUserInfo = async (user) => {
        let userInfo = {};
        
        // Prompt user for information
        await conn.reply(user, "Bitte teile uns deinen Namen mit.", m);
        userInfo.name = await getUserResponse(user);  // Function to get user response

        await conn.reply(user, "Bitte teile uns dein Geschlecht mit (Männlich / Weiblich / Andere).", m);
        userInfo.gender = await getUserResponse(user);

        await conn.reply(user, "Wie alt bist du?", m);
        userInfo.age = await getUserResponse(user);

        await conn.reply(user, "Was sind deine Hobbys?", m);
        userInfo.hobby = await getUserResponse(user);

        await conn.reply(user, "In welcher Klasse bist du? Oder was arbeitest du?", m);
        userInfo.klasse = await getUserResponse(user);

        await conn.reply(user, "Woher kommst du?", m);
        userInfo.origin = await getUserResponse(user);

        await conn.reply(user, "Welche Religion hast du?", m);
        userInfo.religion = await getUserResponse(user);

        await conn.reply(user, "Was ist dein Status (z.B. Single, in einer Beziehung)?", m);
        userInfo.Status = await getUserResponse(user);

        return userInfo;
    }

    // Function to collect user responses
    const getUserResponse = (user) => {
        return new Promise((resolve) => {
            conn.once('message', (message) => {
                if (message.sender === user) {
                    resolve(message.text);
                }
            });
        });
    }

    // Handle new users joining the group
    for (let user of participants) {
        let userInfo = await collectUserInfo(user.id);
        let userIntro = `╭─── *「 Intro-Karte 」*
│ *Name*: ${userInfo.name}
│ *Geschlecht*: ${userInfo.gender}
│ *Alter*: ${userInfo.age}
│ *Hobby*: ${userInfo.hobby}
│ *Klasse/Beruf*: ${userInfo.klasse}
│ *Herkunft*: ${userInfo.origin}
│ *Religion*: ${userInfo.religion}
│ *Status*: ${userInfo.Status}
╰────────────────────`;

        conn.sendMessage(m.chat, { text: userIntro, mentions: [user.id] }, { quoted: m });
    }
}

handler.help = ['intro', 'vorstellung'];
handler.tags = ['gruppe'];
handler.command = /^(intro|vorstellung)$/i;

module.exports = handler;
