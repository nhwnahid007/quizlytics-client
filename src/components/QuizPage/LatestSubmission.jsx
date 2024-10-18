"use client";
import {getSubmissionByKey} from "@/requests/get";
import {useSession} from "next-auth/react";
import React, {useEffect, useState} from "react";
import Swal from "sweetalert2";

const LatestSubmission = ({quizKey}) => {
  const [latestSubmission, setLatestSubmission] = useState();
  const {data: session} = useSession();
  const email = session?.user?.email;
  const name = session?.user?.name;

  useEffect(() => {
    const getLatestSubmission = async () => {
      try {
        setLatestSubmission([]);
        const data = await getSubmissionByKey(quizKey, email);
        setLatestSubmission(data.at(-1));
      } catch (error) {
        console.log("data fetching error", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!!!",
          toast: true,
        });
      }
    };
    getLatestSubmission();
  }, [quizKey, email]);

  const renderQuestions = () => {
    if (!latestSubmission || !latestSubmission.questions) {
      return <p>No submission found.</p>;
    }

    return latestSubmission.questions.map((question, index) => {
      const userAnswer = latestSubmission.answers[index];
      const isCorrect = userAnswer === question.correctAnswers;

      return (
        <div key={index} className="my-4 p-4 border rounded">
          <h2 className="text-xl font-bold">{`Q${index + 1}: ${
            question.questions
          }`}</h2>
          <div className="space-y-2 mt-2">
            {question.options.map((option, optIndex) => {
              let optionClass = "p-2 rounded text-white ";
              if (userAnswer === option) {
                optionClass === isCorrect ? "bg-green-500" : "bg-red-500";
              } else if (option === question.correctAnswer) {
                optionClass += "bg-green-500";
              } else {
                optionClass += "bg-gray-300";
              }

              return (
                <div key={optIndex} className={optionClass}>
                  {option}
                </div>
              );
            })}
          </div>
          {!isCorrect && (
            <p className="text-red-600 mt-2">
              The correct answer is: {question.correctAnswer}
            </p>
          )}
        </div>
      );
    });
  };

  return (
    <div>
      <div className="pt-20 pb-5 container mx-auto items-center justify-center text-center space-y-3">
        <h1 className="text-4xl">
          Latest Submission key is:{" "}
          <span className="text-green-600 font-semibold">{quizKey}</span>
        </h1>
        <p className="text-2xl">
          User Name: <span className="text-green-600 font-bold">{name}</span>
        </p>
      </div>
      <div className="container mx-auto px-4">{renderQuestions()}</div>
    </div>
  );
};

export default LatestSubmission;
