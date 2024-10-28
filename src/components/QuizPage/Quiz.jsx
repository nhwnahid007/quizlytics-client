import { Clock } from "lucide-react";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { flushSync } from "react-dom";
import { GrRadialSelected } from "react-icons/gr";

const Quiz = ({ question, currentQuestion, totalQuestion, setAnswer }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [seconds, setSeconds] = useState(15);
  const selectedOptionRef = useRef(null);
  const timer = useRef(null);

  const handleGoToNextQuiz = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    flushSync(() => {
      setAnswer(selectedOptionRef.current);
    });

    setSelectedOption(null);
  }, [setAnswer]);

  useEffect(() => {
    const duration = 30 * 1000;
    const stepTime = 1000;
    const steps = duration / stepTime;
    const decrement = 100 / steps;

    let stepCount = 0;
    setSeconds(30); // Reset seconds to 30 at the start of each question

    const updateProgressBar = () => {
      stepCount++;
      const totalSeconds = Math.max(30 - stepCount, 0);
      setSeconds(totalSeconds);

      if (stepCount < steps) {
        timer.current = setTimeout(updateProgressBar, stepTime);
      } else {
        handleGoToNextQuiz();
      }
    };

    // Start the progress bar only when a new question is loaded
    if (question) {
      timer.current = setTimeout(updateProgressBar, stepTime);
    }

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [question, handleGoToNextQuiz]);

  const handleOptionClick = (index) => {
    setSelectedOption(index);
  };

  const radius = 30; // Reduced the radius to make the circle smaller
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (seconds / 30) * circumference;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-2 sm:p-4">
      <div className="w-full max-w-xl bg-white p-6 shadow-lg rounded-lg flex flex-col min-h-[500px] max-h-[80vh] overflow-auto">
        <div className="text-center flex justify-center items-center mb-4 gap-1 text-sm sm:text-base">
          <svg width="100" height="100">
            <circle
              cx="50" // Adjusted the center position
              cy="50" // Adjusted the center position
              r={radius}
              stroke="#d6d6d6"
              strokeWidth="10"
              fill="transparent"
            />
            <circle
              cx="50" // Adjusted the center position
              cy="50" // Adjusted the center position
              r={radius}
              className="stroke-secondary-color" // Use Tailwind class for secondary color
              strokeWidth="10"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{ transition: 'stroke-dashoffset 1s linear' }}
            />
            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              className="fill-primary-color font-bold" // Use Tailwind class for primary color and bold text
              fontSize="16px"
            >
              {seconds} S
            </text>
          </svg>
        </div>

        <div className="flex flex-col flex-grow">
          <h1 className="text-center text-sm sm:text-base md:text-lg font-light mb-4">
            Question <span className="font-medium">{currentQuestion}</span> of{" "}
            <span className="font-medium">{totalQuestion}</span>
          </h1>

          <div className="mb-4">
            <h2 className="text-justify font-semibold text-base sm:text-lg md:text-xl text-black">
              {question?.question}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {question?.options.map((item, index) => (
              <div
                key={index}
                className={`flex items-center p-3 rounded-lg cursor-pointer transition duration-200 ${
                  index === selectedOption
                    ? "bg-secondary-color text-black border-2 border-primary-color"
                    : "bg-white text-black border-2 border-gray-300 hover:bg-gray-100"
                }`}
                onClick={() => handleOptionClick(index)}
              >
                <GrRadialSelected className="mr-2 text-lg sm:text-xl md:text-2xl flex-shrink-0" />
                <span className="text-sm sm:text-base md:text-lg leading-tight">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-4 flex justify-end">
          <button
            className={`btn flex-1 py-2 text-sm sm:text-base rounded-lg transition duration-200 bg-purple-400 text-white ${
              selectedOption === null
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-primary-color"
            }`}
            onClick={handleGoToNextQuiz}
            disabled={selectedOption === null}
          >
            Next Question
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
