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
      className="relative min-h-screen lg:h-[90vh] bg-cover bg-right bg-no-repeat text-black"
      style={{
        backgroundImage: `url('https://i.ibb.co/W3FdMRj/quizlyticsbanner.png')`,
        backgroundColor: "#f3f4f6",
        backgroundSize: "cover", // Ensures the background image covers the entire area
        backgroundPosition: "center", // Centers the background image
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute pt-2 md:pt-10 lg:pt-20 inset-0 bg-gradient-to-r from-white/70 to-[#f0f4ff]/80">
        <div className="relative z-10 flex flex-col lg:flex-row justify-between gap-8 px-8 md:px-20 pt-20">
          <div className="w-full lg:w-[70%] md:pr-32">
            <div className="w-full md:w-[683px]">
              <h1 className="text-3xl md:text-5xl font-bold text-[#333333] mb-4 md:pr-20">
                <Typewriter
                options={{
                  strings:"Challenge Your Mind with Fun Quizzes",
                  autoStart:true,
                  loop:true
                }}
                
                ></Typewriter>
                {/* Challenge Your Mind with Fun Quizzes */}
              </h1>
              <p className="text-[#555555] bg-[#FCFAF9] bg-opacity-50">
                Explore a wide range of engaging and interactive quizzes
                designed to test your knowledge across various topics. Track
                your progress, compete with friends, and see how you rank on
                leaderboards. From general knowledge to niche subjects, there is
                a quiz for everyone. Dive in and discover how much you really
                know!
              </p>
              <div className="flex gap-4 mt-8">
                <button
                  onClick={handleQuicktExam}
                  className="px-6 md:px-12 py-4 rounded-xl font-bold border-2 text-white bg-primary-color hover:bg-transparent hover:text-primary-color transition-colors duration-300 border-gradient"
                >
                  Quick Exam
                </button>
                <button
                  onClick={handleCustomExam}
                  className="px-6 md:px-12 py-4 rounded-xl font-bold border-2 text-white bg-secondary-color hover:bg-transparent hover:text-secondary-color transition-colors duration-300 border-gradient"
                >
                  Custom Exam
                </button>
                <button
                  onClick={handleQuizByLink}
                  className="px-6 md:px-12 py-4 rounded-xl font-bold border-2 text-white bg-primary-color hover:bg-transparent hover:text-primary-color transition-colors duration-300 border-gradient"
                >
                  Test on Article
                </button>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[30%] flex lg:justify-center items-center">
            <div className="grid grid-cols-2 gap-4">
              {/* Image 1 */}
              <div className="relative w-[140px] h-[130px] bg-[#dcdcdc] text-black flex justify-center items-center rounded-2xl pulse flip">
                <Image
                  src={"https://i.ibb.co/ZXGbZfZ/blackboard-5745341.png"}
                  alt="icons"
                  layout="fill"
                  objectFit="cover"
                  className="p-6"
                />
              </div>
              {/* Image 2 */}
              <div className="relative w-[140px] h-[130px] bg-[#ffefd3] text-black flex justify-center items-center rounded-2xl pulse flip">
                <Image
                  src={"https://i.ibb.co/ZdG5wcN/engineering-5745406.png"}
                  alt="icons"
                  layout="fill"
                  objectFit="cover"
                  className="p-6"
                />
              </div>
              {/* Image 3 */}
              <div className="relative w-[140px] h-[130px] bg-[#ffefd3] text-black flex justify-center items-center rounded-2xl pulse flip">
                <Image
                  src={"https://i.ibb.co/wRrFH2y/magnifing-glass-12337176.png"}
                  alt="icons"
                  layout="fill"
                  objectFit="cover"
                  className="p-6"
                />
              </div>
              {/* Image 4 */}
              <div className="relative w-[140px] h-[130px] bg-[#dcdcdc] text-black flex justify-center items-center rounded-2xl pulse flip">
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
