"use client";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Image from "next/image";
import { getExaminees } from "@/requests/get";
import LoadingSpinner from "@/components/Spinner/LoadingSpinner"; // Import the spinner component
import { SectionTitleMinimal } from "./SectionTitle";

const Leaders = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true); // New state for loading

  const currentDate = new Date();
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const currentMonth = monthNames[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();

  useEffect(() => {
    const getAllExaminees = async () => {
      try {
        const data = await getExaminees();

        // Aggregate marks by userEmail and calculate average
        const examineeMap = data.reduce((acc, examinee) => {
          const { userEmail, marks } = examinee;
          if (!acc[userEmail]) {
            acc[userEmail] = { userEmail, marks: 0, count: 0, userName: examinee.userName, userImg: examinee.userImg };
          }
          acc[userEmail].marks += marks;
          acc[userEmail].count += 1;
          return acc;
        }, {});

        // Calculate average and get the top 5
        const averagedLeaders = Object.values(examineeMap)
          .map(examinee => ({
            ...examinee,
            marks: (examinee.marks / examinee.count).toFixed(2), // Calculate average and keep 2 decimals
          }))
          .sort((a, b) => b.marks - a.marks) // Sort by average marks in descending order
          .slice(0, 5); // Top 5

        setLeaders(averagedLeaders);
      } catch (error) {
        console.log("Data fetching error", error);
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
    getAllExaminees();
  }, []);

  return (
    <div className="leaderboard-container mb-8 mx-5">
      <main className="max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center my-5 font-bold text-gray-800">
            Leaderboard
          </h2>
          
       

        {loading ? (
          <LoadingSpinner /> // Display the loading spinner
        ) : (
          <div className="leaderboard  bg-gray-100 p-6 rounded-lg shadow-lg">
            <div className="flex justify-between mb-4">
              <h2 className=" text-xl font-semibold">
                {currentMonth} {currentYear}
              </h2>
            </div>

            {/* Leaderboard Top 3 */}
            <div className="leaderboard-grid grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
              {leaders.slice(0, 3).map((leader, index) => (
                <div key={leader.userEmail} className="flex flex-col items-center justify-center">
                  <div className="flex flex-col items-center">
                    <Image
                      src={leader.userImg || "/default-user.png"}
                      alt="user"
                      width={64}
                      height={64}
                      className="rounded-full"
                    />
                    <h3 className="text-lg font-semibold mt-2">
                      {leader.userName || "No Name"}
                    </h3>
                    <p>Average Marks: {leader.marks || 0}%</p>
                  </div>
                  <div className={`w-16 h-16 rounded-t-lg mt-4 bg-gray-300 flex justify-center items-center`}>
                    <span className={`text-${index === 0 ? '2xl' : 'xl'} font-bold`}>{index + 1}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Leaderboard 4th to 5th places */}
            <div className="mt-6">
              {leaders.slice(3).map((leader, idx) => (
                <div
                  key={leader.userEmail}
                  className="flex items-center justify-between bg-primary-color  p-4 rounded-lg mb-4"
                >
                  <div className="flex items-center space-x-4">
                    <Image
                      src={leader.userImg || "/default-user.png"}
                      alt="user"
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div>
                      <h4 className=" font-bold text-white">{leader.userName}</h4>
                      <p className="text-white">Average Marks: {leader.marks || 0}%</p>
                    </div>
                  </div>
                  <span className="font-bold text-white text-lg">
                    {idx + 4}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Leaders;
