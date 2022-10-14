import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { loadingState } from '../../atoms/loadingAtom';
import KnownForSection from '../../components/person/KnownForSection';
import Header from '../../components/shared/Header';
import { getPerson } from '../../lib/people';
import { PersonDetails } from '../../typings';
import { formatDate } from '../../utils/dateFormater';

function Person() {
  const [loading, setLoading] = useRecoilState(loadingState);
  const [person, setPerson] = useState<PersonDetails | null>(null);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchPerson = async () => {
        const res = await getPerson(+id);
        setPerson(res);
      };
      fetchPerson();
    } else {
      setPerson(null);
    }
  }, [id]);

  return (
    <div className="min-h-screen">
      <Head>
        <title>{person?.name}</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header />
      <main className="pb-24 lg:space-y-8 max-w-6xl mx-auto">
        <div className="flex flex-col w-full md:items-start space-y-6 pt-24 lg:pt-44 pb-12 px-4 md:flex-row md:px-16 md:space-y-0 md:space-x-12">
          <div className="w-2/3 md:w-[24rem] mx-auto md:mx-0">
            <Image
              src={
                `https://image.tmdb.org/t/p/w500${person?.profile_path}` ||
                'assets/avatar.png'
              }
              alt={`${person?.name} profile image`}
              width={500}
              height={750}
              unoptimized
              className="rounded-md shadow-md"
            />
          </div>
          <div className="space-y-2 lg:space-y-6 md:w-5/6">
            <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold text-shadow-md">
              {person?.name}
            </h1>
            <p className="text-sm md:text-base">{person?.biography}</p>
            <div className="flex flex-col space-y-1">
              {person?.birthday && (
                <p>
                  <span className="text-[gray]">Date of birth:</span>{' '}
                  {formatDate(person.birthday)}
                </p>
              )}
              {person?.deathday && (
                <p>
                  <span className="text-[gray]">Date of death:</span>{' '}
                  {formatDate(person.deathday)}
                </p>
              )}
              {person?.place_of_birth && (
                <p>
                  <span className="text-[gray]">Place of birth:</span>{' '}
                  {person.place_of_birth}
                </p>
              )}

              {person?.also_known_as && (
                <div className="flex space-x-2">
                  <p className="text-[gray]">Also known as:</p>
                  <ul className="text-sm">
                    {person.also_known_as &&
                      person.also_known_as.map((name) => (
                        <li key={name}>{name},</li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Known for Section */}
        <section className="space-y-12 pb-24">
          {person?.combined_credits.cast && (
            <KnownForSection
              credits={person.combined_credits.cast}
              role="cast"
            />
          )}
          {person?.combined_credits.crew && (
            <KnownForSection
              credits={person.combined_credits.crew}
              role="crew"
            />
          )}
        </section>
      </main>
    </div>
  );
}

export default Person;
