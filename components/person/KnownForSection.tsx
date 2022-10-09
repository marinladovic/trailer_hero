import Link from 'next/link';
import { PersonalCredit } from '../../typings';
import { formatYear } from '../../utils/dateFormater';

interface Props {
  role: string;
  credits: PersonalCredit[];
}

function KnownForSection({ credits, role }: Props) {
  credits.sort((a, b) =>
    (a.release_date || a.first_air_date || a.id) >
    (b.release_date || b.first_air_date || b.id)
      ? -1
      : 1
  );

  return (
    <div className="space-y-4 px-4">
      <h2>As {role} member</h2>
      <div className="flex flex-col divide-y divide-[gray]">
        {credits.map((credit) => (
          <div className="flex p-2 space-x-4 items-center">
            <p className="text-xs md:text-sm lg:text-base text-[gray]">
              {formatYear(credit.first_air_date || credit.release_date)}
            </p>
            <p className="flex-1 text-xs md:text-sm lg:text-base">
              <Link href={`/${credit.media_type}/${credit.id}`}>
                {credit.name || credit.title}
              </Link>
            </p>
            <p className="flex-1 capitalize text-[gray] text-xs md:text-sm lg:text-base">
              {credit.media_type}
            </p>
            <p className="flex-1 text-xs md:text-sm lg:text-base">
              <span className="text-[gray]">As</span>{' '}
              {credit.character || credit.job}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default KnownForSection;
