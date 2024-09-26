"use client";
import getMCQ from "@/requests/get";
import React, { useEffect, useState } from "react";
import QuizResult from "./QuizResult";
import Quiz from "./Quiz";

const QuizScreen = () => {
  const [allQuestions, setAllQuestion] = useState();

  const [isLoading, setIsLoading] = useState(true);

  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);

  const [markedAnswer, setMarkedAnswer] = useState(
    new Array(allQuestions?.length)
  );

  console.log(markedAnswer);

  const isQuizEnded = currentQuizIndex === allQuestions?.length;

  useEffect(() => {
    const getAllMCQ = async (html, beginner) => {
      try {
        const data = await getMCQ(html, beginner);
        setAllQuestion(data);
        setIsLoading(false);
      } catch (error) {
        console.log("data fetching error", error);
      }
    };
    getAllMCQ();
  }, []);

  console.log(allQuestions);

  const calculateResult = () => {
    let correctAnswers = 0;
    allQuestions.forEach((element, index) => {
      if (element.correct_answers == markedAnswer[index]) {
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
      <div>
        <h1>Quiz is loading. Please wait...</h1>
      </div>
    );
  }

  return (
    <div>
      {isQuizEnded ? (
        <QuizResult result={calculateResult()} isQuizEnded />
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
