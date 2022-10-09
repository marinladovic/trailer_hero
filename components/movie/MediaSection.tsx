import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { useRef, useState } from 'react';
import { Video } from '../../typings';
import VideoThumbnail from './VideoThumbnail';

interface Props {
  videos: Video[];
  type: string;
  title: string;
}

function MediaSection({ videos, type, title }: Props) {
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
      <h2>{title}</h2>
      <div className="group relative md:-ml-2">
        <ChevronLeftIcon
          onClick={() => handleScroll('left')}
          className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${
            !isMoved && 'hidden'
          }`}
        />
        <div
          ref={rowRef}
          className="flex scrollbar-hide items-center gap-x-2 overflow-x-scroll"
        >
          {videos
            .filter(
              (video) =>
                video.type === type &&
                video.site === 'YouTube' &&
                video.official
            )
            .map((video) => (
              <VideoThumbnail key={video.id} video={video} />
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

export default MediaSection;
