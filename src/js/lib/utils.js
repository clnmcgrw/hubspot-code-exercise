


// mock an async function, because that would likely be the real-world scenario
const mediaData = require('../data/data.json');
export const getData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(mediaData.media);
    }, 1500);
  });
};  


// alphabetize sort
// ignores first words "The" & "A"
export const mediaAlphabetize = (prev, next) => {
  const ignoredWords = /The|A/;
  const a = prev.title.replace(ignoredWords, '').toLowerCase().trim();
  const b = next.title.replace(ignoredWords, '').toLowerCase().trim();
  return a.localeCompare(b);
};


// get arrays of all available genres & years
export const getFilters = {
  genre(media) {
    const genres = media.map(item => item.genre);
    const flattened = genres.reduce((acc, val) => acc.concat(val), []);
    return [...new Set(flattened)];
  },
  year(media) {
    const years = media.map(item => item.year);
    return [...new Set(years)];
  }
};

