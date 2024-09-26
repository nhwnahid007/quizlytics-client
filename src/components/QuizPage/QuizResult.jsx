import Link from "next/link";
import React from "react";

const QuizResult = ({ result }) => {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <h1 className="text-red-700 font-bold text-3xl my-20">
        Your skill is {result?.percentageMark}%
      </h1>
      <h1 className="text-green-700 font-semibold text-xl">
        You have marked {result?.correctAnswers} correct answers out of{" "}
        {result?.totalQuiz}
      </h1>

      <Link href={"/"}>
        <button className="btn btn-error mt-12">Back to Home</button>
      </Link>
    </div>
  );
};

export default QuizResult;
