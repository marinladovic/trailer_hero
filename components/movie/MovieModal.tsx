import { useEffect, useState } from 'react';
import MuiModal from '@mui/material/Modal';
import { useRecoilState } from 'recoil';
import { movieModalState, mutedState } from '../../atoms/modalAtom';
import ReactPlayer from 'react-player/lazy';
import {
  CheckIcon,
  PlusIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

interface Props {
  videoUrl: string | null;
}

function MovieModal({ videoUrl }: Props) {
  const [showMovieModal, setShowMovieModal] = useRecoilState(movieModalState);
  const [isMuted, setIsMuted] = useRecoilState(mutedState);

  const handleClose = () => {
    setShowMovieModal(false);
  };

  return (
    <MuiModal
      open={showMovieModal}
      onClose={handleClose}
      className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll scrollbar-hide"
    >
      <>
        <button
          onClick={handleClose}
          className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <div className="relative pt-[56.25%] rounded-md overflow-hidden">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${videoUrl}`}
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: '0', left: '0' }}
            playing
            muted={isMuted}
          />
          <div className="absolute bottom-0 flex w-full items-center justify-end p-4 md:p-10">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="modalButton"
            >
              {isMuted ? (
                <SpeakerXMarkIcon className="h-6 w-6" />
              ) : (
                <SpeakerWaveIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </>
    </MuiModal>
  );
}

export default MovieModal;
