"use client";
import QuizLink from "@/components/Modals/QuizLink";
import QuizScreen from "@/components/QuizPage/QuizScreen";
import { getQuizByLink } from "@/requests/get";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Page = () => {
  const [artLink, setArtLink] = useState();
  const [allQuestions, setAllQuestion] = useState([]); // Initialize as an empty array
  const [quizByLink, setQuizByLink] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  console.log("artlink", artLink);
  console.log("allQuestion", allQuestions);

  useEffect(() => {
    const getLinkQuiz = async () => {
      if (!artLink) return;
      setIsLoading(true);
      try {
        const data = await getQuizByLink(artLink);
        console.log(data);
        setAllQuestion(data || []); // Ensure allQuestions is always an array
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
      ) : isLoading ? (
        <div>Loading...</div> 
      ) : (
        <QuizScreen
          allQuestions={allQuestions}
          isLoading={isLoading}
          artLink={artLink}
        />
      )}
    </div>
  );
};

export default Page;
