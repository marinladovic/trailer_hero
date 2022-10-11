import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { genreState, modalState } from '../../atoms/modalAtom';
import Banner from '../../components/shared/Banner';
import Header from '../../components/shared/Header';
import Modal from '../../components/shared/Modal';
import Row from '../../components/shared/Row';
import SelectGenre from '../../components/shared/SelectGenre';
import Thumbnail from '../../components/shared/Thumbnail';
import { getMovieListByGenre } from '../../lib/movies';
import { MediaItem } from '../../typings';
import moviesRequests from '../../utils/moviesRequests';

interface Props {
  latestMovies: MediaItem[];
  nowPlayingMovies: MediaItem[];
  popularMovies: MediaItem[];
  topRatedMovies: MediaItem[];
  upcomingMovies: MediaItem[];
}

function Movies({
  nowPlayingMovies,
  popularMovies,
  topRatedMovies,
  upcomingMovies,
}: Props) {
  const showModal = useRecoilValue(modalState);
  const genre = useRecoilValue(genreState);
  const [movies, setMovies] = useState<MediaItem[]>([]);

  useEffect(() => {
    if (genre) {
      const fetchMovies = async () => {
        const movieList = await getMovieListByGenre(genre!.id);
        if (movieList) {
          setMovies(movieList.results);
        } else {
          setMovies([]);
        }
      };

      fetchMovies();
    }
  }, [genre]);

  return (
    <div
      className={`relative h-screen bg-gradient-to-b lg:h-[140vh] ${
        showModal && '!h-screen overflow-hidden'
      }`}
    >
      <Head>
        <title>Movies | TrailerHero | What to Watch Next</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header />
      <main className="relative pl-4 pb-24 lg:space-y-8 lg:px-16">
        <Banner trendingNow={nowPlayingMovies} type="movie" />
        <SelectGenre mediaType="movie" />
        {!genre ? (
          <section className=" space-y-12 md:space-y-24">
            <Row
              title="Playing Now"
              items={nowPlayingMovies}
              media_type="movie"
            />
            <Row
              title="Upcoming Movies"
              items={upcomingMovies}
              media_type="movie"
            />
            <Row
              title="Top Rated Movies"
              items={topRatedMovies}
              media_type="movie"
            />
            <Row
              title="Popular Movies"
              items={popularMovies}
              media_type="movie"
            />
          </section>
        ) : (
          <section className="flex flex-col space-y-6 mt-8">
            <h2 className="text-shadow-md">Discover {genre.name} Movies</h2>
            <div className="grid max-w-7xl mx-auto grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
              {movies.map((movie) => (
                <div className="mx-auto">
                  <Thumbnail key={movie.id} item={movie} type="movie" />
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {showModal && <Modal type="movie" />}
    </div>
  );
}

export default Movies;

export const getServerSideProps = async () => {
  const [nowPlayingMovies, popularMovies, topRatedMovies, upcomingMovies] =
    await Promise.all([
      fetch(moviesRequests.fetchNowPlaying).then((res) => res.json()),
      fetch(moviesRequests.fetchPopular).then((res) => res.json()),
      fetch(moviesRequests.fetchTopRatedMovies).then((res) => res.json()),
      fetch(moviesRequests.fetchUpcomingMovies).then((res) => res.json()),
    ]);
  return {
    props: {
      nowPlayingMovies: nowPlayingMovies.results,
      popularMovies: popularMovies.results,
      topRatedMovies: topRatedMovies.results,
      upcomingMovies: upcomingMovies.results,
    },
  };
};
