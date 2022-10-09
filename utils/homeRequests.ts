const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const requests = {
  /** Fetching popular tv shows */
  fetchPopularShows: `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US`,
  /** Fetching trending tv & movies */
  fetchTrending: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`,
  /** Fetching action & adventure shows */
  fetchActionAndAdventureShows: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=10759`,
  /** Fetching crime shows */
  fetchCrimeShows: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=80`,
  /** Fetching sci-fi & fantasy shows */
  fetchFantasyShows: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=10765`,
  /** Fetching popular movies */
  fetchPopularMovies: `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US`,
  /** Fetching comedy movies */
  fetchComedyMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=35`,
  /** Fetching horror movies */
  fetchHorrorMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=27`,
  /** Fetching shows for kids */
  fetchKidsShows: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=10762%2C10759`,
  /** Fetching political drama shows */
  fetchPoliticalDramaShows: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=10768%2C18`,
};

export default requests;
