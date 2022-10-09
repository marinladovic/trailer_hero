const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const getTvShowList = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=en-US`
    );
    const tvShowList = await response.json();
    return tvShowList;
  } catch (err) {
    console.log(err);
  }
};

export const getTvShowListByGenre = async (id: number | undefined) => {
  try {
    const response = await fetch(
      `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=${id}`
    );
    const tvShowList = await response.json();
    return tvShowList;
  } catch (err) {
    console.log(err);
  }
};
