import { Clock } from "lucide-react";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { flushSync } from "react-dom";
import { GrRadialSelected } from "react-icons/gr";

const Quiz = ({ question, currentQuestion, totalQuestion, setAnswer }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [remainingTime, setRemainingTime] = useState(15);
  const selectedOptionRef = useRef(null);
  const timer = useRef(null);
  const progressBar = useRef(null);

  useEffect(() => {
    selectedOptionRef.current = selectedOption;
  }, [selectedOption]);

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
    if (progressBar.current) {
      progressBar.current.value = 100;
      progressBar.current.classList.add("progress-success"); // Ensure it starts with the success class
    }

    const duration = 15 * 1000;
    const stepTime = 1000; // Update every second
    const steps = duration / stepTime;
    const decrement = 100 / steps;

    let stepCount = 0;

    const updateProgressBar = () => {
      stepCount++;
      if (progressBar.current) {
        progressBar.current.value = Math.max(100 - stepCount * decrement, 0);
        
        // Change progress bar color to red after 5 seconds
        if (stepCount === 5) {
          progressBar.current.classList.remove("progress-success");
          progressBar.current.classList.add("progress-error");
        }
      }
      setRemainingTime(Math.max(15 - stepCount, 0)); // Update remaining time
      if (stepCount < steps) {
        timer.current = setTimeout(updateProgressBar, stepTime);
      } else {
        handleGoToNextQuiz();
      }
    };

    timer.current = setTimeout(updateProgressBar, stepTime);

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [question, handleGoToNextQuiz]);

  const handleOptionClick = (index) => {
    setSelectedOption(index);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-2 sm:p-4">
      <div className="w-full max-w-3xl bg-white p-3 sm:p-4 md:p-6 shadow-2xl rounded-lg flex flex-col min-h-[400px] max-h-[90vh] overflow-auto">
        <div className="text-center flex justify-center items-center mb-2 gap-1 sm:mb-4 text-sm sm:text-base">
          <Clock className="text-red-600 font-bold" /> 
          <span className="text-red-600 font-bold">Time Remaining: {remainingTime}s</span>
        </div>
        <progress
          className="progress progress-success w-full mb-2 sm:mb-4 h-2 sm:h-3"
          max="100"
          ref={progressBar}
        ></progress>

        <div className="flex flex-col flex-grow">
          <h1 className="text-center text-sm sm:text-base md:text-lg font-light mb-2 sm:mb-4">
            Question <span className="font-medium">{currentQuestion}</span> of{" "}
            <span className="font-medium">{totalQuestion}</span>
          </h1>

          <div className="mb-3 sm:mb-4">
            <h2 className="text-justify font-semibold text-base sm:text-lg md:text-xl text-black">
              {question?.question}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4 mb-4">
            {question?.options.map((item, index) => (
              <div
                key={index}
                className={`flex items-center p-3 sm:p-4 rounded-lg cursor-pointer transition duration-200 ${
                  index === selectedOption
                    ? "bg-green-200 text-black border-2 border-green-500"
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

        <div className="mt-auto pt-3 sm:pt-4 flex justify-end">
          <button
            className={`btn flex-1 py-2 sm:py-3 text-sm sm:text-base rounded-lg transition duration-200 bg-green-500 text-white ${
              selectedOption === null
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-green-600"
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
