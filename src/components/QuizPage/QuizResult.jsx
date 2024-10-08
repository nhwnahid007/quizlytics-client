import useRouterHook from "@/app/hooks/useRouterHook";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import Swal from "sweetalert2";

const QuizResult = ({ result, markedAnswer, allQuestions }) => {
  const [loading, setLoading] = useState(false);
  console.log("markedAnswers", markedAnswer);
  console.log("allQuestions", allQuestions);
  const { data: session } = useSession();
  console.log(session);

  const attemptDetails = {
    questions: allQuestions,
    answers: markedAnswer,
    user: session,
    marks: result?.percentageMark,
  };

  console.log(attemptDetails);

  const handleSaveRecord = async () => {
    setLoading(true);
    const res = await axios.post(
      "https://quizlytics.jonomukti.org/saveHistory",
      attemptDetails
    );

    if (res.data.insertedId) {
      setLoading(false);
      Swal.fire({
        title: "Success",
        text: "Recorded successfully!",
        icon: "success",
      });
    }
  };

  const router = useRouterHook();

  const handleGoToHome = () => {
    router.push("/");
  };

  if (loading) {
    return "Progress is being saved in database! Please Wait!!";
  }

  return (
    <div className="text-center max-w-3xl mx-auto py-12 border my-10">
      <h1 className="text-red-700 font-bold text-3xl my-20">
        Your skill is {result?.percentageMark}%
      </h1>
      <h1 className="text-green-700 font-semibold text-xl">
        You have marked {result?.correctAnswers} correct answers out of{" "}
        {result?.totalQuiz}
      </h1>

      <div className="flex gap-4 justify-center items-center">
        <button onClick={handleSaveRecord} className="btn btn-error mt-12">
          Save Progress
        </button>
        <button onClick={handleGoToHome} className="btn btn-primary mt-12">
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default QuizResult;
