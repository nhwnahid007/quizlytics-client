"use client";
import CustomExam from "@/components/Modals/CustomExam";
import QuizScreen from "@/components/QuizPage/QuizScreen";
import Link from "next/link";

import { useState } from "react";

const page = () => {
  const [quizKey, setQuizKey] = useState(null);
  const [customExam, setCustomExam] = useState(true);

  return (
    <div>
      {customExam ? (
        <CustomExam setCustomExam={setCustomExam} setQuizKey={setQuizKey} />
      ) : (
        <QuizScreen quizKey={quizKey} />
      )}
    </div>
  );
};

export default page;
