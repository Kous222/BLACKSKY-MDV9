// const owner1 = '6281289694906@s.whatsapp.net';
// const owner2 = '@s.whatsapp.net';
const owner3 = '62895628117900@s.whatsapp.net';
// const owner4 = '@s.whatsapp.net';

// Die obigen Variablen enthalten Nummern der Besitzer für Begrüßungen, ändere sie zu deinen Nummern!


let handler = m => m
handler.before = async function(m, { conn, participants, isPrems, isAdmin }) {
  if (!conn.danil_join) {
    conn.danil_join = {
      join: false,
      time: 0,
    };
  }
  const currentTime = Math.floor(Date.now() / 1000);

  if (!m.isGroup || conn.danil_join.time > currentTime) {
    // console.log("cooldown"); //cek in console server falls muncul dies berarti noch cooldown
    return;
  }
  let messageText = "";
  let mentionedUsers = participants.map((u) => u.id).filter((v) => v !== conn.user.jid);
  switch (m.sender) {
    // case `${owner1}`:
    //   messageText = "📣 *Achtung alle* 📣, Besitzer ist angekommen";
    //   break;
    // case `${owner2}`:
    //   messageText = "📣 *Achtung alle* 📣, Besitzer ist angekommen";
    //   break;
    case `${owner3}`:
      messageText = "📣 *Achtung alle* 📣, Admin betabotz ist angekommen, zeigt euren Respekt alle!!!";
      break;
    // case "6289660386999@s.whatsapp.net":
    //   messageText = "📣 *Achtung alle*, Besitzer ist angekommen";
    //   break;  
  }
  // Du kannst die Kommentarzeichen (//) entfernen, wenn du diese verwenden möchtest
  if (messageText) {
    await conn.sendMessage(
      m.chat,
      {
        text: messageText,
      },
      {
        quoted: m,
        mentions: mentionedUsers,
      }
    );
    conn.danil_join = {
      join: true,
      time: currentTime + 1000, //
    };
  } 
}

module.exports = handler

//base code by adrian
//bearbeiten by dana