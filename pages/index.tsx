import Head from 'next/head';
import Header from '../components/shared/Header';
import Banner from '../components/shared/Banner';
import Row from '../components/shared/Row';
import Modal from '../components/shared/Modal';
import { MediaItem } from '../typings';
import homeRequests from '../utils/homeRequests';
import { modalState } from '../atoms/modalAtom';
import { useRecoilValue } from 'recoil';
import SearchBanner from '../components/shared/SearchBanner';

interface Props {
  popularShows: MediaItem[];
  trending: MediaItem[];
  popularMovies: MediaItem[];
}

const Home = ({ popularShows, trending, popularMovies }: Props) => {
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
      <SearchBanner />
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        <section className=" space-y-12 md:space-y-24">
          <Row title="Trending Now" items={trending} />
          <Row
            title="Most Popular Shows Today"
            items={popularShows}
            media_type="tv"
          />
          <Row
            title="Most Popular Movies Today"
            items={popularMovies}
            media_type="movie"
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
  const [popularShows, trending, popularMovies] = await Promise.all([
    fetch(homeRequests.fetchPopularShows).then((res) => res.json()),
    fetch(homeRequests.fetchTrending).then((res) => res.json()),
    fetch(homeRequests.fetchPopularMovies).then((res) => res.json()),
  ]);

  return {
    props: {
      popularShows: popularShows.results,
      trending: trending.results,
      popularMovies: popularMovies.results,
    },
  };
};
