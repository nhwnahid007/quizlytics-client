import LatestSubmission from "@/components/QuizPage/LatestSubmission";
import React from "react";

const page = ({ params }) => {
  return <LatestSubmission quizKey={params.quizStartKey} />;
};

export default page;
