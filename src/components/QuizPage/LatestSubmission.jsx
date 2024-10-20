"use client";
import { getSubmissionByKey, getSubmissionByQuizTitle } from "@/requests/get";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import SubmitCard from "./SubmitCard";

const LatestSubmission = ({ quizKey, searchCategory }) => {
  const [isLoading, setIsLoading] = useState(true);

  const [latestSubmission, setLatestSubmission] = useState([]);

  const { data: session } = useSession();
  const email = session?.user?.email;
  const name = session?.user?.name;

  useEffect(() => {
    const getLatestSubmission = async () => {
      try {
        if (quizKey) {
          setLatestSubmission([]);
          const data = await getSubmissionByKey(quizKey, email);
          setLatestSubmission(data.at(-1));
        } else {
          setLatestSubmission([]);
          const data = await getSubmissionByQuizTitle(
            "math",
            "rafiul.razib@gmail.com"
          );
          console.log("quick data", data);
          setLatestSubmission(data.at(-1));
          setIsLoading(false);
        }
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
  }, [quizKey, email, searchCategory]);

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
    <div className="h-auto max-w-6xl pt-20 mx-auto">
      <h2 className="text-center">YOUR LATEST SUBMISSION</h2>

      {!isLoading &&
        latestSubmission.questions.map((item, idx) => (
          <SubmitCard
            key={item._id}
            item={item}
            markedAnswer={latestSubmission.answers[idx]}
          />
        ))}
    </div>
  );
};

export default LatestSubmission;
