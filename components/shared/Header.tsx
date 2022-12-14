import { useEffect, useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import BasicMenu from './BasicMenu';
// import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import useAuth from '../../hooks/useAuth';
import UserMenu from './UserMenu';

function Header() {
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  /** Handle header background color on scroll */
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`${isScrolled && 'bg-[#141414]'}`}>
      <div className="flex items-center space-x-2 md:space-x-10">
        <Logo />
        <ul className="hidden space-x-4 md:flex">
          <li className="headerLink">
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li className="headerLink">
            <Link href="/movie">
              <a>Movies</a>
            </Link>
          </li>
          <li className="headerLink">
            <Link href="/tv">
              <a>TV Shows</a>
            </Link>
          </li>
          <li className="headerLink">
            <Link href="/mylist">
              <a>My List</a>
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex items-center md:space-x-4 text-sm font-light">
        {/* <MagnifyingGlassIcon className="hidden sm:inline h-6 w-6" /> */}
        {!user ? (
          <Link href="/login">
            <a className="hover:text-[#FE4A49] transition-colors duration-[.4s]">
              Sign In
            </a>
          </Link>
        ) : (
          <UserMenu />
        )}
        <BasicMenu />
      </div>
    </header>
  );
}

export default Header;
