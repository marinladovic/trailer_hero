import Image from 'next/image';
import Link from 'next/link';
import { Credit } from '../../typings';

interface Props {
  credit: Credit;
}

function CreditThumbnail({ credit }: Props) {
  return (
    <Link href={`/people/${credit.id}`}>
      <div className="flex flex-col cursor-pointer space-y-2">
        <div className="relative h-[150px] min-w-[100px] ">
          <Image
            src={
              credit.profile_path
                ? `https://image.tmdb.org/t/p/w500${credit.profile_path}`
                : '/assets/avatar.png'
            }
            alt={credit.name}
            layout="fill"
            className="rounded-sm object-cover"
          />
        </div>
        <div className="text-center">
          <p className="text-xs font-light line-clamp-1">
            {credit.name || credit.original_name}
          </p>
          <p className="text-xs font-semibold line-clamp-1">
            {credit.character || credit.job || credit.department}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default CreditThumbnail;
