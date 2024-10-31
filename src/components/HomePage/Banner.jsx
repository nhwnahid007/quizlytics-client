"use client";
import useRouterHook from "@/app/hooks/useRouterHook";
import Image from "next/image";
import React from "react";
import Typewriter from "typewriter-effect";

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
        backgroundImage: `url('https://i.ibb.co.com/5KnXW7M/Untitled-design.png')`,
        backgroundColor: "#f3f4f6",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute pt-2 md:pt-10 lg:pt-20 inset-0 bg-gradient-to-r from-white/70 to-[#f0f4ff]/80">
        <div className="relative z-10 flex flex-col lg:flex-row justify-between gap-8 px-4 md:px-10 lg:px-20 pt-16">
          <div className="w-full lg:w-[60%] md:pr-8 lg:pr-32">
            <div className="w-full md:w-[683px]">
              <h1 className="text-3xl md:text-5xl font-bold text-[#333333] mb-6 md:mb-14 h-12 md:pr-20">
                <Typewriter
                  options={{
                    strings: "Challenge Your Mind with Fun Quizzes",
                    autoStart: true,
                    loop: true,
                  }}
                />
              </h1>
              <p className="text-[#555555] font-semibold p-5 pt-5 rounded-xl bg-[#FCFAF9] bg-opacity-20">
                Explore our interactive quiz platform to test your knowledge on
                diverse topics! Track your progress, compete with others, and
                climb the leaderboards. Join now and discover what you really
                know!
              </p>
              <div className="flex flex-col md:justify-center md:mt-5 md:flex-row lg:flex-row mt-3 gap-3 md:gap-5 lg:gap-4 lg:mt-8">
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
                  className="px-6 md:px-12 py-2 md:py-4 lg:py-4 rounded-xl font-bold border-2 text-white bg-primary-color hover:bg-transparent hover:text-primary-color transition-colors duration-300 border-gradient"
                >
                  Test on Article
                </button>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[40%] flex justify-center items-center lg:mt-0 md:mt-0">
            <div className="continuous-rotate mb-2 w-40 h-40 md:w-96 md:h-96 lg:w-auto lg:h-auto flex justify-center items-center">
              <Image
                src="https://svgshare.com/i/1C5S.svg"
                loading="lazy"
                alt="Rotating quiz illustration"
                width={1000}
                height={1000}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Inline CSS for Animation */}
      <style jsx>{`
        @keyframes continuousRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .continuous-rotate {
          animation: continuousRotate 100s linear infinite;
          display: inline-block;
        }

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
