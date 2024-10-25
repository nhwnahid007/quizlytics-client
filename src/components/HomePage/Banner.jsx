"use client";
import useRouterHook from "@/app/hooks/useRouterHook";
import Image from "next/image";
import React from "react";
import Typewriter from 'typewriter-effect'

const Banner = () => {
  const router = useRouterHook();

  const handleQuicktExam = () => {
    router.push("/quickExam");
  };

  const handleCustomExam = () => {
    router.push("/customQuiz");
  };

  const handleQuizByLink = () => {
    router.push("/quizByLink");
  };

  return (
    <div
      className="relative min-h-screen  lg:h-[90vh] bg-cover bg-right bg-no-repeat text-black"
      style={{
        backgroundImage: `url('https://i.ibb.co.com/5KnXW7M/Untitled-design.png')`,
        backgroundColor: "#f3f4f6",
        backgroundSize: "cover", // Ensures the background image covers the entire area
        backgroundPosition: "center", // Centers the background image
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute pt-2  lg:pt-20 inset-0 bg-gradient-to-r from-white/70 to-[#f0f4ff]/80">
        <div className="relative z-10 flex flex-col lg:flex-row justify-between gap-8 px-8 lg:px-20 pt-16">
          <div className="w-full lg:w-[70%] md:pr-32">
            <div className="w-full md:pl-5 md:w-[683px]">
              <h1 className="  md:text-3xl   lg:text-5xl font-bold text-[#333333] mb-5 lg:mb-14 md:h-7 lg:h-12">
                <Typewriter
                options={{
                  strings:"Challenge Your Mind with Fun Quizzes",
                  autoStart:true,
                  loop:true
                }}
                
                ></Typewriter>
                {/* Challenge Your Mind with Fun Quizzes */}
              </h1>
              <p className="text-[#555555]  lg:font-semibold p-2  lg:pt-5 rounded-sm bg-[#FCFAF9] bg-opacity-20">
              Explore our interactive quiz platform to test your knowledge on diverse topics! Track your progress, compete with others, and climb the leaderboards. Join now and discover what you really know!
              </p>
              <div className="flex flex-col md:justify-center md:mt-5 md:flex-row lg:flex-row mt-4 gap-3 md:gap-5 lg:gap-4  lg:mt-8">
                <button
                  onClick={handleQuicktExam}
                  className="px-6 md:px-14 py-2 md:py-4 lg:py-4 rounded-xl font-bold border-2 text-white bg-primary-color hover:bg-transparent hover:text-primary-color transition-colors duration-300 border-gradient"
                >
                  Quick Exam
                </button>
                <button
                  onClick={handleCustomExam}
                  className="px-6 md:px-12 py-2 md:py-4 lg:py-4 rounded-xl font-bold border-2 text-white bg-secondary-color hover:bg-transparent hover:text-secondary-color transition-colors duration-300 border-gradient"
                >
                  Custom Exam
                </button>
                <button
                  onClick={handleQuizByLink}
                  className="px-6 md:px-12 py-2 md:py-4  lg:py-4 rounded-xl font-bold border-2 text-white bg-primary-color hover:bg-transparent hover:text-primary-color transition-colors duration-300 border-gradient"
                >
                  Test on Article
                </button>
              </div>
            </div>
          </div>
          <div className="w-full  lg:mt:0 md:mt-0 lg:w-[30%] flex justify-center items-center">
            <div className="grid grid-cols-2 lg:grid-cols-2 md:grid-cols-4 gap-10 md:gap-10">
              {/* Image 1 */}
              <div className="relative w-[125px] h-[80px] md:w-[131px] md:h-[110px] lg:w-[140px] lg:h-[130px] bg-secondary-color bg-opacity-60 text-black flex justify-center items-center rounded-2xl pulse flip">
                <Image
                  src={"https://i.ibb.co/ZXGbZfZ/blackboard-5745341.png"}
                  alt="icons"
                  layout="fill"
                  objectFit="cover"
                  className="p-6"
                />
              </div>
              {/* Image 2 */}
              <div className="relative w-[125px] h-[80px] md:w-[131px] md:h-[110px] lg:w-[140px] lg:h-[130px] bg-primary-color bg-opacity-60 text-black flex justify-center items-center rounded-2xl pulse flip">
                <Image
                  src={"https://i.ibb.co/ZdG5wcN/engineering-5745406.png"}
                  alt="icons"
                  layout="fill"
                  objectFit="cover"
                  className="p-6"
                />
              </div>
              {/* Image 3 */}
              <div className="relative w-[125px] h-[80px] md:w-[131px] md:h-[110px] lg:w-[140px] lg:h-[130px] bg-primary-color bg-opacity-60 text-black flex justify-center items-center rounded-2xl pulse flip">
                <Image
                  src={"https://i.ibb.co/wRrFH2y/magnifing-glass-12337176.png"}
                  alt="icons"
                  layout="fill"
                  objectFit="cover"
                  className="p-6"
                />
              </div>
              {/* Image 4 */}
              <div className="relative w-[125px] h-[80px] md:w-[131px] md:h-[110px] lg:w-[140px] lg:h-[130px] bg-secondary-color bg-opacity-60 text-black flex justify-center items-center rounded-2xl pulse flip">
                <Image
                  src={"https://i.ibb.co/C0g5gtj/analytics-5745493.png"}
                  alt="icons"
                  layout="fill"
                  objectFit="cover"
                  className="p-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inline CSS for Animation */}
      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }

        .pulse {
          animation: pulse 3s infinite;
        }

        .flip {
          transform: scaleX(-1);
        }

        @keyframes gradient-border {
          0% {
            border-color: #ff7e5f;
          }
          50% {
            border-color: #feb47b;
          }
          100% {
            border-color: #ff7e5f;
          }
        }

        .border-gradient {
          animation: gradient-border 3s infinite;
        }
      `}</style>
    </div>
  );
};

export default Banner;
