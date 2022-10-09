import { MovieDeatils, SeriesDetails, MediaItem } from '../typings';

function isMovie(
  item: MovieDeatils | SeriesDetails | MediaItem
): item is MovieDeatils {
  return (item as MovieDeatils).title !== undefined;
}

function isSeries(
  item: MovieDeatils | SeriesDetails | MediaItem
): item is SeriesDetails {
  return (item as SeriesDetails).name !== undefined;
}

export default function forceToItem(
  mediaItem: MediaItem | MovieDeatils | SeriesDetails
) {
  let convertedItem: MediaItem | null = null;

  if (isMovie(mediaItem)) {
    convertedItem = {
      title: mediaItem.title,
      original_title: mediaItem.original_title,
      backdrop_path: mediaItem.backdrop_path,
      media_type: 'movie',
      release_date: mediaItem.release_date,
      first_air_date: '',
      genre_ids: mediaItem.genres.map((genre) => genre.id),
      id: mediaItem.id,
      name: '',
      origin_country: [],
      original_language: mediaItem.original_language,
      original_name: '',
      overview: mediaItem.overview,
      popularity: mediaItem.popularity,
      poster_path: mediaItem.poster_path,
      vote_average: mediaItem.vote_average,
      vote_count: mediaItem.vote_count,
      tagline: mediaItem.tagline || mediaItem.overview,
    };
  } else if (isSeries(mediaItem)) {
    convertedItem = {
      title: mediaItem.name,
      backdrop_path: mediaItem.backdrop_path,
      media_type: 'tv',
      release_date: '',
      first_air_date: mediaItem.first_air_date,
      genre_ids: mediaItem.genres.map((genre) => genre.id),
      id: mediaItem.id,
      name: mediaItem.name,
      origin_country: mediaItem.origin_country,
      original_language: mediaItem.original_language,
      original_name: mediaItem.original_name,
      overview: mediaItem.overview,
      popularity: mediaItem.popularity,
      poster_path: mediaItem.poster_path,
      vote_average: mediaItem.vote_average,
      vote_count: mediaItem.vote_count,
      tagline: mediaItem.tagline || mediaItem.overview,
    };
  } else {
    convertedItem = mediaItem;
  }

  return convertedItem;
}
