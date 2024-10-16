import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { AlignJustify } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MobileNav = () => {
  const pathname = usePathname(); // Hook to get current route

  return (
    <div className='lg:hidden'>
      {/* Sheet component for mobile navigation */}
      <Sheet>
        {/* Icon to trigger the Sheet (side menu) */}
        <SheetTrigger>
          <AlignJustify className='h-10 mt-1 w-10 md:h-12 md:w-12 my-auto text-primary-color' />
        </SheetTrigger>

        {/* Content inside the Sheet */}
        <SheetContent side='left'>
          {/* Navigation links in the mobile menu */}
          <nav className='flex flex-col gap-3 mt-6'>
            <Link
              href='/'
              className={`py-2 ${
                pathname === '/' ? 'text-primary-color font-bold' : 'text-secondary-color'
              }`}
            >
              Home
            </Link>

            <Link
              href='/blogs'
              className={`py-2 ${
                pathname === '/blogs' ? 'text-primary-color font-bold' : 'text-secondary-color'
              }`}
            >
              Blogs
            </Link>

            <Link
              href='/about'
              className={`py-2 ${
                pathname === '/about' ? 'text-primary-color font-bold' : 'text-secondary-color'
              }`}
            >
              About
            </Link>

            <Link
              href='/contact'
              className={`py-2 ${
                pathname === '/contact' ? 'text-primary-color font-bold' : 'text-secondary-color'
              }`}
            >
              Contact
            </Link>

            <Link
              href='/team'
              className={`py-2 ${
                pathname === '/team' ? 'text-primary-color font-bold' : 'text-secondary-color'
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
