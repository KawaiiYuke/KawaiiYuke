// const getLyrics = require('./getLyrics');
const getSong = require('./getSong');
const options = {
  apiKey: 'EZkdcj2j90qcFuXAY5I_9Q3jTvTN7NmY5tbI_h-mX9n-Gvc1c_lGJQE0r_fy5BAZ',
  title: 'baby',
  artist: 'justin bieber',
  optimizeQuery: true,
};
// getLyrics(options).then((lyrics) => console.log(lyrics));
getSong(options).then((song) => console.log(`${song.albumArt}`));

// `
// 	${song.id}
// 	${song.title}
// 	${song.url}
// 	${song.albumArt}
// 	${song.lyrics}`
