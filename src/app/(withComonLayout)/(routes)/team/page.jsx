import Image from "next/image";
import React from "react";
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const ServicesPage = () => {
  return (
    <div className="">
      <section className="relative bg-gray-100 py-10 ">
        <div className="container px-6   mx-auto">
          <h2 className="text-2xl my-8 font-semibold text-center text-black capitalize lg:text-5xl  ">
            Our Team
          </h2>

          <div className="grid gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-3 justify-center">
            {/* Team Member 1 */}
            <div className=" max-w-xs text-center mx-auto relative">
              <div className="relative group">
                <Image
                  className="object-cover object-center w-[250px] h-[250px] mx-auto rounded-full"
                  src="https://i.ibb.co.com/Gp2pbHR/304944883-193506636368131-6096839391558381294-n.jpg" 
                  alt="Nahid"
                  width={300}
                  height={300}
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex space-x-4 pt-10">
                    <a href=" https://github.com/nhwnahid007" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                      <FaGithub size={24} />
                    </a>
                    <a href="https://www.linkedin.com/in/nhwnahid" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                      <FaLinkedin size={24} />
                    </a>
                    <a href=" https://www.facebook.com/nhwnahid" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                      <FaFacebook size={24} />
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <h3 className="text-lg font-medium text-[#ff0000]">Md. Nahidul Islam</h3>
                <span className="mt-1 font-medium  dark:text-gray-300">Team Leader</span>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="max-w-xs text-center mx-auto relative">
              <div className="relative group">
                <Image
                  className="object-cover object-center w-[250px] h-[250px] mx-auto rounded-full"
                  src="https://i.ibb.co.com/g95Gd68/photo-2024-07-06-13-14-23.jpg"
                  alt="Musa Akram Saleh"
                  width={300}
                  height={300}
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex space-x-4 pt-10">
                    <a
                      href="https://github.com/musaakramsaleh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white"
                    >
                      <FaGithub size={24} />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/musa-akram-saleh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white"
                    >
                      <FaLinkedin size={24} />
                    </a>
                    <a
                      href="https://www.facebook.com/profile.php?id=100050096121271"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white"
                    >
                      <FaFacebook size={24} />
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <h3 className="text-lg font-medium text-[#ff0000]">
                  Musa Akram Saleh
                </h3>
                <span className="mt-1 font-medium  dark:text-gray-300">
                  Team Member
                </span>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="max-w-xs text-center mx-auto relative">
              <div className="relative group">
                <Image
                  className="object-cover object-center w-[250px] h-[250px] mx-auto rounded-full"
                  src="https://i.ibb.co.com/0Bfm4Wh/rzb4.jpg"
                  alt="Rafiul"
                  width={300}
                  height={300}
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex space-x-4 pt-10">
                    <a
                      href="https://github.com/rafiul-razib"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white"
                    >
                      <FaGithub size={24} />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/rafiul-habib"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white"
                    >
                      <FaLinkedin size={24} />
                    </a>
                    <a
                      href="https://www.facebook.com/rafiul.razib?_rdc=1&_rdr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white"
                    >
                      <FaFacebook size={24} />
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <h3 className="text-lg font-medium text-[#ff0000]">
                  Rafiul Habib Razib
                </h3>
                <span className="mt-1 font-medium dark:text-gray-300">
                  Team Member
                </span>
              </div>
            </div>
            {/* Team Member 4 */}
            <div className="max-w-xs text-center mx-auto relative">
              <div className="relative group">
                <Image
                  className="object-cover object-center w-[250px] h-[250px] mx-auto rounded-full"
                  src="https://i.ibb.co.com/1RSt7QY/Sa-Rana02.jpg"
                  alt="Sayed Rana"
                  width={300}
                  height={300}
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex space-x-4 pt-10">
                    <a
                      href="https://github.com/msahrana"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white"
                    >
                      <FaGithub size={24} />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/md-sayed-anower-hossain"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white"
                    >
                      <FaLinkedin size={24} />
                    </a>
                    <a
                      href="https://www.facebook.com/msahrana"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white"
                    >
                      <FaFacebook size={24} />
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <h3 className="text-lg font-medium text-[#ff0000]">
                  Sayed Rana
                </h3>
                <span className="mt-1 font-medium  dark:text-gray-300">
                  Team Member
                </span>
              </div>
            </div>

            {/* Team Member 5 */}
            <div className="max-w-xs text-center mx-auto relative">
              <div className="relative group">
                <Image
                  className="object-cover object-center w-[250px] h-[250px] mx-auto rounded-full"
                  src="https://i.ibb.co.com/4JJjNS4/profile.png"
                  alt="Tanvir"
                  width={300}
                  height={300}
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex space-x-4 pt-10">
                    <a
                      href="https://github.com/nahid"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white"
                    >
                      <FaGithub size={24} />
                    </a>
                    <a
                      href="https://linkedin.com/in/nahid"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white"
                    >
                      <FaLinkedin size={24} />
                    </a>
                    <a
                      href="https://twitter.com/nahid"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white"
                    >
                      <FaFacebook size={24} />
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <h3 className="text-lg font-medium text-[#ff0000]">
                  Tanvir Rahman Saim
                </h3>
                <span className="mt-1 font-medium  dark:text-gray-300">
                  Team Member
                </span>
              </div>
            </div>

            {/* Team Member 6 */}
            <div className="max-w-xs text-center mx-auto relative">
              <div className="relative group">
                <Image
                  className="object-cover object-center w-[250px] h-[250px] mx-auto rounded-full"
                  src="https://i.ibb.co.com/5RtZVqP/ashim.jpg"
                  alt="Ashim"
                  width={300}
                  height={300}
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex space-x-4 pt-10">
                    <a
                      href="https://github.com/ashimsarkar1512"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white"
                    >
                      <FaGithub size={24} />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/ashim-kumar-sarker-0b22432b5/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white"
                    >
                      <FaLinkedin size={24} />
                    </a>
                    <a
                      href="https://www.facebook.com/profile.php?id=100041230431676"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white"
                    >
                      <FaFacebook size={24} />
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <h3 className="text-lg font-medium text-[#ff0000]">
                  Ashim Kumar Sarker
                </h3>
                <span className="mt-1 font-medium  dark:text-gray-300">
                  Team Member
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <hr className="border-4" />
    </div>
  );
};

export default ServicesPage;
