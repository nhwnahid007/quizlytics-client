"use client";
import { allCustomQuiz } from "@/requests/get";
import { useState, useEffect } from "react";

const page = () => {
  const [allQuiz, setAllQuiz] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAllMCQ = async () => {
      try {
        setAllQuiz([]);
        const data = await allCustomQuiz();
        console.log(data);
        setAllQuiz(data);
        setIsLoading(false);
        // console.log(allQuestions);
      } catch (error) {
        console.log("data fetching error", error);
      }
    };
    getAllMCQ();
  }, []);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th className="text-center"></th>
              <th className="text-center">Quiz Title</th>
              <th className="text-center">Quiz Key</th>
              <th className="text-center">Number of Question</th>
            </tr>
          </thead>
          <tbody>
            {allQuiz.map((item, idx) => (
              <tr key={item.quizStartKey} className="bg-base-200">
                <th className="text-center">{idx + 1}</th>
                <td className="text-center">{item.quizTitle}</td>
                <td className="text-center">{item.quizStartKey}</td>
                <td className="text-center">{item.quizArr.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
