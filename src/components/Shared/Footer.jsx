import Image from "next/image";
import Link from "next/link";
import React from "react";
import {FaFacebook, FaTwitter, FaLinkedin, FaInstagram} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="relative bg-white overflow-hidden">
      {/* Set background to white */}
      <div className="absolute -top-15 left-0 bg-yellow-400 opacity-10 rounded-full blur-3xl animate-bounce-slow"></div>
      <div className="absolute bottom-0 right-0 bg-pink-300 opacity-10 rounded-full blur-3xl animate-pulse"></div>

      <div className="mx-auto">
        <div className="text-black p-10 bg-gray-100 shadow-lg flex flex-col md:flex-row justify-between">
          {/* Footer background set to black and text to white */}
          <div className="footer-start mb-8">
            <Image
              src="https://i.ibb.co.com/Pt6bk27/ash.jpg"
              height={50}
              width={50}
              alt="icon"
            />
            <p className="mt-2 text-black">
              Quizlytics Ltd.
              <br />
              Providing reliable service since {currentYear}
            </p>
          </div>
          <div className="flex flex-col md:flex-row md:gap-96">
            {/* <div>
              <h3 className="text-xl font-semibold mb-2 text-Black">
                Services
              </h3>
              <nav>
                <p className="block hover:text-yellow-400 transition-colors duration-300">Branding</p>
                <p className="block hover:text-yellow-400 transition-colors duration-300">Design</p>
                <p className="block hover:text-yellow-400 transition-colors duration-300">Marketing</p>
                <p className="block hover:text-yellow-400 transition-colors duration-300">Advertisement</p>
              </nav>
            </div> */}

            <div>
              <h3 className="text-xl font-semibold mb-2 text-Black">Company</h3>
              <nav>
                <Link href={"/about"}>
                  {" "}
                  <p className="block hover:text-yellow-400 transition-colors duration-300">
                    About us
                  </p>
                </Link>
                <Link href={"/contact"}>
                  {" "}
                  <p className="block hover:text-yellow-400 transition-colors duration-300">
                    Contact
                  </p>
                </Link>
                <Link href={"/team"}>
                  {" "}
                  <p className="block hover:text-yellow-400 transition-colors duration-300">
                    Our team
                  </p>
                </Link>
                {/* <p className="block hover:text-yellow-400 transition-colors duration-300">Press kit</p> */}
              </nav>
            </div>

            {/* <div>
              <h3 className="text-xl font-semibold mb-2 text-Black">Legal</h3>
              <nav>
                <p className="block hover:text-yellow-400 transition-colors duration-300">Terms of use</p>
                <p className="block hover:text-yellow-400 transition-colors duration-300">Privacy policy</p>
                <p className="block hover:text-yellow-400 transition-colors duration-300">Cookie policy</p>
              </nav>
            </div> */}

            <div className="text-center mt-6 text-Black">
              <h6>Follow Us</h6>
              <div className="flex justify-center space-x-6 mt-5">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" transform hover:scale-125 hover:text-blue-500 transition-transform duration-300 ease-in-out animate-bounce"
                >
                  <FaFacebook size={30} />
                </a>

                <a
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" transform hover:scale-125 hover:text-blue-300 transition-transform duration-300 ease-in-out animate-bounce"
                >
                  <FaTwitter size={30} />
                </a>

                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" transform hover:scale-125 hover:text-blue-600 transition-transform duration-300 ease-in-out animate-bounce"
                >
                  <FaLinkedin size={30} />
                </a>

                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" transform hover:scale-125 hover:text-pink-400 transition-transform duration-300 ease-in-out animate-bounce"
                >
                  <FaInstagram size={30} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-[#333333] py-1">
          <p className="hover:scale-105 transition-transform duration-500">
            &copy; {currentYear} Quizlytics Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
