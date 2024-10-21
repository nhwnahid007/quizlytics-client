"use client";
import QuizLink from "@/components/Modals/QuizLink";
import QuizScreen from "@/components/QuizPage/QuizScreen";
import { getQuizByLink } from "@/requests/get";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const page = () => {
  const [artLink, setArtLink] = useState();
  const [allQuestions, setAllQuestion] = useState();
  const [quizByLink, setQuizByLink] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  console.log("artlink", artLink);
  console.log("allQuestion", allQuestions);

  useEffect(() => {
    const getLinkQuiz = async () => {
      try {
        const data = await getQuizByLink(artLink);
        console.log(data);
        setAllQuestion(data);
        setIsLoading(false);
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
    getLinkQuiz();
  }, [artLink]);
  return (
    <div>
      {quizByLink ? (
        <QuizLink
          setQuizByLink={setQuizByLink}
          setArtLink={setArtLink}
          setIsLoading={setIsLoading}
        />
      ) : (
        <QuizScreen allQuestions={allQuestions} isLoading={isLoading} />
      )}
    </div>
  );
};

export default page;
