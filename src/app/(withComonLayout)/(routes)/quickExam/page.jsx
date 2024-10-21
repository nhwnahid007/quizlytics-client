"use client";
import useAllMCQ from "@/app/hooks/useAllMCQ";
import useSearchCategory from "@/app/hooks/useSearchCategory";
import useSearchLevel from "@/app/hooks/useSearchLevel";
import MakeExam from "@/components/Modals/MakeExam";
import QuizScreen from "@/components/QuizPage/QuizScreen";
import { getMCQ } from "@/requests/get";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [searchCategory, setSearchCategory] = useSearchCategory();
  const [searchLavel, setSearchLavel] = useSearchLevel();
  const [loadData, setLoadData] = useState(false);
  const [allMCQ, setAllMCQ] = useAllMCQ();
  const [showMakeExam, setShowMakeExam] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAllMCQ = async () => {
      try {
        const data = await getMCQ(searchCategory, searchLavel);
        console.log(data);
        setAllMCQ(data); // Set fetched MCQs
        setIsLoading(false);
      } catch (error) {
        console.error("Data fetching error:", error);
      }
    };

    if (loadData) {
      getAllMCQ(); // Fetch only if category and level are set
    }
  }, [loadData, searchCategory, searchLavel]);
  console.log(allMCQ.length);
  console.log(allMCQ);
  return (
    <div>
      {showMakeExam ? (
        <MakeExam
          setShowMakeExam={setShowMakeExam}
          setSearchLavel={setSearchLavel}
          setSearchCategory={setSearchCategory}
          setLoadData={setLoadData}
        />
      ) : (
        <QuizScreen
          allQuestions={allMCQ}
          isLoading={isLoading}
          searchLavel={searchLavel}
          searchCategory={searchCategory}
        />
      )}
    </div>
  );
};

export default Page;
