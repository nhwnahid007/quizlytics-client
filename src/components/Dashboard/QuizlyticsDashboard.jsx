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
import { FiUsers, FiCheckCircle, FiBarChart, FiClock } from 'react-icons/fi';

const QuizlyticsDashboard = () => {
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

  // Function to determine a more dynamic performance trend
  const getPerformanceTrend = () => {
    if (marks.length < 2) return 'neutral'; // Not enough data for trend

    let recentImprovement = false;
    let recentDecline = false;
    let isFluctuating = false;

    // Analyzing only the last 3 attempts for more dynamic feedback
    const recentMarks = marks.slice(-3);

    // Check recent trend by comparing the last three results
    for (let i = 1; i < recentMarks.length; i++) {
      if (recentMarks[i].marks > recentMarks[i - 1].marks) {
        recentImprovement = true;
      } else if (recentMarks[i].marks < recentMarks[i - 1].marks) {
        recentDecline = true;
      }
    }

    // Check if the performance is fluctuating
    if (recentImprovement && recentDecline) {
      isFluctuating = true;
    }

    // Determine performance trend based on analysis
    if (isFluctuating) return 'fluctuating';
    if (recentImprovement) return 'improving';
    if (recentDecline) return 'decreasing';

    return 'neutral'; // Marks neither consistently increasing nor decreasing
  };

  const performanceTrend = getPerformanceTrend();

  const getProgressBarStyle = () => {
    switch (performanceTrend) {
      case 'improving':
        return 'bg-green-400';
      case 'decreasing':
        return 'bg-red-400';
      case 'fluctuating':
        return 'bg-orange-400'; // New color for fluctuating trend
      case 'neutral':
        return 'bg-yellow-400';
      default:
        return 'bg-gray-400';
    }
  };

  const getPerformanceRemark = () => {
    switch (performanceTrend) {
      case 'improving':
        return 'Great job! You are showing consistent improvement.';
      case 'decreasing':
        return 'Your performance has declined. Try reviewing your previous mistakes.';
      case 'fluctuating':
        return 'Your results are fluctuating. Focus on consistency!';
      case 'neutral':
        return 'Your performance is stable. Keep striving for improvement!';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Dashboard Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Quizlytics Dashboard</h1>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex justify-center items-center mr-4">
            <FiBarChart className="text-gray-500" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Quizzes Attempted</p>
            <p className="text-xl font-bold">{totalExams}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex justify-center items-center mr-4">
            <FiCheckCircle className="text-gray-500" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Best Performance</p>
            <p className="text-xl font-bold">{highestMarks}%</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex justify-center items-center mr-4">
            <FiUsers className="text-gray-500" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Users</p>
            <p className="text-xl font-bold">5,921</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex justify-center items-center mr-4">
            <FiClock className="text-gray-500" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Quiz History</p>
            <p className="text-xl font-bold">Last 30 Days</p>
          </div>
        </div>
      </div>

      {/* Performance remark section */}
      <div className={`w-full text-center py-4 mb-4 ${getProgressBarStyle()} relative`}>
        <p className="text-2xl font-bold text-white">
          {getPerformanceRemark()}
        </p>
      </div>

      {/* Charts and Statistics section */}
      {marks.length === 0 ? (
        <p className="text-lg font-semibold text-gray-600">No exam given yet.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bar Chart for individual topic marks */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Marks by Quiz Topic</h3>
            <div className="flex justify-center">
              <BarChart width={500} height={300} data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="quizTitle" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="marks" fill="#d192b7" />
              </BarChart>
            </div>
          </div>

          {/* Line Chart for performance trend */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Performance Trend Over Attempts</h3>
            <div className="flex justify-center">
              <LineChart width={500} height={300} data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="attempt" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="marks" stroke="#d192b7" activeDot={{ r: 8 }} />
              </LineChart>
            </div>
          </div>
        </div>
      )}

      {/* Additional statistics section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-lg font-medium text-gray-700">Total Exams Attempted</p>
          <p className="text-2xl font-bold">{totalExams}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-lg font-medium text-gray-700">Average Marks</p>
          <p className="text-2xl font-bold">{averageMarks}%</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-lg font-medium text-gray-700">Best Marks</p>
          <p className="text-2xl font-bold">{highestMarks}%</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-lg font-medium text-gray-700">Lowest Marks</p>
          <p className="text-2xl font-bold">{lowestMarks}%</p>
        </div>
      </div>
    </div>
  );
};

export default QuizlyticsDashboard;
