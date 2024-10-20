import LatestSubmission from "@/components/QuizPage/LatestSubmission";
import React from "react";

const page = ({ params }) => {
  return <LatestSubmission searchCategory={params.searchCategory} />;
};

export default page;
