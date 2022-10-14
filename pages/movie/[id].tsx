import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loadingState } from '../../atoms/loadingAtom';
import { mediaItemState } from '../../atoms/mediaItemAtom';
import {
  modalState,
  movieModalDataState,
  movieModalState,
} from '../../atoms/modalAtom';
import MediaSection from '../../components/movie/MediaSection';
import Banner from '../../components/shared/Banner';
import CreditsRow from '../../components/shared/CreditsRow';
import Header from '../../components/shared/Header';
import Modal from '../../components/shared/Modal';
import MovieModal from '../../components/movie/MovieModal';
import Row from '../../components/shared/Row';
import { fetchMovieDetails } from '../../lib/fetchDetails';
import { MovieDeatils, Video } from '../../typings';
import { formatDate } from '../../utils/dateFormater';
import forceToItem from '../../utils/forceToItem';
import Image from 'next/image';

function Movie() {
  const [loading, setLoading] = useRecoilState(loadingState);
  const [mediaItem, setMediaItem] = useRecoilState(mediaItemState);
  const videoUrl = useRecoilValue(movieModalDataState);
  const showModal = useRecoilValue(modalState);
  const showMovieModal = useRecoilValue(movieModalState);
  const [movie, setMovie] = useState<MovieDeatils | null>(null);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchMovie = async () => {
        const res = await fetchMovieDetails(+id);
        setMovie(res);
        setMediaItem(forceToItem(res));
      };
      fetchMovie();
    } else {
      setMovie(null);
    }
    setLoading(false);
  }, [id]);

  return (
    <div className={`relative h-screen bg-gradient-to-b lg:h-[140vh]`}>
      <Head>
        <title>
          {movie?.title}
          {` | ${movie?.tagline}`}
        </title>
        <meta
          name="description"
          content={`See the latest information and trailer for ${
            movie?.title || movie?.original_title
          }. Save ${
            movie?.title || movie?.original_title
          } to your watchlist, and manage your watchlist.`}
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header />
      <main className="relative pb-24 px-4 space-y-8 md:px-8 md:space-y-16 lg:pl-16 lg:space-y-32 xl:pl-32 xl:space-y-40 2xl:pl-40">
        <Banner />
        {/* Grid Container */}
        <div className="grid grid-cols-1 gap-y-8 max-w-7xl mx-auto md:grid-cols-8 md:gap-x-24">
          {/* Deatils Section */}
          <section className="flex flex-col text-xs text-shadow-md md:col-span-8 md:text-base">
            {movie?.release_date && (
              <p>Release date: {formatDate(movie.release_date)}</p>
            )}
            {movie?.vote_average && (
              <p>
                Average Rating:{' '}
                <span
                  className={`${
                    movie.vote_average > 7.5
                      ? 'text-[#16a34a]'
                      : movie.vote_average > 5
                      ? 'text-[#d97706]'
                      : 'text-[#dc2626]'
                  }`}
                >
                  {Math.floor(movie.vote_average * 10)}%
                </span>{' '}
                from{' '}
                {movie.vote_count
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                votes
              </p>
            )}
            {movie?.runtime && <p>Runtime: {movie.runtime} min</p>}
            {movie?.genres && (
              <p>
                Genre:{' '}
                {movie.genres &&
                  movie.genres.map((genre) => genre.name).join(', ')}
              </p>
            )}
          </section>
          {/* Left Content */}
          <div className="flex flex-col gap-y-16 md:col-span-5">
            {/* Overview Section */}
            <section className="text-shadow-md space-y-2 md:col-span-5 md:space-y-4">
              <h2>Overview</h2>
              <p className="text-sm md:text-lg">{movie?.overview}</p>
            </section>
            {/* Media Section */}
            {movie?.videos.results.filter(
              (video: Video) => video.type === 'Trailer'
            ).length > 0 && (
              <MediaSection
                videos={movie?.videos.results}
                type="Trailer"
                title="Official Trailers"
              />
            )}
            {movie?.videos.results.filter(
              (video: Video) => video.type === 'Teaser'
            ).length > 0 && (
              <MediaSection
                videos={movie?.videos.results}
                type="Teaser"
                title="Teasers"
              />
            )}
            {/* Credits Section */}
            <section className="flex flex-col space-y-6">
              {movie?.credits.cast && (
                <CreditsRow
                  mediaType="tv"
                  credits={movie.credits.cast}
                  job="cast"
                />
              )}
              {movie?.credits.crew && (
                <CreditsRow
                  mediaType="tv"
                  credits={movie.credits.crew}
                  job="crew"
                />
              )}
            </section>
          </div>
          {/* Right Content */}
          <div className="flex flex-col gap-y-16 md:col-span-3">
            {/* Facts section */}
            <section className="flex flex-col space-y-2 md:col-span-3 md:space-y-4">
              <h2>Facts</h2>
              <div className="flex flex-col space-y-1 text-sm font-semibold md:text-lg text-[gray]">
                <p>
                  Status: <span className="text-[#eee]">{movie?.status}</span>
                </p>
                {movie?.budget !== 0 && (
                  <p>
                    Budget:
                    <span className="text-[#eee]">
                      {' $ '}
                      {movie?.budget
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </span>
                  </p>
                )}
                {movie?.revenue !== 0 && (
                  <p>
                    Revenue:
                    <span className="text-[#eee]">
                      {' $ '}
                      {movie?.revenue
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </span>
                  </p>
                )}
                <p>
                  Original title:{' '}
                  <span className="text-[#eee]">{movie?.original_title}</span>
                </p>
                <p>
                  Spoken Languages:{' '}
                  <span className="text-[#eee]">
                    {movie?.spoken_languages &&
                      movie.spoken_languages
                        .map((language) => language.english_name)
                        .join(', ')}
                  </span>
                </p>
              </div>
            </section>
            {/* Poster Section */}
            {movie?.poster_path && (
              <section className="flex flex-col space-y-2 md:col-span-3 md:space-y-4">
                <h2>Movie Poster</h2>
                <div className="w-2/3 overflow-hidden rounded-md mx-auto md:mx-0">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
                    alt={movie?.title}
                    width={500}
                    height={750}
                    unoptimized
                  />
                </div>
              </section>
            )}
            {/* Production section */}
            <div className="flex flex-col space-y-2 text-sm font-semibold md:col-span-8">
              <div>
                <p>Production companies:</p>
                <p className="text-[gray]">
                  {movie?.production_companies &&
                    movie.production_companies
                      .map((production) => production.name)
                      .join(', ')}
                </p>
              </div>
              <div>
                <p>Production countries:</p>
                <p className="text-[gray]">
                  {movie?.production_countries &&
                    movie.production_countries
                      .map((country) => country.iso_3166_1)
                      .join(', ')}
                </p>
              </div>
            </div>
          </div>
          {/* Reccomendations section */}
          {movie?.recommendations && (
            <section className="md:col-span-8">
              <Row
                title="Reccomendations"
                items={movie.recommendations.results}
                media_type="movie"
              />
            </section>
          )}
        </div>
      </main>
      {showModal && <Modal />}
      {showMovieModal && <MovieModal videoUrl={videoUrl} />}
    </div>
  );
}

export default Movie;
