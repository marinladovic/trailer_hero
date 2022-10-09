import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { useRef, useState } from 'react';
import { Season as SeasonType } from '../../typings';
import Season from './Season';

interface Props {
  seasons: SeasonType[];
}

function Seasons({ seasons }: Props) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);

  const handleScroll = (direction: 'left' | 'right') => {
    setIsMoved(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === 'left'
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-1 md:space-y-2">
      <h2>Seasons</h2>
      <div className="group relative md:-ml-2">
        <ChevronLeftIcon
          onClick={() => handleScroll('left')}
          className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${
            !isMoved && 'hidden'
          }`}
        />
        <div
          ref={rowRef}
          className="flex scrollbar-hide items-center space-x-1 overflow-x-scroll md:space-x-4"
        >
          {seasons
            .filter((season) => season.episode_count > 0)
            .map((season) => (
              <Season key={season.id} season={season} />
            ))}
        </div>
        <ChevronRightIcon
          onClick={() => handleScroll('right')}
          className={`absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100`}
        />
      </div>
    </div>
  );
}

export default Seasons;
