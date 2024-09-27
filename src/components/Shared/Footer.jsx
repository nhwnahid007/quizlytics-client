import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div className="relative bg-[#0a0908] overflow-hidden">
            <div className="absolute -top-20 left-0 w-64 h-64 bg-yellow-400 opacity-10 rounded-full blur-3xl animate-bounce-slow"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-300 opacity-10 rounded-full blur-3xl animate-pulse"></div>

            <div className="w-[90%] md:max-w-6xl mx-auto py-6">
                <footer className="footer text-white p-10">
                    <aside className="footer-start">       
                        <Image src="https://i.ibb.co.com/5MrL0wk/quiz-3874176.png" height={50} width={50} alt="icon"></Image>
                        <p>
                            Quizlytics Ltd.
                            <br />
                            Providing reliable service since {currentYear}
                        </p>
                    </aside>

                  
                    <nav className="footer-center">
                        <h6 className="footer-title">Services</h6>
                        <a className="link link-hover transition-transform duration-200 ease-in-out hover:scale-110 hover:text-yellow-300">Branding</a>
                        <a className="link link-hover transition-transform duration-200 ease-in-out hover:scale-110 hover:text-yellow-300">Design</a>
                        <a className="link link-hover transition-transform duration-200 ease-in-out hover:scale-110 hover:text-yellow-300">Marketing</a>
                        <a className="link link-hover transition-transform duration-200 ease-in-out hover:scale-110 hover:text-yellow-300">Advertisement</a>
                    </nav>

                    <nav className="footer-center">
                        <h6 className="footer-title">Company</h6>
                        
                        <Link href={'/about'} className="link link-hover transition-transform duration-200 ease-in-out hover:scale-110 hover:text-yellow-300">About us</Link>
                        <Link href={'/contact'} className="link link-hover transition-transform duration-200 ease-in-out hover:scale-110 hover:text-yellow-300">Contact</Link>
                        <Link href={'/team'} className="link link-hover transition-transform duration-200 ease-in-out hover:scale-110 hover:text-yellow-300">Our team</Link>
                        <a className="link link-hover transition-transform duration-200 ease-in-out hover:scale-110 hover:text-yellow-300">Press kit</a>
                    </nav>

                    <nav className="footer-center">
                        <h6 className="footer-title">Legal</h6>
                        <a className="link link-hover transition-transform duration-200 ease-in-out hover:scale-110 hover:text-yellow-300">Terms of use</a>
                        <a className="link link-hover transition-transform duration-200 ease-in-out hover:scale-110 hover:text-yellow-300">Privacy policy</a>
                        <a className="link link-hover transition-transform duration-200 ease-in-out hover:scale-110 hover:text-yellow-300">Cookie policy</a>
                    </nav>

                    <div className="footer-center mt-6">
                        <h6 className="footer-title">Follow Us</h6>
                        <div className="flex space-x-6 mt-3">
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white transform hover:scale-125 hover:text-blue-500 transition-transform duration-300 ease-in-out animate-bounce">
                                <FaFacebook size={30} />
                            </a>
                            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-white transform hover:scale-125 hover:text-blue-300 transition-transform duration-300 ease-in-out animate-bounce">
                                <FaTwitter size={30} />
                            </a>
                            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white transform hover:scale-125 hover:text-blue-600 transition-transform duration-300 ease-in-out animate-bounce">
                                <FaLinkedin size={30} />
                            </a>
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white transform hover:scale-125 hover:text-pink-400 transition-transform duration-300 ease-in-out animate-bounce">
                                <FaInstagram size={30} />
                            </a>
                        </div>
                    </div>
                </footer>

                <div className="text-center text-white mt-4">
                    <p className="transition-transform duration-500 hover:scale-105">&copy; {currentYear} Quizlytics Ltd. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;
