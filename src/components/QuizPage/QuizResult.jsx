import useRouterHook from "@/app/hooks/useRouterHook";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import Swal from "sweetalert2";
import {
  FacebookIcon,
  FacebookShareButton,
  PinterestIcon,
  PinterestShareButton,
  TwitterIcon,
  TwitterShareButton,
  RedditShareButton,
  RedditIcon,
} from "next-share";

const QuizResult = ({ result, markedAnswer, allQuestions }) => {
  const [loading, setLoading] = useState(false);
  console.log("markedAnswers", markedAnswer);
  console.log("allQuestions", allQuestions);
  // access next auth session
  const { data: session } = useSession();
  const name = session?.user?.name;
  const profile = session?.user?.profile;
  const image = session?.user?.image;

  const attemptDetails = {
    questions: allQuestions,
    answers: markedAnswer,
    userName: name,
    userProfile: profile,
    userImg: image,
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

  // Determine the remark based on the score
  let remark = "";
  let remarkColor = "";

  if (result?.percentageMark > 70) {
    remark = "Excellent!";
    remarkColor = "text-green-600";
  } else if (myMark >= 5) {
    remark = "Good!";
    remarkColor = "text-orange-600";
  } else {
    remark = "Needs Improvement";
    remarkColor = "text-red-600";
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-[#ffefd3] w-[90%] md:w-[580px] p-8 rounded-lg shadow-lg">
        <div
          className={`w-[200px] h-[200px] mx-auto my-8 border-8 p-8 rounded-full flex justify-center items-center ${remarkColor}`}
        >
          <h1 className={`text-4xl font-bold ${remarkColor}`}>
            {result?.correctAnswers} / {result?.totalQuiz}
          </h1>
        </div>
        <h1 className={`mb-5 text-center text-4xl ${remarkColor}`}>
          {result?.percentageMark}%
        </h1>
        <div className="mt-4 flex gap-4 justify-center items-center">
          <button onClick={handleSaveRecord} className="btn btn-error mt-12">
            Save Progress
          </button>
          <button onClick={handleGoToHome} className="btn btn-primary mt-12">
            Back to Home
          </button>
        </div>
        <h1 className="text-[#30d158] text-center text-4xl mb-10">
          Your achieved mark!
        </h1>
        {/* <div>
          <UserFeedback />
        </div> */}
        <div className="mt-4 flex justify-center gap-4 w-full">
          <div className="font-medium py-1 px-8 border border-red-600 rounded-md">
            <h2 className="text-xl mb-5 text-center">Share Social Media:</h2>
            <FacebookShareButton
              url={"https://quizlytics.vercel.app/"}
              quote={`I scored ${result?.percentageMark}% on my exam! Check it out on Quizlytics.`}
              hashtag={"#Quizlytics"}
            >
              <FacebookIcon className="animate-bounce" size={32} round />
            </FacebookShareButton>

            <PinterestShareButton
              url={"https://quizlytics.vercel.app/"}
              media={`I scored ${result?.percentageMark}% on my exam! Check it out on Quizlytics.`}
            >
              <PinterestIcon className="mx-5 animate-bounce" size={32} round />
            </PinterestShareButton>

            <TwitterShareButton
              url={"https://quizlytics.vercel.app/"}
              title={`I scored ${result?.percentageMark}% on my exam! Check it out on Quizlytics.`}
            >
              <TwitterIcon className="animate-bounce" size={32} round />
            </TwitterShareButton>

            <RedditShareButton
              url={"https://github.com/next-share"}
              title={
                "next-share is a social share buttons for your next React apps."
              }
            >
              <RedditIcon className="animate-bounce ml-5" size={32} round />
            </RedditShareButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResult;
