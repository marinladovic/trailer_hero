import Image from 'next/image';
import { useRouter } from 'next/router';
import { SearchResult } from '../../typings';

interface Props {
  title: string;
  result: SearchResult;
}

function SearchResult({ title, result }: Props) {
  const router = useRouter();

  return (
    <div
      className="flex flex-col space-y-1 items-center w-[8rem] rounded-md overflow-hidden mx-auto"
      onClick={() => router.push(`/${result.media_type}/${result.id}`)}
    >
      <Image
        src={
          `https://image.tmdb.org/t/p/w500${
            result.media_type === 'person'
              ? result.profile_path
              : result.poster_path || result.backdrop_path
          }` || '/assets/placeholder_poster.jpg'
        }
        alt={`${result.name || result.title}`}
        width={500}
        height={750}
        unoptimized
        className="object-cover"
      />
      <p>{result.name || result.title}</p>
    </div>
  );
}

export default SearchResult;
