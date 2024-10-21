"use client";
import Image from "next/image";
import React, { useState } from "react";

const Overview = () => {
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <div className="py-14 bg-gray-100">
      <div className="w-[90%] md:max-w-6xl mx-auto">
        <h1
          className="text-4xl font-bold text-center text-semibold"
          style={{ color: "#2C2F33" }}
        >
          Activities Overview
        </h1>
        {/* Trending Topics & Question Type */}
        <div className="flex flex-col md:flex-row gap-12 mt-12">
          <div
            className="w-full md:w-[65%] bg-white bg-opacity-90 rounded-2xl p-8"
            style={{ color: "#2C2F33" }}
          >
            <h2 className="text-3xl font-bold pb-2 mb-4 text-semibold">
              Trending Topics
            </h2>
            <div className="flex gap-2 items-end overflow-x-auto">
              <div className="w-20 flex flex-col items-center">
                <div className="bg-primary-color w-14 h-[140px] rounded-xl"></div>
                <span className="text-center text-semibold">Geo</span>
              </div>
              <div className="w-20 flex flex-col items-center">
                <div className="bg-primary-color w-14 h-[180px] rounded-xl"></div>
                <span className="text-center text-semibold">Math</span>
              </div>
              <div className="w-20 flex flex-col items-center">
                <div className="bg-primary-color w-14 h-[220px] rounded-xl"></div>
                <span className="text-center text-semibold">Hist</span>
              </div>
              <div className="w-20 flex flex-col items-center">
                <div className="bg-primary-color w-14 h-[200px] rounded-xl"></div>
                <span className="text-center text-semibold">Chem</span>
              </div>
              <div className="w-20 flex flex-col items-center">
                <div className="bg-primary-color w-14 h-[160px] rounded-xl"></div>
                <span className="text-center text-semibold">Phys</span>
              </div>
              <div className="w-20 flex flex-col items-center">
                <div className="bg-primary-color w-14 h-[180px] rounded-xl"></div>
                <span className="text-center text-semibold">CSE</span>
              </div>
              <div className="w-20 flex flex-col items-center">
                <div className="bg-primary-color w-14 h-[170px] rounded-xl"></div>
                <span className="text-center text-semibold">Art</span>
              </div>
              <div className="w-20 flex flex-col items-center">
                <div className="bg-primary-color w-14 h-[210px] rounded-xl"></div>
                <span className="text-center text-semibold">Eng</span>
              </div>
            </div>
          </div>
          <div
            className="w-full md:w-[35%] bg-white bg-opacity-90 rounded-2xl p-8"
            style={{ color: "#2C2F33" }}
          >
            <h2 className="text-3xl font-bold border-b-2 border-gray-300 pb-2 mb-8 text-semibold">
              Question Type
            </h2>
            <h3 className="text-xl font-semibold text-semibold">
              What is the capital city of France?
            </h3>
            <ul className="mt-3 space-y-2">
              {["A) Berlin", "B) Madrid", "C) Paris", "D) Rome"].map((option, index) => (
                <li
                  key={index}
                  className={`flex items-center border-2 border-gray-300 py-2 px-4 rounded-xl ${
                    selectedOption === option ? "bg-[#BBF7D0]" : ""
                  }`}
                >
                  <input
                    type="radio"
                    id={`option${index}`}
                    name="question"
                    className="mr-2"
                    onChange={() => setSelectedOption(option)}
                  />
                  <label htmlFor={`option${index}`} className="text-semibold">
                    {option}
                  </label>
                </li>
              ))}
            </ul>
            <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded">
              Next Question
            </button>
          </div>
        </div>

        {/* Achievement */}
        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          <div
            className="w-full lg:w-1/2 bg-white bg-opacity-90 rounded-2xl p-8"
            style={{ color: "#2C2F33" }}
          >
            <div className="flex flex-col md:flex-row gap-8">
              <div className="relative w-[120px] h-[120px] md:w-[500px] md:h-[104px]">
                <Image
                  src={"https://i.ibb.co/S36XTTY/schedule-3652191.png"}
                  alt="achievement"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-4 text-semibold">Time</h1>
                <p>
                  In QuizApp, each quiz has a time limit, challenging users to
                  answer quickly and accurately. The timer adds excitement and
                  tests quick thinking skills. Completing quizzes within the
                  allotted time enhances decision-making skills while fostering
                  a sense of urgency and excitement.
                </p>
              </div>
            </div>
          </div>
          <div
            className="w-full lg:w-1/2 bg-white bg-opacity-90 rounded-2xl p-8"
            style={{ color: "#2C2F33" }}
          >
            <div className="flex flex-col md:flex-row gap-8">
              <div className="relative w-[120px] h-[120px] md:w-[500px] md:h-[104px]">
                <Image
                  src={"https://i.ibb.co/wWN0M1T/badge-2583264.png"}
                  alt="achievement"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-4 text-semibold">
                  Achievement
                </h1>
                <p>
                  A Quiz Win Achievement marks success in mastering quiz topics.
                  It reflects knowledge and effort, boosting confidence and
                  encouraging further engagement with quizzes. It&apos;s a
                  recognition of intellectual growth and accomplishment in the
                  quiz community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
