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
        <QuizResult />
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
