"use client";
import useRouterHook from "@/app/hooks/useRouterHook";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Swal from "sweetalert2";
import {Button} from "@/components/ui/button";

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
import UserFeedback from "../Modals/UserFeedback";

const QuizResult = ({
  result,
  markedAnswer,
  allQuestions,
  quizStartKey,
  quizSet,
  searchCategory,
  searchLavel,
  artLink,
}) => {
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  console.log("markedAnswers", markedAnswer);
  console.log("allQuestions", allQuestions);
  console.log("quizStartKey", quizStartKey);
  // access next auth session
  const {data: session} = useSession();
  const name = session?.user?.name;
  const profile = session?.user?.profile;
  const image = session?.user?.image;
  const email = session?.user?.email;
  console.log(session);

  const attemptDetails = {
    quizStartKey,
    date: new Date(),
    linkId: "1001",
    quizTitle: quizSet ? quizSet[0].quizTitle : searchCategory,
    quizCategory: quizSet ? quizSet[0].quizCategory : searchLavel,
    quizCreator: quizSet ? quizSet[0].quizCreator : "AI",
    questions: allQuestions,
    answers: markedAnswer,
    userName: name,
    userEmail: email,
    userProfile: profile,
    userImg: image,
    marks: result?.percentageMark,
  };

  console.log(attemptDetails);

  let postUrl = "";
  if (quizStartKey) {
    postUrl = "https://quizlytics.jonomukti.org/saveHistory";
  } else if (searchCategory) {
    postUrl = "https://quizlytics.jonomukti.org/saveAiQuiz";
  } else {
    postUrl = "https://quizlytics.jonomukti.org/linkQuiz";
  }

  const handleSaveRecord = async () => {
    setLoading(true);
    try {
      const res = await axios.post(postUrl, attemptDetails);
      if (res.data.insertedId) {
        setLoading(false);
        setIsDisabled(false);
        Swal.fire({
          title: "Success",
          text: "Recorded successfully!",
          icon: "success",
          toast: true,
        });
      }
    } catch (error) {
      setLoading(false);
      Swal.fire({
        title: "Error",
        text: "Failed to save record. Please try again.",
        icon: "error",
        toast: true,
      });
    }
  };

  const router = useRouterHook();

  const handleGoToHome = () => {
    router.push("/");
  };

  let viewSubmission = ``;

  if (quizStartKey) {
    viewSubmission = `/viewSubmission/${quizStartKey}`;
  } else if (searchCategory) {
    viewSubmission = `/viewSubmissionAi/${searchCategory}`;
  } else {
    viewSubmission = `viewSubmissionByLink/${email}`;
  }

  const handleViewAnswers = () => {
    router.push(viewSubmission);
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
  } else if (result?.percentageMark >= 50) {
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
        <div className="my-4 flex gap-4 justify-center items-center">
          <Button className="px-10" onClick={handleSaveRecord} variant="destructive">
            Submit
          </Button>
          <Button
            onClick={handleViewAnswers}
            variant="destructive"
            disabled={isDisabled}
          >
            View Submission
          </Button>
          <Button onClick={handleGoToHome} variant="destructive">
            Back to Home
          </Button>
        </div>
        <h1 className="text-[#30d158] text-center text-4xl mb-10">
          You achieved {result?.percentageMark}% mark!
        </h1>
        <div>
          <UserFeedback />
        </div>
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
