import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { useState } from 'react';

function SearchBanner() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = (e: any) => {
    e.preventDefault();
    router.push(`/search/${searchTerm}`);
  };

  return (
    <section className="relative w-full mb-12">
      <div className="search-banner w-full py-40 md:py-48 lg:py-56"></div>
      <div className="absolute max-w-6xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5/6 pt-8">
        <h2 className="mb-2">Explore now</h2>
        <h3 className="leading-none mb-8">
          Millions of movies and TV shows to discover.
        </h3>
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            className="bg-[#141414] relative w-full rounded-md placeholder:font-thin placeholder:text-[gray]/60 placeholder:italic placeholder:font-xs focus:ring-2 focus:ring-[#FE4A49]/50 focus:outline-none focus:border-[#FE4A49] border-[gray] px-4 py-2"
            placeholder="Movies, TV Shows, People"
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
          />
          <MagnifyingGlassIcon
            className="w-6 h-6 absolute top-1/2 right-2 -translate-y-1/2"
            onClick={handleSearch}
          />
        </div>
      </div>
    </section>
  );
}

export default SearchBanner;
