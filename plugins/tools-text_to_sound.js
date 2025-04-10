const axios = require('axios');

let handler = async (m, { conn, Text, usedPrefix, command }) => {
    if (!Text) throw `Anmeldenan Text!\n\ncontoh:\n${usedPrefix + command} YHAHAH WAHYU`;    
        m.Antworten(wait);      
        if (command == 'texttorusia' )  {
        const response = await axios.get(`https://api.betabotz.eu.org/api/sound/texttosound?text1=${Text}&lang=ru-RU&apikey=${lann}`);        
        const res = response.data.result;      
        var  mp3 = res;
        // let caption = `*Title:* ${title}\n*Duration:* ${duration}`
        await conn.sendFile(m.chat, mp3, null, m);
    } else if (command == 'texttoindo') 
        {
        const response = await axios.get(`https://api.betabotz.eu.org/api/sound/texttosound?text1=${Text}&lang=id-id&apikey=${lann}`)
          const res = response.data.result;      
          var  mp3 = res;
          // let caption = `*Title:* ${title}\n*Duration:* ${duration}`
          await conn.sendFile(m.chat, mp3, null, m); 
      }
      else if (command == 'texttoeng') 
        {
        const response = await axios.get(`https://api.betabotz.eu.org/api/sound/texttosound?text1=${Text}&lang=en-US&apikey=${lann}`)
          const res = response.data.result;      
          var  mp3 = res;
          // let caption = `*Title:* ${title}\n*Duration:* ${duration}`
          await conn.sendFile(m.chat, mp3, null, m); 
      }
      else if (command == 'texttojp') 
        {
        const response = await axios.get(`https://api.betabotz.eu.org/api/sound/texttosound?text1=${Text}&lang=ja-JP&apikey=${lann}`)
          const res = response.data.result;      
          var  mp3 = res;
          // let caption = `*Title:* ${title}\n*Duration:* ${duration}`
          await conn.sendFile(m.chat, mp3, null, m); 
      }
      else if (command == 'texttofr') 
        {
        const response = await axios.get(`https://api.betabotz.eu.org/api/sound/texttosound?text1=${Text}&lang=fr-FR&apikey=${lann}`)
          const res = response.data.result;      
          var  mp3 = res;
          // let caption = `*Title:* ${title}\n*Duration:* ${duration}`
          await conn.sendFile(m.chat, mp3, null, m); 
      }
      else if (command == 'texttopny') 
        {
        const response = await axios.get(`https://api.betabotz.eu.org/api/sound/texttosound?text1=${Text}&lang=fil-PH&apikey=${lann}`)
          const res = response.data.result;      
          var  mp3 = res;
          // let caption = `*Title:* ${title}\n*Duration:* ${duration}`
          await conn.sendFile(m.chat, mp3, null, m); 
      }
      else if (command == 'texttomy') 
        {
        const response = await axios.get(`https://api.betabotz.eu.org/api/sound/texttosound?text1=${Text}&lang=my&apikey=${lann}`)
          const res = response.data.result;      
          var  mp3 = res;
          // let caption = `*Title:* ${title}\n*Duration:* ${duration}`
          await conn.sendFile(m.chat, mp3, null, m); 
      }
      else if (command == 'texttojrmn') 
        {
        const response = await axios.get(`https://api.betabotz.eu.org/api/sound/texttosound?text1=${Text}&lang=de-DE&apikey=${lann}`)
          const res = response.data.result;      
          var  mp3 = res;
          // let caption = `*Title:* ${title}\n*Duration:* ${duration}`
          await conn.sendFile(m.chat, mp3, null, m); 
      }
      else if (command == 'texttoitly') 
        {
        const response = await axios.get(`https://api.betabotz.eu.org/api/sound/texttosound?text1=${Text}&lang=it-IT&apikey=${lann}`)
          const res = response.data.result;      
          var  mp3 = res;
          // let caption = `*Title:* ${title}\n*Duration:* ${duration}`
          await conn.sendFile(m.chat, mp3, null, m); 
      }
      else if (command == 'texttokr') 
        {

        const response = await axios.get(`https://api.betabotz.eu.org/api/sound/texttosound?text1=${Text}&lang=jko-KR&apikey=${lann}`)
          const res = response.data.result;      
          var  mp3 = res;
          // let caption = `*Title:* ${title}\n*Duration:* ${duration}`
          await conn.sendFile(m.chat, mp3, null, m); 
      }
      else if (command == 'texttothai') 
        {
        const response = await axios.get(`https://api.betabotz.eu.org/api/sound/texttosound?text1=${Text}&lang=th-TH&apikey=${lann}`)
          const res = response.data.result;      
          var  mp3 = res;
          // let caption = `*Title:* ${title}\n*Duration:* ${duration}`
          await conn.sendFile(m.chat, mp3, null, m); 
      }
      else if (command == 'texttoindia') 
        {
        const response = await axios.get(`https://api.betabotz.eu.org/api/sound/texttosound?text1=${Text}&lang=hi-IN&apikey=${lann}`)
          const res = response.data.result;      
          var  mp3 = res;
          // let caption = `*Title:* ${title}\n*Duration:* ${duration}`
          await conn.sendFile(m.chat, mp3, null, m); 
      }

        // await conn.sendMessage(m.chat, { 
        //     document: { url: mp3 }, 
        //     mimetype: 'Audio/mpeg',
        //     fileName: `.mp3`,
        //     // caption: caption
        // }, { quoted: m });
};
handler.command = handler.help = ['texttorusia', 'texttoindo', 'texttoeng', 'texttojp', 'texttofr', 'texttopny', 'texttomy', 'texttojrmn', 'texttoitly', 'texttokr', 'texttothai', 'texttoindia'];
// handler.help = ['texttorusia'];
// handler.command = /^(texttorusia)$/i
handler.tags = ['tools'];
handler.limit = true;
handler.group = true;
handler.fail = null;
handler.private = false;

module.exports = handler;