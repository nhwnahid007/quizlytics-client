import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Navbar1 = () => {
  const [isOpen, setIsOpen] = useState(false);

  // access next auth session
  const { data: session } = useSession();
  const name = session?.user?.name;
  const profile = session?.user?.profile;
  const image = session?.user?.image;

  return (
    <div className="w-full bg-gray-950 text-gray-100 body-font shadow-sm">
      <header className="max-w-6xl mx-auto">
        {/* :DESKTOP MENU */}
        <div className="container mx-auto flex justify-between items-center py-7 px-5">
          {/* Site logo and Name */}

          <Link href="/" className="text-4xl text-[#ff0000] font-bold">
            Quiz<span className="text-[#ffefd3]">lytics</span>
          </Link>

          {/* Navbar */}
          <nav className="hidden md:flex flex-wrap items-center justify-center text-base tracking-wide">
            <a href="/" className="mr-8 hover:text-gray-300">
              Home
            </a>
            <a href="/blogs" className="mr-8 hover:text-gray-300">
              Blogs
            </a>
            <a href="/about" className="mr-8 hover:text-gray-300">
              About
            </a>
            <a href="/contact" className="mr-8 hover:text-gray-300">
              Contact
            </a>
            <a href="/team" className="mr-8 hover:text-gray-300">
              Our Team
            </a>
          </nav>
          {/* Avatar */}
          <div className="hidden sm:inline-flex justify-end cursor-pointer">
            <div className="navbar-end flex gap-4">
              {!session ? (
                <div className="flex gap-2 md:gap-4">
                  <Link href="/login" className="btn px-2 md:px-8 bg-[#ffefd3]">
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="btn px-2 md:px-8 bg-[#ffefd3]"
                  >
                    Register
                  </Link>
                </div>
              ) : (
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost w-[64px] h-[64px] avatar"
                  >
                    <div className="w-full h-full rounded-full">
                      <Image
                        src={
                          profile ||
                          image ||
                          "https://i.ibb.co.com/ts4kH5c/istockphoto-1337144146-612x612.jpg"
                        }
                        alt="user"
                        width={64} // Explicitly set the width
                        height={64} // Explicitly set the height
                        className="rounded-full w-full h-full"
                      />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-[#ffefd3] rounded-box mt-3 w-60 p-6 relative z-20 shadow"
                  >
                    <li className="text-center text-black font-bold text-lg px-4 mb-4 leading-6">
                      {name}
                    </li>
                    <li className="bg-black text-[#ffefd3] p-2 rounded-xl mb-2">
                      <Link href="/Dashboard">My Dashboard</Link>
                    </li>
                    <li
                      className="bg-black text-[#ffefd3] px-4 py-2 rounded-xl cursor-pointer"
                      onClick={() => signOut()}
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          {/* Burger icon standard */}
          <button
            className="md:hidden rounded-md active:outline-none focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 rounded-md text-gray-300 bg-gradient-to-br from-transparent to-transparent hover:text-white hover:from-pink-500 hover:to-yellow-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* :MOBILE MENU */}
        {isOpen && (
          <div className="w-full flex flex-col py-4 px-3 md:hidden bg-gray-900 text-base uppercase text-center font-semibold">
            <a href="/" className="mr-8 hover:text-gray-300">
              Home
            </a>
            <a href="/blogs" className="mr-8 hover:text-gray-300">
              Blogs
            </a>
            <a href="/about" className="mr-8 hover:text-gray-300">
              About
            </a>
            <a href="/contact" className="mr-8 hover:text-gray-300">
              Contact
            </a>
            <a href="/team" className="mr-8 hover:text-gray-300">
              Our Team
            </a>
            <a href="/register" className="mr-8 hover:text-gray-300">
              Register
            </a>
            <a href="/login" className="mr-8 hover:text-gray-300">
              Login
            </a>
          </div>
        )}
      </header>
    </div>
  );
};

export default Navbar1;
