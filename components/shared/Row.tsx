import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useRef, useState } from 'react';
import Thumbnail from './Thumbnail';
import { MediaItem } from '../../typings';

interface Props {
  title: string;
  items: MediaItem[];
  media_type?: string;
}

function Row({ title, items, media_type }: Props) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);

  if (media_type) {
    const copy = JSON.parse(JSON.stringify(items)) as typeof items;
    copy.map((item) => (item.media_type = media_type));
    items = copy;
  }

  // Create a copy of the items array

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
      <h2>{title}</h2>
      <div className="group relative md:-ml-2">
        <ChevronLeftIcon
          onClick={() => handleScroll('left')}
          className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${
            !isMoved && 'hidden'
          }`}
        />
        {/* Render Movie posters */}
        <div
          ref={rowRef}
          className="flex scrollbar-hide items-center space-x-1 overflow-x-scroll md:space-x-4"
        >
          {items.map((item) => (
            <Thumbnail key={item.id} item={item} />
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

export default Row;
