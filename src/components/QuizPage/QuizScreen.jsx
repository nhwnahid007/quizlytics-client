"use client";
import getMCQ from "@/requests/get";
import React, { useEffect, useState } from "react";
import QuizResult from "./QuizResult";
import Quiz from "./Quiz";

const QuizScreen = () => {
  const [category, setCategory] = useState("react");
  const [skill, setSkill] = useState("primary");
  const [allQuestions, setAllQuestion] = useState();

  const [isLoading, setIsLoading] = useState(true);

  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);

  const [markedAnswer, setMarkedAnswer] = useState(
    new Array(allQuestions?.length)
  );

  //   console.log(markedAnswer);

  const isQuizEnded = currentQuizIndex === allQuestions?.length;

  useEffect(() => {
    const getAllMCQ = async () => {
      try {
        setAllQuestion([]);
        const data = await getMCQ(category, skill);
        console.log(data);
        setAllQuestion(data);
        setIsLoading(false);
      } catch (error) {
        console.log("data fetching error", error);
      }
    };
    getAllMCQ();
  }, [category, skill]);

  // console.log(allQuestions);

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
      <div className="max-w-6xl mx-auto text-center py-60">
        <h1 className="text-4xl font-semibold my-20">
          Quiz is loading. Please wait...
        </h1>
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="h-screen">
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
