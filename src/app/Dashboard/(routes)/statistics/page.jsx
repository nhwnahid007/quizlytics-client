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
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import LoadingSpinner from '@/components/Spinner/LoadingSpinner';


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Page = () => {
  const { data: session } = useSession();
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
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

  const pieChartData = [
    { name: 'Low (0-40)', value: marks.filter((item) => item.marks <= 40).length },
    { name: 'Medium (41-70)', value: marks.filter((item) => item.marks > 40 && item.marks <= 70).length },
    { name: 'High (71-100)', value: marks.filter((item) => item.marks > 70).length },
  ];

  return (
    <div className="flex flex-col lg:flex items-center justify-center min-h-screen bg-gray-50 p-4">
      {loading ? (
        <LoadingSpinner />
      ) : marks.length === 0 ? (
        <p className="md:text-5xl text-sm font-semibold text-gray-600">No exam given yet.</p>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl w-full">
          <h2 className="text-2xl font-bold text-primary-color mb-4 text-center">
            Exam Statistics
          </h2>
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="text-center bg-gray-100 p-4 rounded-lg transition-colors duration-300">
              <p className="text-lg font-medium text-primary-color">Total Exams Attempted</p>
              <p className="text-2xl font-bold">{totalExams}</p>
            </div>
            <div className="text-center bg-gray-100 p-4 rounded-lg transition-colors duration-300">
              <p className="text-lg font-medium text-primary-color">Average Marks</p>
              <p className="text-2xl font-bold">{averageMarks}</p>
            </div>
            <div className="text-center bg-gray-100 p-4 rounded-lg  transition-colors duration-300">
              <p className="text-lg font-medium text-primary-color">Highest Marks</p>
              <p className="text-2xl font-bold">{highestMarks}</p>
            </div>
            <div className="text-center bg-gray-100 p-4 rounded-lg  transition-colors duration-300">
              <p className="text-lg font-medium text-primary-color">Lowest Marks</p>
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
                <Bar dataKey="marks" fill="#8e49b6" />
              </BarChart>
            </div>
          </div>

          {/* Line Chart for progress over time */}
          <div className="mb-8">
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

          {/* Pie Chart for marks distribution */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4 hover:text-primary-color">
              Marks Distribution
            </h3>
            <div className="flex justify-center">
              <PieChart width={400} height={400}>
                <Pie
                  data={pieChartData}
                  cx={200}
                  cy={200}
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
