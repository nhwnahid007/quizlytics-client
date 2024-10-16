"use client";
import { getSubmissionByKey } from "@/requests/get";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const LatestSubmission = () => {
  const [latestSubmission, setLatestSubmission] = useState();

  const { data: session } = useSession();
  const email = session?.user?.email;

  const key = "HT2344";

  useEffect(() => {
    const getLatestSubmission = async (key, email) => {
      try {
        setLatestSubmission([]);
        const data = await getSubmissionByKey(key, email);
        setLatestSubmission(data);
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
  }, [key, email]);

  console.log("Latest submittion", latestSubmission);
  return <div>LatestSubmission here...</div>;
};

export default LatestSubmission;
