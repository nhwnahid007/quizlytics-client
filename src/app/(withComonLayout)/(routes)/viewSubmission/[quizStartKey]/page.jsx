import LatestSubmission from "@/components/QuizPage/LatestSubmission";
import React from "react";

const page = ({ params }) => {
  return <LatestSubmission key={params.quizStartKey} />;
};

export default page;
