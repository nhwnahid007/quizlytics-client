import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { AlignJustify } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MobileNav = () => {
  const pathname = usePathname(); // Hook to get current route

  return (
    <div className='md:hidden'>
      {/* Sheet component for mobile navigation */}
      <Sheet>
        {/* Icon to trigger the Sheet (side menu) */}
        <SheetTrigger>
          <AlignJustify className='h-5 w-5' />
        </SheetTrigger>

        {/* Content inside the Sheet */}
        <SheetContent side='left'>
          {/* Navigation links in the mobile menu */}
          <nav className='flex flex-col gap-3 mt-6'>
            <Link
              href='/'
              className={`py-2 ${
                pathname === '/' ? 'text-pink-500 font-bold' : 'text-black'
              }`}
            >
              Home
            </Link>

            <Link
              href='/blogs'
              className={`py-2 ${
                pathname === '/blogs' ? 'text-pink-500 font-bold' : 'text-black'
              }`}
            >
              Blogs
            </Link>

            <Link
              href='/about'
              className={`py-2 ${
                pathname === '/about' ? 'text-pink-500 font-bold' : 'text-black'
              }`}
            >
              About
            </Link>

            <Link
              href='/contact'
              className={`py-2 ${
                pathname === '/contact' ? 'text-pink-500 font-bold' : 'text-black'
              }`}
            >
              Contact
            </Link>

            <Link
              href='/team'
              className={`py-2 ${
                pathname === '/team' ? 'text-pink-500 font-bold' : 'text-black'
              }`}
            >
              Our Team
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
