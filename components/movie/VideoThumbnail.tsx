import Image from 'next/image';
import { Video } from '../../typings';
import { FaPlay } from 'react-icons/fa';
import { useRecoilState } from 'recoil';
import { movieModalDataState, movieModalState } from '../../atoms/modalAtom';

interface Props {
  video: Video;
}

function VideoThumbnail({ video }: Props) {
  const [showMovieModal, setShowMovieModal] = useRecoilState(movieModalState);
  const [videoUrl, setVideoUrl] = useRecoilState(movieModalDataState);

  return (
    <div
      className="relative flex min-w-[250px] h-[9.125rem] shadow-md border border-[gray]/40 rounded-md cursor-pointer hover:bg-[gray] transition duration-[.4s]"
      onClick={() => {
        setVideoUrl(video.key);
        setShowMovieModal(true);
      }}
    >
      <Image
        src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
        alt={`${video.name} thumbnail`}
        width={250}
        height={146}
        className="rounded-md object-cover"
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <FaPlay className="text-[gray]/60 text-2xl m-auto w-12 h-12" />
      </div>
    </div>
  );
}

export default VideoThumbnail;
