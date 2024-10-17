"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { Clock } from "lucide-react";
import { GrRadialSelected } from "react-icons/gr";
import Swal from "sweetalert2";
import useMakeExam from "@/app/hooks/useMakeExam";
import MakeExam from "@/components/Modals/MakeExam";
import useQuestionNumber from "@/app/hooks/useQuestionNumber";
import useDate from "@/app/hooks/useDate";
import useUserExamData from "@/app/hooks/useUserExamData";
import useShowResult from "@/app/hooks/useShowResult";
import { useSession } from "next-auth/react";
import useExamId from "@/app/hooks/useExamId";
import Loading from "@/components/Modals/Loading";
import useAllMCQ from "@/app/hooks/useAllMCQ";
import { getMCQ } from "@/requests/get";
import ExamResult from "@/components/Modals/ExamResult";
import useSearchCategory from "@/app/hooks/useSearchCategory";
import useSearchLevel from "@/app/hooks/useSearchLevel";

const Exam = () => {
  const [showMakeExam, setShowMakeExam] = useMakeExam();
  const [currentMCQ, setCurrentMCQ] = useQuestionNumber();
  const today = useDate();
  const [userExamData, setUserExamData] = useUserExamData();
  const [showResult, setShowResult] = useShowResult();
  const [allMCQ, setAllMCQ] = useAllMCQ();
  const [examId, setExamId] = useExamId();
  const [searchCategory, setSearchCategory] = useSearchCategory();
  const [searchLavel, setSearchLavel] = useSearchLevel();
  const [isDataSent, setIsDataSent] = useState(false);
  const [myMark, setMyMark] = useState(null);
  const [loadData, setLoadData] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [remainingTime, setRemainingTime] = useState(15);
  const progressBar = useRef(null);
  const timer = useRef(null);

  const { data: session } = useSession();
  const name = session?.user?.name;
  const email = session?.user?.email;
  const profile = session?.user?.profile;
  const image = session?.user?.image;

  useEffect(() => {
    const getAllMCQ = async () => {
      try {
        const data = await getMCQ(searchCategory, searchLavel);
        setAllMCQ(data);
      } catch (error) {
        console.error("Data fetching error:", error);
      }
    };

    if (loadData) {
      getAllMCQ();
    }
  }, [loadData]);

  useEffect(() => {
    const updatingMark = () => {
      try {
        const correctMCQ = userExamData.filter(
          (data) =>
            data.user_answer === data.options[parseInt(data.correct_answer)]
        );
        const calculatedMark = correctMCQ.length;
        setMyMark(calculatedMark);
      } catch (error) {
        console.log(error);
      }
    };
    if (showResult) {
      updatingMark();
    }
  }, [showResult, userExamData]);

  const handleGoToNextQuiz = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    setUserExamData((prevData) => [
      ...prevData,
      { ...allMCQ[currentMCQ], user_answer: selectedOption },
    ]);
    setSelectedOption(null);
    setCurrentMCQ((prev) => prev + 1);
    setRemainingTime(15);
  }, [allMCQ, currentMCQ, selectedOption, setUserExamData, setCurrentMCQ]);

  useEffect(() => {
    if (progressBar.current) {
      progressBar.current.value = 100;
      progressBar.current.classList.add("progress-success");
    }

    const duration = 15 * 1000;
    const stepTime = 1000;
    const steps = duration / stepTime;
    const decrement = 100 / steps;

    let stepCount = 0;

    const updateProgressBar = () => {
      stepCount++;
      if (progressBar.current) {
        progressBar.current.value = Math.max(100 - stepCount * decrement, 0);

        if (stepCount === 5) {
          progressBar.current.classList.remove("progress-success");
          progressBar.current.classList.add("progress-error");
        }
      }
      setRemainingTime(Math.max(15 - stepCount, 0));
      if (stepCount < steps) {
        timer.current = setTimeout(updateProgressBar, stepTime);
      } else {
        handleGoToNextQuiz();
      }
    };

    timer.current = setTimeout(updateProgressBar, stepTime);

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [handleGoToNextQuiz]);

  const handleOptionClick = (index) => {
    setSelectedOption(index);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-2 sm:p-4">
      {showMakeExam ? (
        <MakeExam
          setShowMakeExam={setShowMakeExam}
          setSearchLavel={setSearchLavel}
          setSearchCategory={setSearchCategory}
          setLoadData={setLoadData}
        />
      ) : (
        <>
          {allMCQ.length !== 10 ? (
            <Loading />
          ) : !showResult ? (
            <div className="w-full max-w-3xl bg-white p-3 sm:p-4 md:p-6 shadow-2xl rounded-lg flex flex-col min-h-[400px] max-h-[90vh] overflow-auto">
              <div className="text-center flex justify-center items-center mb-2 gap-1 sm:mb-4 text-sm sm:text-base">
                <Clock className="text-red-600 font-bold" />
                <span className="text-red-600 font-bold">
                  Time Remaining: {remainingTime}s
                </span>
              </div>
              <progress
                className="progress progress-success w-full mb-2 sm:mb-4 h-2 sm:h-3"
                max="100"
                ref={progressBar}
              ></progress>

              <div className="flex flex-col flex-grow">
                <h1 className="text-center text-sm sm:text-base md:text-lg font-light mb-2 sm:mb-4">
                  Question <span className="font-medium">{currentMCQ + 1}</span> of 10
                </h1>

                <div className="mb-3 sm:mb-4">
                  <h2 className="text-justify font-semibold text-base sm:text-lg md:text-xl text-black">
                    {allMCQ[currentMCQ]?.question}
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4 mb-4">
                  {allMCQ[currentMCQ]?.options.map((option, index) => (
                    <div
                      key={index}
                      className={`flex items-center p-3 sm:p-4 rounded-lg cursor-pointer transition duration-200 ${
                        index === selectedOption
                          ? "bg-green-200 text-black border-2 border-green-500"
                          : "bg-white text-black border-2 border-gray-300 hover:bg-gray-100"
                      }`}
                      onClick={() => handleOptionClick(index)}
                    >
                      <GrRadialSelected className="mr-2 text-lg sm:text-xl md:text-2xl flex-shrink-0" />
                      <span className="text-sm sm:text-base md:text-lg leading-tight">
                        {option}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-3 sm:pt-4 flex justify-end">
                <button
                  className={`btn flex-1 py-2 sm:py-3 text-sm sm:text-base rounded-lg transition duration-200 bg-green-500 text-white ${
                    selectedOption === null
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-green-600"
                  }`}
                  onClick={handleGoToNextQuiz}
                  disabled={selectedOption === null}
                >
                  Next Question
                </button>
              </div>
            </div>
          ) : (
            <ExamResult myMark={myMark} />
          )}
        </>
      )}
    </div>
  );
};

export default Exam;
