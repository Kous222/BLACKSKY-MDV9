const axios = require('axios');

let handler = async (m, { text, conn }) => {
  if (!text) {
    await m.reply('🔍 *Bitte gib den Titel eines Films ein, nach dem du suchen möchtest!*');
    return;
  }

  const apiKey = 'ed2b1d22'; // Replace this with your OMDb API key
  const movieTitle = text;
  const url = `https://www.omdbapi.com/?t=${encodeURIComponent(movieTitle)}&apikey=${apiKey}`;

  try {
    const response = await axios.get(url);

    if (response.data.Response === 'False') {
      await m.reply('❌ *Film nicht gefunden. Bitte versuche es mit einem anderen Titel.*');
      return;
    }

    const movie = response.data;
    const movieInfo = `
      🎬 *Film: ${movie.Title} (${movie.Year})*
      🍿 *Genre*: ${movie.Genre}
      🎭 *Schauspieler*: ${movie.Actors}
      📝 *Plot*: ${movie.Plot}
      🌍 *Land*: ${movie.Country}
      🎥 *Regisseur*: ${movie.Director}
      🌟 *Bewertung*: ${movie.imdbRating} / 10
      📅 *Veröffentlichung*: ${movie.Released}
      🎞️ *Länge*: ${movie.Runtime}
    `;

    await m.reply(movieInfo);
  } catch (error) {
    console.error(error);
    await m.reply('❌ *Es gab ein Problem beim Abrufen der Filminformationen. Versuche es später erneut.*');
  }
};

handler.command = ['searchmovie', 'movieinfo', 'movie'];
handler.help = ['searchmovie [movie title]'];
handler.tags = ['fun', 'info'];

module.exports = handler;