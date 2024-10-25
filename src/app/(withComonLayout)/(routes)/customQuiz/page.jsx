"use client";
import CustomExam from "@/components/Modals/CustomExam";
import QuizScreen from "@/components/QuizPage/QuizScreen";
import { getCustomQuiz } from "@/requests/get";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Page = () => {
  const [quizKey, setQuizKey] = useState(null);
  const [customExam, setCustomExam] = useState(true);
  const [allQuestions, setAllQuestion] = useState();
  const [quizSet, setQuizSet] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAllMCQ = async () => {
      try {
        setAllQuestion([]);
        const data = await getCustomQuiz(quizKey);
        // console.log("data", data);
        setQuizSet(data);
        setAllQuestion(data[0]?.quizArr);
        setIsLoading(false);
        // console.log(allQuestions);
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
    getAllMCQ();
  }, [quizKey]);

  return (
    <div>
      {customExam ? (
        <CustomExam setCustomExam={setCustomExam} setQuizKey={setQuizKey} />
      ) : (
        <QuizScreen
          quizKey={quizKey}
          allQuestions={allQuestions}
          quizSet={quizSet}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default Page;
