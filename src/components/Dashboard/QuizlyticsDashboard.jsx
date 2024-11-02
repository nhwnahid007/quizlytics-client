"use client";
import { getMarks } from "@/requests/get";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";

import { FiUsers, FiCheckCircle, FiBarChart, FiClock } from "react-icons/fi";
import Spinner from "../Shared/Spinner";
import Link from "next/link";
import { Button } from "../ui/button";
import useRouterHook from "@/app/hooks/useRouterHook";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const QuizlyticsDashboard = () => {
  const { data: session } = useSession();
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state

  const router = useRouterHook();

  const handleAIQuiz = () => {
    router.push("/quickExam");
  };

  const handleCustomQuiz = () => {
    router.push("/customQuiz");
  };

  const handleQuizByLink = () => {
    router.push("/quizByLink");
  };

  useEffect(() => {
    const fetchMarks = async () => {
      try {
        if (session?.user?.email) {
          const data = await getMarks(session.user.email);
          setMarks(data);
        }
      } catch (error) {
        console.error("Data fetching error", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong while fetching leaderboard data!",
          toast: true,
        });
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
    fetchMarks();
  }, [session]);

  const getStatistics = () => {
    const totalExams = marks.length;
    const totalMarks = marks.reduce((acc, item) => acc + item.marks, 0);
    const averageMarks = (totalMarks / totalExams).toFixed(2);
    const highestMarks =
      totalExams > 0 ? Math.max(...marks.map((item) => item.marks)) : 0;
    const lowestMarks =
      totalExams > 0 ? Math.min(...marks.map((item) => item.marks)) : 0;

    return { totalExams, averageMarks, highestMarks, lowestMarks };
  };

  const categorizeMarks = () => {
    const ranges = { low: 0, mid: 0, high: 0 };
    marks.forEach((quiz) => {
      if (quiz.marks <= 50) ranges.low += 1;
      else if (quiz.marks <= 70) ranges.mid += 1;
      else ranges.high += 1;
    });
    return [
      { name: "0-50%", value: ranges.low },
      { name: "51-70%", value: ranges.mid },
      { name: "71-100%", value: ranges.high },
    ];
  };

  const getRecentQuizzes = () => {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));

    return marks.filter((quiz) => new Date(quiz.date) >= thirtyDaysAgo).length;
  };

  const { totalExams, averageMarks, highestMarks, lowestMarks } =
    getStatistics();

  // Prepare data for charts
  const barChartData = marks.map((quiz) => ({
    quizTitle: quiz.quizTitle,
    marks: quiz.marks,
  }));

  const lineChartData = marks.map((quiz, index) => ({
    attempt: index + 1,
    marks: quiz.marks,
  }));

  const pieChartData = categorizeMarks();

  return (
    <div className="min-h-screen overflow-hidden bg-white p-6">
      {/* Dashboard Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Quizlytics Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#E3C8FF] p-4 rounded-lg shadow-md flex items-center">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex justify-center items-center mr-4">
            <FiBarChart className="text-gray-500" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Quizzes Attempted</p>
            <p className="text-xl font-bold">{totalExams}</p>
          </div>
        </div>

        <div className="bg-[#F4E1FF] p-4 rounded-lg shadow-md flex items-center">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex justify-center items-center mr-4">
            <FiCheckCircle className="text-gray-500" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Best Performance</p>
            <p className="text-xl font-bold">
              {highestMarks <= 100 ? highestMarks : 0}%
            </p>
          </div>
        </div>

        <div className="bg-[#E3F4FF] p-4 rounded-lg shadow-md flex items-center">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex justify-center items-center mr-4">
            <FiUsers className="text-gray-500" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Users</p>
            <p className="text-xl font-bold">5,921</p>
          </div>
        </div>

        <div className="bg-[#FFE3E8] p-4 rounded-lg shadow-md flex items-center">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex justify-center items-center mr-4">
            <FiClock className="text-gray-500" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Quiz History</p>
            <p className="text-xl font-bold">{getRecentQuizzes()} days</p>
          </div>
        </div>
      </div>

      {/* Quiz Start Section*/}

      <div className="h-64 flex justify-center items-center gap-3">
        <button className="md:text-md bg-primary-color md:px-6 border-2 border-[#7A1CAC]  shadow-sm hover:bg-[#7A1CAC]/10 hover:text-[#7A1CAC] md:py-3 text-gray-100 font-bold rounded-md lg:text-lg lg:px-8 lg:py-4" onClick={handleAIQuiz}>
          Quick Exam with AI
        </button>
        <button className="md:text-md bg-primary-color md:px-6 border-2 border-[#7A1CAC]  shadow-sm hover:bg-[#7A1CAC]/10 hover:text-[#7A1CAC]  md:py-3 text-gray-100 font-bold rounded-md lg:text-lg lg:px-8 lg:py-4" onClick={handleCustomQuiz}>
          Custom Exam
        </button>
        <button className="md:text-md bg-primary-color md:px-6 border-2 border-[#7A1CAC]  shadow-sm hover:bg-[#7A1CAC]/10 hover:text-[#7A1CAC] md:py-3 text-gray-100 font-bold rounded-md lg:text-lg lg:px-8 lg:py-4" onClick={handleQuizByLink}>
          Test on Article Link
        </button>
      </div>
    </div>
  );
};

export default QuizlyticsDashboard;
