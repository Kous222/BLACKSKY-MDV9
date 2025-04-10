const fetch = require('node-fetch');
let handler = async (m, { conn, args, usedPrefix, command }) => {
  const username = [
    'natajadeh',
    'aletaanovianda',
    'faisafch',
    '0rbby',
    'cindyanastt',
    'awaa.an',
    'nadineabgail',
    'ciloqciliq',
    'carluskiey',
    'wuxiaturuxia',
    'joomblo',
    'hxszys',
    'indomeysleramu',
    'anindthrc',
    'm1cel',
    'chrislin.chrislin',
    'brocolee__',
    'dxzdaa',
    'toodlesprunky',
    'wasawho',
    'paphricia',
    'queenzlyjlita',
    'apol1yon',
    'eliceannabella',
    'aintyrbaby',
    'christychriselle',
    'natalienovita',
    'glennvmi',
    '_rgtaaa',
    'felicialrnz',
    'zahraazzhri',
    'mdy.li',
    'jeyiiiii_',
    'bbytiffs',
    'irenefennn',
    'mellyllyyy',
    'xsta_xstar',
    'mellyllyyy',
    'n0_0ella',
    'kutubuku6690',
    'cesiann',
    'gaby.rosse',
    'charrvm_',
    'bilacml04',
    'whosyoraa',
    'ishaangelica',
    'heresthekei',
    'gemoy.douyin',
    'nathasyaest',
    'jasmine.mat',
    'akuallyaa',
    'meycoco22',
    'baby_sya66',
    'knzymyln__',
    'rin.channn',
    'audicamy',
    'franzeskaedelyn',
    'shiraishi.ito',
    'itsceceh',
    'senpai_cj7',
  ];
  const pickuser = username[Math.floor(Math.random() * username.length)];
  const query = args[0] ? args[0] : pickuser;
  try {
    const res = await fetch(`https://api.betabotz.eu.org/api/asupan/tiktok?query=${query}&apikey=${lann}`);
    const api = await res.json();
    
    const Video = api.result.data[0];
    const author = Video.author;
    const music = Video.music_info;
    
    let capt = `乂 *T I K T O K*\n\n`;
    capt += `  ◦ *Author* : ${author.nickname} (@${author.unique_id})\n`;
    capt += `  ◦ *Views* : ${Video.play_count}\n`;
    capt += `  ◦ *Likes* : ${Video.digg_count}\n`;
    capt += `  ◦ *Shares* : ${Video.share_count}\n`;
    capt += `  ◦ *Comments* : ${Video.comment_count}\n`;
    capt += `  ◦ *Duration* : ${Math.floor(Video.duration / 60)} menit ${Math.floor(Video.duration % 60)} Sekunden\n`;
    capt += `  ◦ *Sound* : ${music.title} - ${music.author}\n`;
    capt += `  ◦ *Caption* : ${Video.title || '-'}\n\n`;
    conn.sendFile(m.chat, Video.play, null, capt, m);
  } catch (error) {
    throw `🚩 *Username Nein Gefunden*`
  }
}
handler.help = ['asupantiktok'].map(v => v + ' <username>');
handler.tags = ['internet'];
handler.command = /^(asupantiktok)$/i;
handler.limit = true;

module.exports = handler;
