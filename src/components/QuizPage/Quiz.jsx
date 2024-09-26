import React, { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { GrRadialSelected } from "react-icons/gr";

const Quiz = ({ question, currentQuestion, totalQuestion, setAnswer }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const timer = useRef(null);
  const progressBar = useRef(null);

  const handleGoToNextQuiz = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    flushSync(() => {
      setAnswer(selectedOption);
    });

    setSelectedOption(null);
  }, [selectedOption, setAnswer]);

  useEffect(() => {
    progressBar.current.value = 100;
    const duration = 15 * 1000;
    const stepTime = 10;
    const steps = duration / stepTime;
    const decrement = 100 / steps;

    let stepCount = 0;
    const updateProgressBar = () => {
      stepCount++;
      progressBar.current.value = Math.max(100 - stepCount * decrement, 0);
      if (stepCount < steps) {
        timer.current = setTimeout(updateProgressBar, stepTime);
      } else {
        handleGoToNextQuiz();
      }
    };

    timer.current = setTimeout(updateProgressBar, stepTime);

    return () => {
      clearTimeout(timer.current);
    };
  }, [question, handleGoToNextQuiz]);

  return (
    <div className="max-w-3xl p-12 shadow-2xl mx-auto my-12">
      <progress
        className="progress progress-success w-full"
        max="100"
        ref={progressBar}
      ></progress>
      <div>
        <h1 className="text-center text-md font-light my-10">
          Quiz <span>{currentQuestion}</span> of <span>{totalQuestion}</span>
        </h1>
        <div>
          <h1 className="text-justify font-semibold text-lg text-red-600 mb-4">
            <span className="text-warning">Question : </span>
            {question?.question}
          </h1>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {question?.options.map((item, index) => (
            <div
              key={index}
              className={`flex gap-2 items-center  p-4 rounded-2xl ${
                index == selectedOption
                  ? "bg-black text-white"
                  : "bg-pink-300 text-black"
              }`}
              onClick={() => setSelectedOption(index)}
            >
              <GrRadialSelected className="mx-2" />
              {item}
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <button className="btn btn-error w-full" onClick={handleGoToNextQuiz}>
            Next Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
