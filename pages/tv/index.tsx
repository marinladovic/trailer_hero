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
import { getTvShowListByGenre } from '../../lib/tvshows';
import { MediaItem } from '../../typings';
import seriesRequest from '../../utils/seriesRequests';

interface Props {
  showsAiringToday: MediaItem[];
  showsOnTheAir: MediaItem[];
  popularShows: MediaItem[];
  topRatedShows: MediaItem[];
}

function Tv({
  showsAiringToday,
  showsOnTheAir,
  popularShows,
  topRatedShows,
}: Props) {
  const showModal = useRecoilValue(modalState);
  const genre = useRecoilValue(genreState);
  const [series, setSeries] = useState<MediaItem[]>([]);

  useEffect(() => {
    if (genre) {
      const fetchSeries = async () => {
        const seriesList = await getTvShowListByGenre(genre!.id);
        if (seriesList) {
          setSeries(seriesList.results);
        } else {
          setSeries([]);
        }
      };

      fetchSeries();
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
        <Banner trendingNow={popularShows} type="tv" />
        <SelectGenre mediaType="tv" />
        {!genre ? (
          <section className="space-y-12 md:space-y-24">
            <Row
              title="Shows Airing Today"
              items={showsAiringToday}
              media_type="tv"
            />
            <Row
              title="New Episode This Week"
              items={showsOnTheAir}
              media_type="tv"
            />
            <Row title="Popular Shows" items={popularShows} media_type="tv" />
            <Row
              title="Top Rated Shows"
              items={topRatedShows}
              media_type="tv"
            />
          </section>
        ) : (
          <section className="flex flex-col space-y-6 mt-8">
            <h2 className="text-shadow-md">Discover {genre.name} TV Shows</h2>
            <div className="grid max-w-7xl mx-auto grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
              {series.map((show) => (
                <div className="mx-auto">
                  <Thumbnail key={show.id} item={show} type="tv" />
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {showModal && <Modal type="tv" />}
    </div>
  );
}

export default Tv;

export const getServerSideProps = async () => {
  const [showsAiringToday, showsOnTheAir, popularShows, topRatedShows] =
    await Promise.all([
      fetch(seriesRequest.fetchShowsAiringToday).then((res) => res.json()),
      fetch(seriesRequest.fetchShowsOnTheAir).then((res) => res.json()),
      fetch(seriesRequest.fetchPopularShows).then((res) => res.json()),
      fetch(seriesRequest.fetchTopRatedShows).then((res) => res.json()),
    ]);
  return {
    props: {
      showsAiringToday: showsAiringToday.results,
      showsOnTheAir: showsOnTheAir.results,
      popularShows: popularShows.results,
      topRatedShows: topRatedShows.results,
    },
  };
};
