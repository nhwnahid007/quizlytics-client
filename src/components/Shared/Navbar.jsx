import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    return (
        <div className='bg-black text-white py-2'>
            <div className="navbar max-w-6xl mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li><a>Home</a></li>
                            <li>
                                <a>Category</a>
                                <ul className="p-2">
                                    <li><a>Submenu 1</a></li>
                                    <li><a>Submenu 2</a></li>
                                </ul>
                            </li>
                            <li><a>About</a></li>
                            <li><a>Contact</a></li>
                        </ul>
                    </div>
                    <a className="text-4xl text-[#ff0000] font-bold">Quiz<span className='text-[#ffefd3]'>lytics</span></a>
                </div>
                <div className="navbar-center hidden lg:flex relative z-10">
                    <ul className="menu menu-horizontal px-1">
                        <li><a>Home</a></li>
                        <li>
                            <details>
                                <summary>Category</summary>
                                <ul className="p-2 text-black">
                                    <li><a>Submenu 1</a></li>
                                    <li><a>Submenu 2</a></li>
                                </ul>
                            </details>
                        </li>
                        <li><Link href={'/about'}>About</Link></li>
                        <li><a>Contact</a></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <a className="btn">Button</a>
                </div>
            </div>
        </div>
    );
};

export default Navbar;