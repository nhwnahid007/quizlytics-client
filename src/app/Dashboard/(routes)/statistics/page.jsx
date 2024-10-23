'use client';
import { getMarks } from '@/requests/get';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useSession } from 'next-auth/react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from 'recharts';

const Page = () => {
  const { data: session } = useSession();
  const [marks, setMarks] = useState([]);
  

  useEffect(() => {
    const fetchMarks = async () => {
      try {
        if (session?.user?.email) {
          const data = await getMarks(session.user.email);
          setMarks(data);
        }
      } catch (error) {
        console.error('Data fetching error', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong while fetching leaderboard data!',
          toast: true,
        });
      }
    };
    fetchMarks();
  }, [session]);

  const getStatistics = () => {
    const totalExams = marks.length;
    const totalMarks = marks.reduce((acc, item) => acc + item.marks, 0);
    const averageMarks = (totalMarks / totalExams).toFixed(2);
    const highestMarks = Math.max(...marks.map((item) => item.marks));
    const lowestMarks = Math.min(...marks.map((item) => item.marks));

    return { totalExams, averageMarks, highestMarks, lowestMarks };
  };

  const { totalExams, averageMarks, highestMarks, lowestMarks } = getStatistics();

  // Prepare data for charts
  const barChartData = marks.map((quiz) => ({
    quizTitle: quiz.quizTitle,
    marks: quiz.marks,
  }));

  const lineChartData = marks.map((quiz, index) => ({
    attempt: index + 1,
    marks: quiz.marks,
  }));

  // Function to determine performance trend
  const getPerformanceTrend = () => {
    if (marks.length < 2) return 'neutral'; // Not enough data for trend

    let isImproving = true;
    let isDecreasing = true;
    let isAlwaysHigh = true;

    for (let i = 1; i < marks.length; i++) {
      if (marks[i].marks > marks[i - 1].marks) isDecreasing = false;
      if (marks[i].marks < marks[i - 1].marks) isImproving = false;
      if (marks[i].marks < 80) isAlwaysHigh = false;
    }

    if (isAlwaysHigh) return 'alwaysHigh';
    if (isImproving) return 'improving';
    if (isDecreasing) return 'decreasing';
    return 'neutral'; // Marks neither consistently increasing nor decreasing
  };

  // Get the performance trend
  const performanceTrend = getPerformanceTrend();

  // Define styles based on performance trend
  const getProgressBarStyle = () => {
    switch (performanceTrend) {
      case 'improving':
        return 'bg-green-400'; // Green for improving performance
      case 'decreasing':
        return 'bg-red-400'; // Red for decreasing performance
      case 'neutral':
        return 'bg-yellow-400'; // Yellow for stable performance
      case 'alwaysHigh':
        return 'bg-blue-400'; // Blue for consistently high performance
      default:
        return 'bg-gray-400'; // Default to gray
    }
  };

  // Function to get performance remark
  const getPerformanceRemark = () => {
    switch (performanceTrend) {
      case 'improving':
        return 'Great job! Keep up the improvement!';
      case 'decreasing':
        return 'Don\'t be discouraged. Analyze and improve!';
      case 'alwaysHigh':
        return 'Excellent performance! Keep it up!';
      case 'neutral':
        return 'Stable performance. Consider ways to improve!';
      default:
        return '';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      {/* Background section for performance remark */}
      <div className={`w-full text-center py-4 mb-4 ${getProgressBarStyle()} relative`}>
        <p className="md:text-5xl text-sm font-bold text-primary-color">{getPerformanceRemark()}</p>
      </div>

      {marks.length === 0 ? (
        <p className=" md:text-5xl text-sm font-semibold text-gray-600">No exam given yet.</p>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Exam Statistics
          </h2>
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="text-center bg-secondary-color p-4 rounded-lg hover:text-primary-color transition-colors duration-300">
              <p className="text-lg font-medium text-gray-700">Total Exams Attempted</p>
              <p className="text-2xl font-bold">{totalExams}</p>
            </div>
            <div className="text-center bg-secondary-color p-4 rounded-lg hover:text-primary-color transition-colors duration-300">
              <p className="text-lg font-medium text-gray-700">Average Marks</p>
              <p className="text-2xl font-bold">{averageMarks}</p>
            </div>
            <div className="text-center bg-secondary-color p-4 rounded-lg hover:text-primary-color transition-colors duration-300">
              <p className="text-lg font-medium text-gray-700">Highest Marks</p>
              <p className="text-2xl font-bold">{highestMarks}</p>
            </div>
            <div className="text-center bg-secondary-color p-4 rounded-lg hover:text-primary-color transition-colors duration-300">
              <p className="text-lg font-medium text-gray-700">Lowest Marks</p>
              <p className="text-2xl font-bold">{lowestMarks}</p>
            </div>
          </div>

          {/* Bar Chart for individual topic marks */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-4 hover:text-primary-color">
              Marks by Quiz Topic
            </h3>
            <div className="flex justify-center">
              <BarChart width={600} height={300} data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="quizTitle" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="marks" fill="#d192b7" />
              </BarChart>
            </div>
          </div>

          {/* Line Chart for progress over time */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4 hover:text-primary-color">
              Progress Over Time
            </h3>
            <div className="flex justify-center">
              <LineChart width={600} height={300} data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="attempt" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="marks" stroke="#8e49b6" />
              </LineChart>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
