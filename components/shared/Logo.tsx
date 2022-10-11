import Link from 'next/link';

function Logo() {
  return (
    <Link href="/">
      <a>
        <h4 className="text-xl md:text-2xl font-semibold text-shadow-lg cursor-pointer">
          Trailer<span className="text-[#FE4A49]">Hero</span>
        </h4>
      </a>
    </Link>
  );
}

export default Logo;
