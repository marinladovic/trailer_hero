import { useState, useEffect } from 'react';
import { baseUrl } from '../../constants/movies';
import { MediaItem, MovieDeatils, SeriesDetails } from '../../typings';
import { FaPlay } from 'react-icons/fa';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import { useRecoilState, useRecoilValue } from 'recoil';
import { modalState } from '../../atoms/modalAtom';
import Link from 'next/link';
import { mediaItemState } from '../../atoms/mediaItemAtom';
import useAuth from '../../hooks/useAuth';
import { CheckIcon, PlusIcon } from '@heroicons/react/24/outline';
import { collection, DocumentData, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { addToList, deleteFromList } from '../../lib/myListFunctions';

interface Props {
  trendingNow?: MediaItem[] | null;
  type?: string;
}

function Banner({ trendingNow, type }: Props) {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [item, setItem] = useRecoilState(mediaItemState);
  const { user } = useAuth();
  const [addedToList, setAddedToList] = useState(false);
  const [mediaItems, setMediaItems] = useState<DocumentData[] | MediaItem[]>(
    []
  );

  if (trendingNow) {
    useEffect(() => {
      setItem(trendingNow[Math.floor(Math.random() * trendingNow.length)]);
    }, [trendingNow]);
  }

  // find all mediaItems in the user's myList
  useEffect(() => {
    if (user) {
      return onSnapshot(
        collection(db, 'users', user.uid, 'myList'),
        (snapshot) => setMediaItems(snapshot.docs)
      );
    }
  }, [db, item]);

  // check if the mediaItem is already in the user's myList
  useEffect(() => {
    setAddedToList(
      mediaItems.findIndex((result) => result.data().id === item?.id) !== -1
    );
  }, [mediaItems]);

  const handleList = async () => {
    if (addedToList) {
      deleteFromList(item!, user!);
    } else {
      if (type) {
        addToList(item!, user!, type);
      } else {
        addToList(item!, user!);
      }
    }
  };

  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
      <div className="absolute top-0 left-0 -z-10 h-[95vh] w-full">
        {item?.backdrop_path ? (
          <img
            src={`${baseUrl}${item?.backdrop_path || item?.poster_path}`}
            alt={`${item?.name || item?.original_name} backdrop`}
            className="object-cover w-full h-full"
          />
        ) : (
          <img
            src="/assets/placeholder_backdrop.jpg"
            alt="Placeholder backdrop"
            className="object-cover w-full h-full"
          />
        )}
      </div>
      <h1>{item?.title || item?.name || item?.original_name}</h1>
      <p className="line-clamp-3 max-w-xs text-shadow-md text-sm md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
        {item?.tagline || item?.overview}
      </p>
      <div className="flex space-x-3">
        <button
          className="bannerButton bg-white text-black"
          onClick={() => {
            setShowModal(true);
          }}
        >
          <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" /> Play trailer
        </button>
        {user && (
          <button className="bannerButton bg-[gray]/70" onClick={handleList}>
            {addedToList ? (
              <>
                <CheckIcon className="h-6 w-6" /> Remove from My List
              </>
            ) : (
              <>
                <PlusIcon className="h-6 w-6" /> Add to My List
              </>
            )}
          </button>
        )}
        {trendingNow && (
          <Link href={`${item?.media_type || type}/${item?.id}`}>
            <button className="bannerButton bg-[gray]/70">
              More Info{' '}
              <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8" />
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Banner;
