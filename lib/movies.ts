const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const getMovieList = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`
    );
    const movieList = await response.json();
    return movieList;
  } catch (err) {
    console.log(err);
  }
};

export const getMovieListByGenre = async (id: number | undefined) => {
  try {
    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${id}`
    );
    const movieList = await response.json();
    return movieList;
  } catch (err) {
    console.log(err);
  }
};
