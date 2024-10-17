"use client";
import { getLeaders } from "@/requests/get";
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
import Image from "next/image";

const Leaders = () => {
  const [leaders, setLeaders] = useState();
  //   console.log(leaders);

  useEffect(() => {
    const getAllLeaders = async () => {
      try {
        setLeaders([]);
        const data = await getLeaders();
        // console.log("leaders", data);
        setLeaders(data);
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
    getAllLeaders();
  }, []);
  return (
    <div className="my-12 mx-6">
      <main className="max-w-6xl mx-auto">
        <Table>
          <TableCaption>Leaderboard</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-start">Position</TableHead>
              <TableHead className="text-center">Photo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Quiz Category</TableHead>
              <TableHead>Quiz Title</TableHead>
              <TableHead>Quiz Key</TableHead>
              <TableHead>% Marks</TableHead>
              <TableHead className="text-right">Examiner's Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaders?.map((item, idx) => (
              <TableRow key={item._id}>
                <TableCell className="font-bold">{idx + 1}</TableCell>
                <TableCell className="font-medium">
                  <Image
                    src={item.userImg}
                    alt="user"
                    width={64} // Explicitly set the width
                    height={64} // Explicitly set the height
                    className="rounded-full w-full h-full"
                  />
                </TableCell>
                <TableCell>{item.userName}</TableCell>
                <TableCell>{item.userEmail}</TableCell>
                <TableCell>{item.quizCategory}</TableCell>
                <TableCell>{item.quizTitle}</TableCell>
                <TableCell>{item.quizStartKey}</TableCell>
                <TableCell>{item.marks}%</TableCell>
                <TableCell className="text-right">{item.quizCreator}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </div>
  );
};

export default Leaders;
