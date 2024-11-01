"use client";

import useRouterHook from "@/app/hooks/useRouterHook";
import React, { useEffect, useState } from "react";
import SectionTitle, { SectionTitleMinimal } from "../Shared/SectionTitle";
import Image from "next/image";
import Marquee from "react-fast-marquee";

// Create a MarqueeItem component
const MarqueeItem = () => (
  <div className="flex items-center">
    <Image
      src="/images/trust-badge-1.png" // Replace with your badge images
      alt="Trust Badge" 
      width={100}
      height={100}
      className="h-16 w-auto mx-4"
    />
  </div>
);

const Banner = () => {
  const router = useRouterHook();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleQuicktExam = () => {
    router.push("/quickExam");
  };

  const handleCustomExam = () => {
    router.push("/customQuiz");
  };

  const handleQuizByLink = () => {
    router.push("/quizByLink");
  };

  if (!isMounted) {
    return null; // or a loading skeleton
  }

  return (
    <div className="relative min-h-screen lg:h-[90vh] text-black bg-gradient-to-br from-purple-50 to-white">
      {/* Floating UI Elements Background */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute -left-10 top-20 w-40 h-40 bg-neutral-200 rounded-lg transform rotate-12 animate-float"></div>
        <div className="absolute right-20 top-40 w-32 h-32 bg-blue-200 rounded-lg transform -rotate-12 animate-float-delayed"></div>
        <div className="absolute left-1/3 bottom-40 w-36 h-36 bg-primary-color bg-opacity-25 rounded-lg transform rotate-45 animate-float"></div>
        
        {/* New Floating Elements */}
        <div className="absolute right-1/4 top-20 w-24 h-24 bg-purple-200 rounded-full transform animate-float-delayed"></div>
        <div className="absolute left-1/4 top-1/3 w-28 h-28 bg-pink-200 rounded-lg transform rotate-24 animate-float"></div>
        <div className="absolute right-1/3 bottom-1/4 w-20 h-20 bg-yellow-200 rounded-full transform animate-float-delayed"></div>
        <div className="absolute left-10 bottom-1/3 w-16 h-16 bg-green-200 rounded-lg transform -rotate-12 animate-float"></div>
        <div className="absolute right-10 bottom-20 w-32 h-32 bg-blue-100 rounded-full transform animate-float-delayed"></div>
      </div>

      {/* Main Content */}
      <div className="absolute inset-0 pt-7 md:pt-10">
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-6xl text-center">
            {/* Intro Section */}
            <div className="md:mb-4 pt-5 sm:mb-8">
              <SectionTitleMinimal heading="Master Any Topic Through Interactive Quizzes" />
            </div>

            {/* Description Box */}
            <div className="p-2 sm:p-6 mb-4 sm:mb-5">
              <p className="text-[#555555] font-semibold text-sm">
                Elevate your learning experience with our dynamic quiz platform! Choose custom quizzes, or generate AI-powered questions from anything, including any article link. Perfect for students, professionals, and lifelong learners seeking to test and expand their knowledge.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 lg:gap-6">
              <button
                onClick={handleQuicktExam}
                className="w-[200px] px-4 sm:px-6 py-3 rounded-xl font-bold text-white bg-purple-600 hover:bg-transparent hover:text-purple-600 border-2 border-purple-600 transition-all duration-300 text-sm sm:text-base"
              >
                Ai Generated Quiz
              </button>
              <button
                onClick={handleCustomExam}
                className="w-[200px] px-4 sm:px-6 py-3 rounded-xl font-bold text-secondary-color bg-gray-200 hover:bg-transparent hover:text-gray-600 border-2 border-gray-200 transition-all duration-300 text-sm sm:text-base"
              >
                Custom Quiz
              </button>
              <button
                onClick={handleQuizByLink}
                className="w-[200px] px-4 sm:px-6 py-3 rounded-xl font-bold text-white bg-purple-600 hover:bg-transparent hover:text-purple-600 border-2 border-purple-600 transition-all duration-300 text-sm sm:text-base"
              >
                Quiz from Article
              </button>
            </div>

            {/* Trust Badges Marquee Section */}
            <div className="mt-8 sm:mt-12">
              <Marquee
                gradient={false}
                speed={40}
                pauseOnHover={true}
                className="py-2 md:py-4"
              >
                <Image
                  src="/images/badge1.png"
                  alt="Trust Badge"
                  width={100}
                  height={100}
                  className="h-16 w-auto mx-4"
                />
                <Image
                  src="/images/badge2.png"
                  alt="Trust Badge"
                  width={100}
                  height={100}
                  className="h-16 w-auto mx-4"
                />
                <Image
                  src="/images/badge3.png"
                  alt="Trust Badge"
                  width={100}
                  height={100}
                  className="h-16 w-auto mx-4"
                />
                {/* Add more badges as needed */}
              </Marquee>

              {/* Trust Text */}
              <div className="text-center mt-4">
                <p className="text-sm sm:text-lg">
                  <span>Trusted by teachers in </span>
                  <span className="text-purple-600">90% of U.S. Schools</span>
                  <span> and </span>
                  <span className="text-purple-600">150+ countries</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
};

export default Banner;