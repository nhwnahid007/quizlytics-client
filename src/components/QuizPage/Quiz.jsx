import React from "react";

const Quiz = ({ question, currentQuestion, totalQuestion, setAnswer }) => {
  return (
    <div>
      <div>
        <h1>
          Quiz <span>{currentQuestion}</span> of <span>{totalQuestion}</span>
        </h1>
      </div>
    </div>
  );
};

export default Quiz;
