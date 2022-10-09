import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useRef, useState } from 'react';
import { Credit } from '../../typings';
import CreditThumbnail from './CreditThumbnail';

interface Props {
  mediaType: 'movie' | 'tv';
  credits: Credit[];
  job: string;
}

function CreditsRow({ mediaType, credits, job }: Props) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);

  const handleClick = (direction: string) => {
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
    <div>
      <h2>{job}</h2>
      <div className="group relative md:-ml-2">
        <ChevronLeftIcon
          onClick={() => handleClick('left')}
          className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${
            !isMoved && 'hidden'
          }`}
        />
        <div
          ref={rowRef}
          className="flex scrollbar-hide items-center space-x-1 overflow-x-scroll md:space-x-2.5 md:p-2"
        >
          {credits.slice(0, 20).map((credit, index) => (
            <CreditThumbnail key={index} credit={credit} />
          ))}
        </div>
        <ChevronRightIcon
          onClick={() => handleClick('right')}
          className={`absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100`}
        />
      </div>
    </div>
  );
}

export default CreditsRow;
