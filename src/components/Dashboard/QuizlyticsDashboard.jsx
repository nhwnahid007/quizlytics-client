import React from "react";
import { FiUsers, FiCheckCircle, FiBarChart, FiClock } from "react-icons/fi";

const QuizlyticsDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Dashboard Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Quizlytics Dashboard</h1>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Quizzes Attempted */}
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex justify-center items-center mr-4">
            <FiBarChart className="text-gray-500" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Quizzes Attempted</p>
            <p className="text-xl font-bold">12,450</p>
            <p className="text-sm text-green-500">+5.2%</p>
          </div>
        </div>

        {/* Best Performance */}
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex justify-center items-center mr-4">
            <FiCheckCircle className="text-gray-500" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Best Performance</p>
            <p className="text-xl font-bold">98%</p>
            <p className="text-sm text-green-500">+2.8%</p>
          </div>
        </div>

        {/* Total Users */}
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex justify-center items-center mr-4">
            <FiUsers className="text-gray-500" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Users</p>
            <p className="text-xl font-bold">5,921</p>
            <p className="text-sm text-green-500">+3.6%</p>
          </div>
        </div>

        {/* Quiz History */}
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex justify-center items-center mr-4">
            <FiClock className="text-gray-500" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Quiz History</p>
            <p className="text-xl font-bold">Last 30 Days</p>
            <p className="text-sm text-green-500">+1.9%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizlyticsDashboard;
