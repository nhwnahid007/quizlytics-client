"use client";
import { getMarks } from "@/requests/get";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import moment from "moment/moment";
import useRouterHook from "@/app/hooks/useRouterHook";

const QuizHistory = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [history, setHistory] = useState([]);

  const router = useRouterHook();

  const { data: session } = useSession();
  const email = session?.user?.email;

  useEffect(() => {
    const getQuizHistory = async () => {
      try {
        setHistory([]);
        const data = await getMarks(email);
        setHistory(data);
        setIsLoading(false);
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
    getQuizHistory();
  }, [email]);

  const handleDetails = (id) => {
    router.push(`/Dashboard/viewHistory/${id}`);
  };

  return (
    <div className="h-screen max-w-6xl mx-auto pt-20">
      <h1 className="text-center text-3xl  font-extrabold  mb-8">
        Quiz History
      </h1>
      <div>
        <Table>
          <TableCaption>A list of your attemots in Custom Quiz.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Date</TableHead>
              <TableHead>Quiz On</TableHead>
              <TableHead>Examiner</TableHead>
              <TableHead className="text-center">Marks Obtained</TableHead>
              <TableHead className="text-right">Attempt Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.map((item) => (
              <TableRow key={item._id}>
                <TableCell className="font-medium">
                  {moment(item.date).format("MMMM Do YYYY")}
                </TableCell>
                <TableCell>{item.quizCategory}</TableCell>
                <TableCell>{item.quizCreator}</TableCell>
                <TableCell className="text-center">{item.marks}%</TableCell>
                <TableCell className="text-right">
                  <Button
                    onClick={() => handleDetails(item._id)}
                    className="bg-primary-color"
                  >
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default QuizHistory;
