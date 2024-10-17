"use client";
import getMCQ, { getCustomQuiz } from "@/requests/get";
import React, { useEffect, useState } from "react";
import QuizResult from "./QuizResult";
import Quiz from "./Quiz";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";

const QuizScreen = ({ quizKey }) => {
  const [allQuestions, setAllQuestion] = useState();

  const [isLoading, setIsLoading] = useState(true);

  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);

  const [markedAnswer, setMarkedAnswer] = useState(
    new Array(allQuestions?.length)
  );

  console.log(markedAnswer);
  // console.log(quizKey);

  const isQuizEnded = currentQuizIndex === allQuestions?.length;

  useEffect(() => {
    const getAllMCQ = async () => {
      try {
        setAllQuestion([]);
        const data = await getCustomQuiz(quizKey);
        // console.log(data);
        setAllQuestion(data[0].quizArr);
        setIsLoading(false);
        // console.log(allQuestions);
      } catch (error) {
        console.log("data fetching error", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong! Try a different Key!!",
          toast: true,
        });
      }
    };
    getAllMCQ();
  }, [quizKey]);

  console.log(allQuestions);

  const calculateResult = () => {
    let correctAnswers = 0;
    allQuestions.forEach((element, index) => {
      if (element.correct_answer == markedAnswer[index]) {
        correctAnswers++;
      }
    });

    return {
      totalQuiz: allQuestions?.length,
      correctAnswers,
      percentageMark: Math.trunc((correctAnswers / allQuestions.length) * 100),
    };
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto text-center py-30">
        <h1 className="text-4xl font-semibold my-20">
          Quiz is loading. Please wait...
        </h1>
      </div>
    );
  }

  return (
    <div className="h-auto">
      {isQuizEnded ? (
        <QuizResult
          quizStartKey={quizKey}
          result={calculateResult()}
          markedAnswer={markedAnswer}
          allQuestions={allQuestions}
          isQuizEnded
        />
      ) : (
        <Quiz
          question={allQuestions[currentQuizIndex]}
          currentQuestion={currentQuizIndex + 1}
          totalQuestion={allQuestions?.length}
          setAnswer={(index) => {
            setMarkedAnswer((arr) => {
              let newArray = [...arr];
              newArray[currentQuizIndex] = index;
              return newArray;
            });
            setCurrentQuizIndex(currentQuizIndex + 1);
          }}
        />
      )}
    </div>
  );
};

export default QuizScreen;
