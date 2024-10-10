"use client";
import CustomExam from "@/components/Modals/CustomExam";
import QuizScreen from "@/components/QuizPage/QuizScreen";

import { useState } from "react";

const Page = () => {
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

export default Page;
