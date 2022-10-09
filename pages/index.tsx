import Head from 'next/head';
import Header from '../components/shared/Header';
import Banner from '../components/shared/Banner';
import Row from '../components/shared/Row';
import Modal from '../components/shared/Modal';
import { MediaItem } from '../typings';
import homeRequests from '../utils/homeRequests';
import { modalState } from '../atoms/modalAtom';
import { useRecoilValue } from 'recoil';

interface Props {
  popularShows: MediaItem[];
  trending: MediaItem[];
  actionAndAdventureShows: MediaItem[];
  crimeShows: MediaItem[];
  fantasyShows: MediaItem[];
  popularMovies: MediaItem[];
  comedyMovies: MediaItem[];
  horrorMovies: MediaItem[];
  kidsShows: MediaItem[];
  politicalDramaShows: MediaItem[];
}

const Home = ({
  popularShows,
  trending,
  actionAndAdventureShows,
  crimeShows,
  fantasyShows,
  popularMovies,
  comedyMovies,
  horrorMovies,
  kidsShows,
  politicalDramaShows,
}: Props) => {
  const showModal = useRecoilValue(modalState);

  return (
    <div
      className={`relative h-screen bg-gradient-to-b lg:h-[140vh] ${
        showModal && '!h-screen overflow-hidden'
      }`}
    >
      <Head>
        <title>TrailerHero | What to Watch Next</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header />
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        <Banner trendingNow={trending} />
        <section className=" space-y-12 md:space-y-24">
          <Row
            title="Most Popular Shows Today"
            items={popularShows}
            media_type="tv"
          />
          <Row title="Trending Now" items={trending} />
          <Row
            title="Action & Adventure"
            items={actionAndAdventureShows}
            media_type="tv"
          />
          <Row title="Popular Crime Shows" items={crimeShows} media_type="tv" />
          <Row
            title="Bingeworthy Fantasy Shows"
            items={fantasyShows}
            media_type="tv"
          />
          <Row
            title="Most Popular Movies Today"
            items={popularMovies}
            media_type="movie"
          />
          <Row title="Comedy Movies" items={comedyMovies} media_type="movie" />
          <Row title="Scary Movies" items={horrorMovies} media_type="movie" />
          <Row title="Kids Shows" items={kidsShows} media_type="tv" />
          <Row
            title="War & Politics"
            items={politicalDramaShows}
            media_type="tv"
          />
        </section>
      </main>

      {showModal && <Modal />}
    </div>
  );
};

export default Home;

/** SSR - Requests */
export const getServerSideProps = async () => {
  const [
    popularShows,
    trending,
    actionAndAdventureShows,
    crimeShows,
    fantasyShows,
    popularMovies,
    comedyMovies,
    horrorMovies,
    kidsShows,
    politicalDramaShows,
  ] = await Promise.all([
    fetch(homeRequests.fetchPopularShows).then((res) => res.json()),
    fetch(homeRequests.fetchTrending).then((res) => res.json()),
    fetch(homeRequests.fetchActionAndAdventureShows).then((res) => res.json()),
    fetch(homeRequests.fetchCrimeShows).then((res) => res.json()),
    fetch(homeRequests.fetchFantasyShows).then((res) => res.json()),
    fetch(homeRequests.fetchPopularMovies).then((res) => res.json()),
    fetch(homeRequests.fetchComedyMovies).then((res) => res.json()),
    fetch(homeRequests.fetchHorrorMovies).then((res) => res.json()),
    fetch(homeRequests.fetchKidsShows).then((res) => res.json()),
    fetch(homeRequests.fetchPoliticalDramaShows).then((res) => res.json()),
  ]);

  return {
    props: {
      popularShows: popularShows.results,
      trending: trending.results,
      actionAndAdventureShows: actionAndAdventureShows.results,
      crimeShows: crimeShows.results,
      fantasyShows: fantasyShows.results,
      popularMovies: popularMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      kidsShows: kidsShows.results,
      politicalDramaShows: politicalDramaShows.results,
    },
  };
};
