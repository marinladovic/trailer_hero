const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const requests = {
  fetchPopularShows: `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US`,
  fetchTrending: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchPopularMovies: `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US`,
};

export default requests;
