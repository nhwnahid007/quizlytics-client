"use client";
import useRouterHook from "@/app/hooks/useRouterHook";
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
import React from "react";
import UserFeedback from "./UserFeedback";

const ExamResult = ({myMark}) => {
  const router = useRouterHook();

  const handleGoHome = () => {
    router.push("/");
  };

  // Determine the remark based on the score
  let remark = "";
  let remarkColor = "";

  if (myMark > 7) {
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
          <h1
            className={`text-4xl font-bold ${remarkColor}`}
          >{`${myMark} / 10`}</h1>
        </div>
        <h1 className={`mb-5 text-center text-4xl ${remarkColor}`}>{remark}</h1>
        <div className="mt-4 flex justify-center gap-4">
          <button
            onClick={handleGoHome}
            className="text-red-600 hover:bg-red-600 hover:text-[#ffefd3] font-medium py-2 px-10 text-xl border border-red-600 rounded-md"
          >
            Exit
          </button>
        </div>
        <h1 className="text-[#30d158] text-center text-4xl mb-10">
          Your achieved mark!
        </h1>
        <div>
          <UserFeedback />
        </div>
        <div className="mt-4 flex justify-center gap-4 w-full">
          <div className="font-medium py-1 px-8 border border-red-600 rounded-md">
            <h2 className="text-xl mb-5 text-center">Share Social Media:</h2>
            <FacebookShareButton
              url={"https://quizlytics.vercel.app/"}
              quote={`I scored ${myMark} / 10 on my exam! Check it out on Quizlytics.`}
              hashtag={"#Quizlytics"}
            >
              <FacebookIcon className="animate-bounce" size={32} round />
            </FacebookShareButton>

            <PinterestShareButton
              url={"https://quizlytics.vercel.app/"}
              media={`I scored ${myMark} / 10 on my exam! Check it out on Quizlytics.`}
            >
              <PinterestIcon className="mx-5 animate-bounce" size={32} round />
            </PinterestShareButton>

            <TwitterShareButton
              url={"https://quizlytics.vercel.app/"}
              title={`I scored ${myMark} / 10 on my exam! Check it out on Quizlytics.`}
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

export default ExamResult;
