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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  const totalPages = Math.ceil(AllQuiz.length / itemsPerPage);
  const currentQuizzes = AllQuiz.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = async (id) => {
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
    <div className="my-8 mx-6">
      <main className="max-w-6xl mx-auto">
        <h1 className="text-3xl text-center font-extrabold mb-4">
          All Custom Questions
        </h1>
        <div className="lg:h-[450px]">
          <Table>
            <TableHeader>
              <TableRow className="">
                <TableHead className="w-[50px]">SI</TableHead>
                <TableHead className="w-[120px]">Quiz Code</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Quiz Creator</TableHead>
                <TableHead className="text-center">Number of Questions</TableHead>
                <TableHead className="text-right">Delete Quiz</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentQuizzes.map((item, idx) => (
                <TableRow key={item.quizStartKey}>
                  <TableCell className="font-medium">
                    {(currentPage - 1) * itemsPerPage + idx + 1}
                  </TableCell>
                  <TableCell className="font-medium">{item.quizStartKey}</TableCell>
                  <TableCell>{item.quizTitle}</TableCell>
                  <TableCell>{item.quizCategory}</TableCell>
                  <TableCell>{item.quizCreator}</TableCell>
                  <TableCell className="text-center">{item.quizArr.length}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(item.quizStartKey)}
                    >
                      <RiDeleteBinLine className="mr-1" />
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-4 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md ${
              currentPage === 1 ? "bg-gray-300" : "bg-primary text-white"
            }`}
          >
            &#8592; {/* Left arrow for previous */}
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded-md ${
                currentPage === index + 1
                  ? "bg-primary text-white"
                  : "bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md ${
              currentPage === totalPages ? "bg-gray-300" : "bg-primary text-white"
            }`}
          >
            &#8594; {/* Right arrow for next */}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Page;
