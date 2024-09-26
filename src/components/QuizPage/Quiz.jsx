import React, { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { GrRadialSelected } from "react-icons/gr";

const Quiz = ({ question, currentQuestion, totalQuestion, setAnswer }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const timer = useRef(null);
  const progressBar = useRef(null);

  const handleGoToNextQuiz = () => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    flushSync(() => {
      setAnswer(selectedOption);
    });

    setSelectedOption(null);
  };

  useEffect(() => {
    timer.current = setTimeout(handleGoToNextQuiz, 100000);
  }, [question]);
  return (
    <div className="max-w-3xl p-20 shadow-2xl mx-auto my-12">
      <div>
        <h1 className="text-center text-md font-light">
          Quiz <span>{currentQuestion}</span> of <span>{totalQuestion}</span>
        </h1>
        <div>
          <h1 className="text-start font-semibold text-lg text-red-600 mb-4">
            <span className="text-warning">Question : </span>
            {question.question}
          </h1>
        </div>
        <div className="h-32">
          {question.options.map((item) => (
            <div key={item.id} className="flex gap-2 items-center">
              <GrRadialSelected className="mx-2" />
              {item}
            </div>
          ))}
        </div>
        <div className="my-2">
          <button className="btn btn-warning" onClick={handleGoToNextQuiz}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
