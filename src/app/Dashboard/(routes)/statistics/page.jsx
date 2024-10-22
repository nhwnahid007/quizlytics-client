'use client'
import { getMarks } from '@/requests/get';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useSession } from 'next-auth/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';

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
        console.error("Data fetching error", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong while fetching leaderboard data!",
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
    const highestMarks = Math.max(...marks.map(item => item.marks));
    const lowestMarks = Math.min(...marks.map(item => item.marks));

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

  return (
    <div>
      {marks.length === 0 ? (
        <p>No exam given yet.</p>
      ) : (
        <div>
          <p>Total Exams attempted: {totalExams}</p>
          <p>Average Marks: {averageMarks}</p>
          <p>Highest Marks: {highestMarks}</p>
          <p>Lowest Marks: {lowestMarks}</p>

          {/* Bar Chart for individual topic marks */}
          <h3>Marks by Quiz Topic</h3>
          <BarChart width={600} height={300} data={barChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="quizTitle" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="marks" fill="#8884d8" />
          </BarChart>

          {/* Line Chart for progress over time */}
          <h3>Progress Over Time</h3>
          <LineChart width={600} height={300} data={lineChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="attempt" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="marks" stroke="#82ca9d" />
          </LineChart>
        </div>
      )}
    </div>
  );
};

export default Page;
