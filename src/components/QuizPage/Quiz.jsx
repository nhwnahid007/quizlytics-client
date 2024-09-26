import React from "react";
import { GrRadialSelected } from "react-icons/gr";

const Quiz = ({ question, currentQuestion, totalQuestion, setAnswer }) => {
  return (
    <div className="max-w-3xl p-20 shadow-2xl mx-auto my-12">
      <div>
        <h1 className="text-center text-md font-light">
          Quiz <span>{currentQuestion}</span> of <span>{totalQuestion}</span>
        </h1>
        <div>
          <h1 className="text-start font-semibold text-lg text-red-600 mb-4">
            Question: {question.question}
          </h1>
        </div>
        <div>
          <ol>
            {question.options.map((item) => (
              <li key={item.id} className="flex justify-start items-center">
                <GrRadialSelected className="mx-2" />
                {item}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
