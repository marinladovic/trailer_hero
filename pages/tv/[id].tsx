import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loadingState } from '../../atoms/loadingAtom';
import { mediaItemState } from '../../atoms/mediaItemAtom';
import { modalState } from '../../atoms/modalAtom';
import Head from 'next/head';
import Banner from '../../components/shared/Banner';
import CreditsRow from '../../components/shared/CreditsRow';
import Episode from '../../components/tv/Episode';
import Header from '../../components/shared/Header';
import Modal from '../../components/shared/Modal';
import Row from '../../components/shared/Row';
import Seasons from '../../components/tv/Seasons';
import { fetchTvDetails } from '../../lib/fetchDetails';
import { SeriesDetails } from '../../typings';
import { formatDate } from '../../utils/dateFormater';
import forceToItem from '../../utils/forceToItem';

function Tv() {
  const [loading, setLoading] = useRecoilState(loadingState);
  const [mediaItem, setMediaItem] = useRecoilState(mediaItemState);
  const showModal = useRecoilValue(modalState);

  const [series, setSeries] = useState<SeriesDetails | null>(null);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchTv = async () => {
        const res = await fetchTvDetails(+id);
        setSeries(res);
        setMediaItem(forceToItem(res));
      };
      fetchTv();
    } else {
      setSeries(null);
    }
    setLoading(false);
  }, [id]);

  return (
    <div className={`relative h-screen bg-gradient-to-b lg:h-[140vh]`}>
      <Head>
        <title>
          {series?.name}
          {` | ${series?.tagline}`}
        </title>
        <meta
          name="description"
          content={`See the latest information and trailer for ${
            series?.name || series?.original_name
          }. Save ${
            series?.name || series?.original_name
          } to your watchlist, and manage your watchlist.`}
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header />
      <main className="relative pb-24 px-4 space-y-8 md:px-8 md:space-y-16 lg:pl-16 lg:space-y-32 xl:pl-32 xl:space-y-40 2xl:pl-40">
        <Banner />
        {/* Grid Container */}
        <div className="grid grid-cols-1 gap-y-8 max-w-7xl mx-auto md:grid-cols-8 md:gap-x-24">
          {/* Details Section */}
          <section className="flex flex-col text-xs text-shadow-md md:col-span-8 md:text-base">
            {series?.first_air_date && (
              <p>First Air Date: {formatDate(series.first_air_date)}</p>
            )}
            {series?.vote_average && (
              <p>
                Average Rating:{' '}
                <span
                  className={`${
                    series.vote_average > 7.5
                      ? 'text-[#16a34a]'
                      : series.vote_average > 5
                      ? 'text-[#d97706]'
                      : 'text-[#dc2626]'
                  }`}
                >
                  {Math.floor(series.vote_average * 10)}%
                </span>{' '}
                from{' '}
                {series.vote_count
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                votes
              </p>
            )}
            {series?.number_of_seasons && (
              <p>
                Number of Seasons: {series.number_of_seasons}{' '}
                {series.number_of_seasons === 1 ? 'Season' : 'Seasons'}
              </p>
            )}
            {series?.genres && (
              <p>
                Genre:{' '}
                {series?.genres &&
                  series.genres.map((genre) => genre.name).join(', ')}
              </p>
            )}
          </section>
          {/* Left content */}
          <div className="flex flex-col gap-y-16 md:col-span-5">
            {/* Overview Section */}
            <section className="text-shadow-md space-y-2 md:col-span-5 md:space-y-4">
              <h2>Overview</h2>
              <p className="text-sm md:text-lg">{series?.overview}</p>
            </section>

            {/* Current/Latest Season Section */}
            {series?.seasons && <Seasons seasons={series.seasons} />}

            {/* Credits Section */}
            <section className="flex flex-col space-y-6">
              {series?.aggregate_credits.cast && (
                <CreditsRow
                  mediaType="tv"
                  credits={series.aggregate_credits.cast}
                  job="cast"
                />
              )}
              {series?.credits.crew && (
                <CreditsRow
                  mediaType="tv"
                  credits={series.credits.crew}
                  job="crew"
                />
              )}
            </section>
          </div>

          {/* Right content */}
          <div className="flex flex-col gap-y-16 md:col-span-3">
            {/* Facts section */}
            <section className="flex flex-col space-y-2 md:col-span-3 md:space-y-4">
              <h2>Facts</h2>
              <div className="flex flex-col space-y-1 text-sm font-semibold md:text-lg">
                <p>
                  Status: <span className="font-light">{series?.status}</span>
                </p>
                <p>
                  Type: <span className="font-light">{series?.type}</span>
                </p>
                <p>
                  Network:{' '}
                  <span className="font-light">
                    {series?.networks &&
                      series.networks.map((network) => network.name).join(', ')}
                  </span>
                </p>
                <p>
                  Original Language:{' '}
                  <span className="font-light">
                    {series?.original_language}
                  </span>
                </p>
                <p>
                  Origin Country:{' '}
                  <span className="font-light">
                    {series?.origin_country &&
                      series.origin_country
                        .map((country) => country)
                        .join(', ')}
                  </span>
                </p>
              </div>
            </section>

            {/* Episodes Section */}
            <section className="flex flex-col gap-y-12 md:col-start-6 md:col-span-3">
              {series?.last_episode_to_air && (
                <Episode
                  title="Latest Episode"
                  episode={series.last_episode_to_air}
                />
              )}
              {series?.next_episode_to_air && (
                <Episode
                  title="Next Episode"
                  episode={series.next_episode_to_air}
                />
              )}
            </section>

            {/* Production section */}
            <div className="flex flex-col space-y-2 text-sm font-semibold md:col-span-8">
              <div>
                <p>Production companies:</p>
                <p className="text-[gray]">
                  {series?.production_companies &&
                    series.production_companies
                      .map((production) => production.name)
                      .join(', ')}
                </p>
              </div>
              <div>
                <p>Production countries:</p>
                <p className="text-[gray]">
                  {series?.production_countries &&
                    series.production_countries
                      .map((country) => country.iso_3166_1)
                      .join(', ')}
                </p>
              </div>
            </div>
          </div>

          {/* Reccomendations section */}
          {series?.recommendations && (
            <section className="md:col-span-8">
              <Row
                title="Reccomendations"
                items={series.recommendations.results}
                media_type="tv"
              />
            </section>
          )}
        </div>
      </main>

      {showModal && <Modal />}
    </div>
  );
}

export default Tv;
