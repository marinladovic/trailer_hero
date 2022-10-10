import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Header from '../../components/shared/Header';
import SearchResult from '../../components/shared/SearchResult';
import { SearchResult as Result } from '../../typings';

function SearchResults() {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const { slug } = useRouter().query;
  const [searchResults, setSearchResults] = useState<Result[]>([]);
  const [personResults, setPersonResults] = useState<Result[]>([]);
  const [movieResults, setMovieResults] = useState<Result[]>([]);
  const [tvResults, setTvResults] = useState<Result[]>([]);

  useEffect(() => {
    if (slug) {
      const fetchSearchResults = async () => {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=${slug}&page=1&include_adult=false`
        );
        const data = await res.json();

        if (data.results !== null) {
          setSearchResults(data.results);
          setPersonResults(
            data.results.filter(
              (result: Result) => result.media_type === 'person'
            )
          );
          setMovieResults(
            data.results.filter(
              (result: Result) => result.media_type === 'movie'
            )
          );
          setTvResults(
            data.results.filter((result: Result) => result.media_type === 'tv')
          );
        }
      };
      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [slug]);

  return (
    <div className="w-full realtive cursor-pointer">
      <Header />
      <section className="w-full max-w-7xl mx-auto px-4 py-24 flex flex-col">
        <h2 className="mb-6">
          {!SearchResults ? 'No Results' : 'Search Results'}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-y-6 mb-16">
          <h3 className="col-span-2 md:col-span-4 lg:col-span-6">People</h3>
          {personResults &&
            personResults.map((person) => (
              <SearchResult key={person.id} title="People" result={person} />
            ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-y-6 mb-16">
          <h3 className="col-span-2 md:col-span-4 lg:col-span-6">Movies</h3>
          {movieResults &&
            movieResults.map((movie) => (
              <SearchResult key={movie.id} title="Movies" result={movie} />
            ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-y-6 mb-16">
          <h3 className="col-span-2 md:col-span-4 lg:col-span-6">TV Shows</h3>
          {tvResults &&
            tvResults.map((show) => (
              <SearchResult key={show.id} title="TV Show" result={show} />
            ))}
        </div>
      </section>
    </div>
  );
}

export default SearchResults;
