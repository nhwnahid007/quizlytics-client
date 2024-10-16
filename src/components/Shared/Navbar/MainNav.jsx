import { usePathname } from 'next/navigation';
import Link from 'next/link';

const MainNav = () => {
  const pathname = usePathname(); // Hook to get current route

  return (
    <div className='hidden lg:flex items-center'>
      <nav className='flex items-center gap-6'>
        {/* Home Link */}
        <Link
          href='/'
          className={`flex items-center gap-2 ${
            pathname === '/' ? 'text-pink-500' : 'text-white'
          }`}
        >
          <span
            className={`${
              pathname === '/'
                ? 'w-full h-[2px] bg-pink-500 block mt-2'
                : 'w-full h-[2px] bg-transparent block mt-2'
            }`}
          />
          Home
        </Link>

        {/* Blogs Link */}
        <Link
          href='/blogs'
          className={`flex items-center gap-2 ${
            pathname === '/blogs' ? 'text-pink-500' : 'text-white'
          }`}
        >
          <span
            className={`${
              pathname === '/blogs'
                ? 'w-full h-[2px] bg-pink-500 block mt-2'
                : 'w-full h-[2px] bg-transparent block mt-2'
            }`}
          />
          Blogs
        </Link>

        {/* About Link */}
        <Link
          href='/about'
          className={`flex items-center gap-2 ${
            pathname === '/about' ? 'text-pink-500' : 'text-white'
          }`}
        >
          <span
            className={`${
              pathname === '/about'
                ? 'w-full h-[2px] bg-pink-500 block mt-2'
                : 'w-full h-[2px] bg-transparent block mt-2'
            }`}
          />
          About
        </Link>

        {/* Contact Link */}
        <Link
          href='/contact'
          className={`flex items-center gap-2 ${
            pathname === '/contact' ? 'text-pink-500' : 'text-white'
          }`}
        >
          <span
            className={`${
              pathname === '/contact'
                ? 'w-full h-[2px] bg-pink-500 block mt-2'
                : 'w-full h-[2px] bg-transparent block mt-2'
            }`}
          />
          Contact
        </Link>

        {/* Our Team Link */}
        <Link
          href='/team'
          className={`flex items-center gap-2 ${
            pathname === '/team' ? 'text-pink-500' : 'text-white'
          }`}
        >
          <span
            className={`${
              pathname === '/team'
                ? 'w-full h-[2px] bg-pink-500 block mt-2'
                : 'w-full h-[2px] bg-transparent block mt-2'
            }`}
          />
          Team
        </Link>
      </nav>
    </div>
  );
};

export default MainNav;