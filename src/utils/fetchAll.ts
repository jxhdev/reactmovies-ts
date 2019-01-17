import axios from 'axios';

export default async function fetchAllNowPlaying() {
  let res = [];
  let results = await axios.get(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${
      process.env.REACT_APP_TMDB_API_KEY
    }&language=en-US&region=us`
  );
  let page = 1;
  while (res.length < results.data.total_pages) {
    res.push(results.data.results);
    page++;
    results = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${
        process.env.REACT_APP_TMDB_API_KEY
      }&language=en-US&page=${page}&region=us`
    );
  }
  return res;
}
