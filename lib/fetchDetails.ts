const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovieDetails = async (id: number) => {
  try {
    if (id) {
      const response = await fetch(
        `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=videos,credits,recommendations`
      );
      const details = await response.json();
      return details;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
  }
};

export const fetchTvDetails = async (id: number) => {
  try {
    if (id) {
      const response = await fetch(
        `${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=en-US&append_to_response=videos,aggregate_credits,credits,recommendations`
      );
      const details = await response.json();
      return details;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
  }
};
