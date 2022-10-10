import { useRecoilValue } from 'recoil';
import { mediaItemState } from '../../atoms/mediaItemAtom';
import { Season } from '../../typings';

interface Props {
  season: Season;
}

function Season({ season }: Props) {
  const itemState = useRecoilValue(mediaItemState);

  return (
    <div className="flex space-x-2 min-w-[250px] h-[9.125rem] border border-[gray] rounded-sm shadow-md md:min-w-[300px] md:h-[12.125rem]">
      <img
        src={`https://image.tmdb.org/t/p/w500${
          season.poster_path || itemState?.poster_path
        }`}
        alt={`${season.name} poster`}
        className="w-[6rem] md:w-[9rem] h-[9rem] md:h-[12rem] rounded-l-sm object-cover"
      />
      <div className="p-2">
        <h3 className="line-clamp-2 font-semibold tracking-wide md:text-lg">
          {season.name}
        </h3>
        <p className="text-sm text-gray-400 mb-2">
          Episodes: {season.episode_count}
        </p>
        <p className="line-clamp-3 md:line-clamp-5 text-sm text-gray-400 mb-2">
          {season.overview}
        </p>
      </div>
    </div>
  );
}

export default Season;
