"use client";
import { allCustomQuiz } from "@/requests/get";
import { useState, useEffect } from "react";
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
import { RiDeleteBinLine } from "react-icons/ri";
import useAllQuiz from "@/app/hooks/useAllQuiz";
import axios from "axios";
import Swal from "sweetalert2";

const Page = () => {
  const [AllQuiz, refetch] = useAllQuiz();
  console.log("AllQuiz", AllQuiz);
  const [allQuiz, setAllQuiz] = useState([]);
  const [deleteQuiz, setDeleteQuiz] = useState(false);

  const handleDelete = async (id) => {
    console.log("Delete", id);

    Swal.fire({
      title: "Are you sure?",
      toast: true,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `https://quizlytics.jonomukti.org/deleteCustomQuiz?qKey=${id}`
          )
          .then(() => {
            refetch();
            Swal.fire({
              title: "Deleted!",
              toast: true,
              text: "Quiz set has been deleted.",
              icon: "success",
            });
          });
      }
    });
  };

  return (
    <div className="my-12 mx-6">
      <main className="max-w-6xl mx-auto">
        <Table>
          <TableCaption>ALL CUSTOM QUESTIONS</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">SI</TableHead>
              <TableHead className="w-[100px]">Quiz Code</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              {/* <TableHead>View Quiz</TableHead> */}
              <TableHead>Quiz Creator</TableHead>
              <TableHead className="text-center">Number of Qusetions</TableHead>
              <TableHead className="text-right">Delete Quiz</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {AllQuiz.map((item, idx) => (
              <TableRow key={item.quizStartKey}>
                <TableCell className="font-medium">{idx + 1}</TableCell>
                <TableCell className="font-medium">
                  {item.quizStartKey}
                </TableCell>
                <TableCell>{item.quizTitle}</TableCell>
                <TableCell>{item.quizCategory}</TableCell>
                {/* <TableCell>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </TableCell> */}
                <TableCell>{item.quizCreator}</TableCell>
                <TableCell className="text-center">
                  {item.quizArr.length}
                </TableCell>

                <TableCell className="text-right">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(item.quizStartKey)}
                  >
                    <RiDeleteBinLine className="mr-1" />
                    Delete
                  </Button>
                  {/* <AlertDialog>
                    <AlertDialogTrigger>
                      <Button variant="destructive" size="sm">
                        <RiDeleteBinLine className="mr-1" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete Quiz-set{" "}
                          <span className="font-bold">{item.quizStartKey}</span>{" "}
                          and remove the data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(item.quizStartKey)}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </div>
  );
};

export default Page;
