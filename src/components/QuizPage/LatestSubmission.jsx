"use client";
import { getSubmissionByKey, getSubmissionByQuizTitle } from "@/requests/get";
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
      try {
        if (quizKey) {
          setLatestSubmission([]);
          const data = await getSubmissionByKey(quizKey, email);
          setLatestSubmission(data.at(-1));
          setIsLoading(false);
        } else {
          setLatestSubmission([]);
          const data = await getSubmissionByQuizTitle(searchCategory, email);
          console.log("quick data", data);
          setLatestSubmission(data.at(-1));
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
      <h2 className="text-center">YOUR LATEST SUBMISSION</h2>

      {!isLoading &&
        latestSubmission?.questions?.map((item, idx) => (
          <SubmitCard
            key={item._id}
            item={item}
            markedAnswer={latestSubmission.answers[idx]}
          />
        ))}
    </div>
  );
};

export default LatestSubmission;
