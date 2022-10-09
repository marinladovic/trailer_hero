const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const getPeople = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/person/popular?api_key=${API_KEY}&language=en-US`
    );
    const tvShowList = await response.json();
    return tvShowList;
  } catch (err) {
    console.log(err);
  }
};

export const getPerson = async (id: number | undefined) => {
  try {
    const response = await fetch(
      `${BASE_URL}/person/${id}?api_key=${API_KEY}&language=en-US&append_to_response=combined_credits,images`
    );
    const tvShowList = await response.json();
    return tvShowList;
  } catch (err) {
    console.log(err);
  }
};
