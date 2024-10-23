"use client";
import {
  getLinkHistoryByUser,
  getSubmissionByKey,
  getSubmissionByQuizTitle,
} from "@/requests/get";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import SubmitCard from "./SubmitCard";

const LatestSubmission = ({ quizKey, searchCategory }) => {
  const [isLoading, setIsLoading] = useState(true);

  const [latestSubmission, setLatestSubmission] = useState([]);

  const { data: session } = useSession();
  const email = session?.user?.email;
  const name = session?.user?.name;

  useEffect(() => {
    const getLatestSubmission = async () => {
      // setIsLoading(true);
      try {
        if (quizKey) {
          setLatestSubmission([]);
          const data = await getSubmissionByKey(quizKey, email);
          setLatestSubmission(data.at(-1));
          setIsLoading(false);
        } else if (searchCategory) {
          setLatestSubmission([]);
          const data = await getSubmissionByQuizTitle(searchCategory, email);
          console.log("quick data", data);
          setLatestSubmission(data.at(-1));
          setIsLoading(false);
        } else {
          setLatestSubmission([]);
          const data = await getLinkHistoryByUser(email);
          console.log("quick data", data);
          setLatestSubmission(data?.at(-1));
          setIsLoading(false);
        }
      } catch (error) {
        console.log("data fetching error", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!!!",
          toast: true,
        });
      }
    };
    getLatestSubmission();
  }, [quizKey, email, searchCategory]);

  return (
    <div className="h-auto max-w-6xl pt-20 mx-auto">
      <h2 className="text-center text-2xl font-bold my-2">
        YOUR LATEST SUBMISSION
      </h2>

      {isLoading ? (
        <div className="text-center">Loading your latest submission...</div>
      ) : latestSubmission?.questions?.length > 0 ? (
        latestSubmission.questions.map((item, idx) => (
          <SubmitCard
            key={item._id}
            item={item}
            markedAnswer={latestSubmission.answers[idx]}
          />
        ))
      ) : (
        <div className="text-center text-gray-500">No submissions found.</div>
      )}
    </div>
  );
};

export default LatestSubmission;
