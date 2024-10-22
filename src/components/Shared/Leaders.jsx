"use client";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Image from "next/image";
import { getLeaders } from "@/requests/get";

const Leaders = () => {
  const [leaders, setLeaders] = useState([]);

  const currentDate = new Date();
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const currentMonth = monthNames[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();

  useEffect(() => {
    const getAllLeaders = async () => {
      try {
        const data = await getLeaders();
        setLeaders(data);
      } catch (error) {
        console.log("Data fetching error", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong while fetching leaderboard data!",
          toast: true,
        });
      }
    };
    getAllLeaders();
  }, []);

  return (
    <div className="leaderboard-container mb-8 mt-7 mx-5">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-center text-blue-600 text-3xl font-bold mb-6">
          Leaderboard
        </h1>

        <div className="leaderboard bg-[#ADD8E6] p-6 rounded-lg shadow-lg">
          <div className="flex justify-between mb-4">
            <h2 className=" text-xl font-semibold">
              {currentMonth} {currentYear}
            </h2>
          </div>

          {/* Leaderboard Top 3 */}
          <div className="leaderboard-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-end ">
            {/* 1st place */}
            {leaders.slice(0, 3).map((leader, index) => (
              <div key={leader._id} className="flex flex-col items-center justify-center">
                <div className="flex flex-col items-center">
                  <Image
                    src={leader.userImg || "/default-user.png"} 
                    alt="user"
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                  <h3 className="text-lg font-semibold mt-2">
                    {leader.userName || "No Name show"}
                  </h3>
                  <p className="">QP: {leader.marks || 0}%</p>
                </div>
                <div className={`w-16 h-16 rounded-t-lg mt-4 flex justify-center items-center ${index === 0 ? 'bg-[#FFD700]' : index === 1 ? 'bg-[#C0C0C0]' : 'bg-[#CD7F32]'}`}>
                  <span className={`text-${index === 0 ? '2xl' : 'xl'} font-bold`}>{index + 1}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Other ranks */}
          <div className="mt-6">
            {leaders.slice(3).map((leader, idx) => (
              <div
                key={leader._id}
                className="flex items-center justify-between bg-blue-500 p-4 rounded-lg mb-4"
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
                    <h4 className=" font-bold">{leader.userName}</h4>
                    <p className="">QP: {leader.marks || 0}%</p>
                  </div>
                </div>
                <span className="font-bold text-lg">
                  {idx + 4}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Leaders;
