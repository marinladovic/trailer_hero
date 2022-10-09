import { CircularProgress } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { MediaItem } from '../../typings';

interface Props {
  item: MediaItem;
  type?: string;
}

function Thumbnail({ item, type }: Props) {
  const {
    title,
    backdrop_path,
    media_type,
    release_date,
    first_air_date,
    genre_ids,
    id,
    name,
    origin_country,
    original_language,
    original_name,
    overview,
    popularity,
    poster_path,
    vote_average,
    vote_count,
  } = item;

  const rating = Math.floor(vote_average * 10);

  return (
    <Link href={`/${media_type || type}/${id}`}>
      <div className="relative min-w-[166px] max-w-[166px] h-[250px] cursor-pointer overflow-hidden rounded-md md:h-[300px] md:min-w-[200px] md:max-w-[200px]">
        {item.poster_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w500${
              poster_path || backdrop_path
            }`}
            className="object-cover group"
            layout="fill"
            alt={`${title || name || original_name} poster`}
          />
        ) : (
          <Image
            src="/assets/placeholder_poster.jpg"
            className="object-cover group"
            layout="fill"
            alt={`${title || name || original_name} poster`}
          />
        )}

        <div className="absolute top-0 w-full h-full md:opacity-0 md:hover:opacity-100 transition-all duration-(.4s)">
          <div className="absolute -bottom-2 -left-4 w-[120%] h-[4.6rem] md:h-[5.4rem] md:-bottom-4 bg-[#141414]/70 -rotate-3"></div>
          <div className="absolute flex items-center justify-center p-2 space-x-2 bottom-0 h-16 w-full">
            <div className="flex flex-col justify-center w-4/5">
              <h4 className="line-clamp-1 text-sm text-[#FBFEF9] font-semibold">
                {title || name || original_name}
              </h4>
              <p className="text-xs md:text-sm uppercase">
                {(first_air_date || release_date)?.toString().substring(0, 4)},{' '}
                {original_language}
              </p>
            </div>
            <p
              className={`text-xl md:text-2xl font-bold ${
                rating >= 75
                  ? 'text-[#16a34a]'
                  : rating >= 50
                  ? 'text-[#d97706]'
                  : 'text-[#dc2626]'
              }`}
            >
              {rating}
              <span className="text-xs">%</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Thumbnail;
