import Head from 'next/head';
import Header from '../components/shared/Header';
import Thumbnail from '../components/shared/Thumbnail';
import useAuth from '../hooks/useAuth';
import useList from '../hooks/useList';
import { MediaItem } from '../typings';

function MyList() {
  const { user } = useAuth();
  const list = useList(user?.uid);

  return (
    <div className={`relative min-h-screen bg-gradient-to-b`}>
      <Head>
        <title>TrailerHero | What to Watch Next</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header />
      <main className="w-full max-w-7xl mx-auto py-24 flex flex-col px-4 md:px-16">
        {!user ? (
          <div>
            <h2>Please Log In or Sign Up to create a watchlist.</h2>
            <h3>
              Add Movies and TV Shows to your watchlist and view them here.
            </h3>
          </div>
        ) : list.length < 1 ? (
          <div>
            <h2>Your List Is Empty</h2>
            <h3>
              Add Movies and TV Shows to your watchlist and view them here.
            </h3>
          </div>
        ) : (
          <section className="flex flex-col space-y-6 mt-8">
            <h2>Your Watchlist</h2>
            <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-16 xl:grid-cols-5">
              {list.map((item) => (
                <div key={item.id} className="mx-auto">
                  <Thumbnail item={item as MediaItem} />
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default MyList;
