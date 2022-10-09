import { useEffect, useState } from 'react';
import MuiModal from '@mui/material/Modal';
import { useRecoilState, useRecoilValue } from 'recoil';
import { modalState, mutedState } from '../../atoms/modalAtom';
import { mediaItemState } from '../../atoms/mediaItemAtom';
import ReactPlayer from 'react-player/lazy';
import {
  CheckIcon,
  PlusIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Element } from '../../typings';

interface Props {
  type?: string;
}

function Modal({ type }: Props) {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const item = useRecoilValue(mediaItemState);
  const [trailer, setTrailer] = useState('');
  const [isMuted, setIsMuted] = useRecoilState(mutedState);

  useEffect(() => {
    async function fetchTrailer() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${item?.media_type || type}/${
          item?.id
        }?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      )
        .then((response) => response.json())
        .catch((err) => console.log(err.message));

      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === 'Trailer'
        );
        setTrailer(data.videos.results[index]?.key);
      } else {
        setTrailer('');
      }
    }

    fetchTrailer();
  }, [item]);

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <MuiModal
      open={showModal}
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
          {trailer ? (
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${trailer}`}
              width="100%"
              height="100%"
              style={{ position: 'absolute', top: '0', left: '0' }}
              playing
              muted={isMuted}
            />
          ) : (
            <ReactPlayer
              url={'https://www.youtube.com/watch?v=ScMzIvxBSi4'}
              width="100%"
              height="100%"
              style={{ position: 'absolute', top: '0', left: '0' }}
              playing
              muted={isMuted}
            />
          )}

          {!trailer && (
            <div className="absolute top-1/2 left-1/2 max-w-sm -translate-x-1/2 -translate-y-1/2 bg-[#141414]/40 p-4 md:p-8 text-center text-lg md:text-2xl md:leading-loose text-shadow-lg rounded">
              <p>
                We are sorry, but it seems there is no trailer provided for this
                title.
              </p>
            </div>
          )}
          <div className="absolute bottom-0 flex w-full items-center justify-between p-4 md:p-10">
            <button className="modalButton">
              <PlusIcon className="h-6 w-6" />
            </button>
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

export default Modal;
