import { useEffect, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { Genre } from '../../typings';
import { useRecoilState } from 'recoil';
import { genreState } from '../../atoms/modalAtom';

interface Props {
  mediaType: 'movie' | 'tv';
}

function SelectGenre({ mediaType }: Props) {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [genre, setGenre] = useRecoilState(genreState);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setGenre(null);
    async function fetchGenres() {
      const data = await fetch(
        `https://api.themoviedb.org/3/genre/${mediaType}/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
      )
        .then((response) => response.json())
        .catch((err) => console.log(err.message));

      if (data?.genres) {
        setGenres(data.genres);
      }
    }

    fetchGenres();
  }, []);

  return (
    <div className={`pb-12`}>
      <div className="max-w-[18rem] bg-[#141414]">
        <button
          className="w-sm flex justify-between items-center border border-[#FBFEF9] text-lg text-[#FBFEF9] w-full text-left px-3 py-2 rounded focus:ring-2 focus:ring-[#FE4A49]/70 focus:border-[#FE4A49]"
          onClick={() => setOpen(!open)}
        >
          {genre?.name || 'Choose a Genre'}
          <ChevronDownIcon className="w-5 h-5" />
        </button>
        {open && (
          <div className="relative mt-0.5 w-full">
            <ul className="absolute z-50 top-0 w-full grid grid-cols-2 bg-[#141414] shadow-lg border border-[#FBFEF9]">
              {genres.map((genre) => (
                <li
                  key={genre.id}
                  className="px-6 py-2 text-center cursor-pointer hover:text-[#FE4A49] transition duration-[.4s]"
                  onClick={() => {
                    setOpen(!open);
                    return setGenre(genre);
                  }}
                >
                  {genre.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default SelectGenre;
