'use client'
import { getMarks } from '@/requests/get';
import React, { useEffect, useState } from 'react';

const page = () => {
    const [marks,setMarks] = useState([])
    useEffect(() => {
        const allmarks = async () => {
          try {
            const data = await getMarks('saleh01715972188@gmail.com');
            setMarks(data);
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
        allmarks();
      }, []);
    console.log(marks)
    return (
        <div>
          <p>Total Exams attempted {marks.length}</p>
        </div>
    );
};

export default page;