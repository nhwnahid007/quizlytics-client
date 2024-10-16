"use client";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import MainNav from "./MainNav"; // Keep this for your main navigation
import MobileNav from "./MobileNav";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { data: session } = useSession();
  const name = session?.user?.name;
  const profile = session?.user?.profile;
  const image = session?.user?.image;

  return (
    <header className="py-2 bg-secondary-color text-white">
      <div className="px-2 md:px-5 lg:px-20 mx-auto flex items-center justify-around">
        <div className="block lg:hidden">
          <MobileNav />
        </div>

        {/* Brand Logo */}
        <Link href="/" className=" text-3xl items-center md:ml-5 md:text-4xl text-[#ff0000] font-bold">
          Quiz<span className="text-[#ffefd3]">lytics</span>
        </Link>

        {/* Main Navigation for larger screens */}
        <div className="hidden md:flex justify-center flex-grow">
          <MainNav />
        </div>

        {/* Profile or Login/Register */}
        <div className="relative flex items-center gap-4">
          {!session ? (
            <div className="flex gap-2">
              <Link href="/login" className="bg-[#ffefd3] rounded-md">
                <Button>Login</Button>
              </Link>
              <Link href="/register" className="bg-[#ffefd3] rounded-md">
                <Button>Register</Button>
              </Link>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center cursor-pointer">
                  {/* Smaller Profile Image */}
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={profile || image || "https://i.ibb.co/ts4kH5c/istockphoto-1337144146-612x612.jpg"}
                      alt="user"
                      width={40}
                      height={40}
                      className="rounded-full w-full h-full"
                    />
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="bg-[#ffefd3] rounded-md p-4 shadow-lg absolute right-0 mt-2 z-50 w-48"
                sideOffset={10}
              >
                <DropdownMenuLabel className="text-center font-bold text-sm truncate">
                  {name}
                </DropdownMenuLabel>
                <DropdownMenuItem className="bg-black text-[#ffefd3] p-2 rounded-md mb-2 text-center">
                  <Link href="/Dashboard">My Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="bg-black text-[#ffefd3] p-2 rounded-md text-center cursor-pointer"
                  onClick={() => signOut()}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
