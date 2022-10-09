import { Episode } from '../../typings';
import { formatDate } from '../../utils/dateFormater';

const BASE_URL = 'https://api.themoviedb.org/3';

interface Props {
  title: 'Latest Episode' | 'Next Episode';
  episode: Episode;
}

function Episode({ title, episode }: Props) {
  return (
    <div className="flex flex-col space-y-2 text-[#FBFEF9]">
      <h2 className="mb-0">{title}</h2>
      <h3>{episode.name}</h3>
      <div className="flex flex-col text-[gray]">
        {title === 'Latest Episode' && episode.vote_average && (
          <p>
            Average Rating:{' '}
            <span
              className={`${
                episode.vote_average > 7.5
                  ? 'text-[#16a34a]'
                  : episode.vote_average > 5
                  ? 'text-[#d97706]'
                  : 'text-[#dc2626]'
              }`}
            >
              {Math.floor(episode.vote_average * 10)}%
            </span>{' '}
            from{' '}
            {episode.vote_count
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
            votes
          </p>
        )}
        <p>
          {title === 'Latest Episode' ? 'Aired' : 'Airing'} on{' '}
          {formatDate(episode?.air_date)}
        </p>
        <p>Runtime: {episode.runtime} min</p>
        <p>
          Season {episode.season_number}, Episode {episode.episode_number}
        </p>
      </div>
      <p>{episode.overview}</p>
      {episode.still_path && (
        <div className="flex items-center justify-center md:justify-start">
          <img
            src={`https://image.tmdb.org/t/p/w500${episode.still_path}`}
            alt={episode.name}
            className="w-3/4 rounded-sm md:w-full"
          />
        </div>
      )}
    </div>
  );
}

export default Episode;
