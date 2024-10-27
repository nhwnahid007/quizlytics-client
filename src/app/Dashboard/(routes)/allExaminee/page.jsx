"use client";
import { getExaminees } from "@/requests/get";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import useRole from "@/app/hooks/useRole";
import NotFound from "@/app/not-found";

const ExamineeList = () => {
  const [examinees, setExaminees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [quizStartKey, setQuizStartKey] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  const [role] = useRole();
  

  // Fetch examinees data
  useEffect(() => {
    const fetchExaminees = async () => {
      try {
        const data = await getExaminees();
        setExaminees(data);
      } catch (error) {
        console.error("Error fetching examinees", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong while fetching examinee data!",
          toast: true,
        });
      }
    };
    fetchExaminees();
  }, []);

  // Filter examinees based on name and quiz start key
  const filteredExaminees = examinees.filter(
    (examinee) =>
      typeof examinee.userName === "string" &&
      examinee.userName.toLowerCase().includes(nameFilter.toLowerCase()) &&
      examinee.quizStartKey.includes(quizStartKey)
  );

  // Pagination setup
  const totalPages = Math.ceil(filteredExaminees.length / itemsPerPage);
  const currentExaminees = filteredExaminees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleQuizStartKeyChange = (event) => {
    setQuizStartKey(event.target.value);
    setCurrentPage(1);
  };

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
    setCurrentPage(1);
  };

   
   // Check if the role is not "teacher" or "admin"
   if (role !== "teacher" && role !== "admin") {
    return <NotFound />; // Return NotFound component
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="text-center my-5 text-3xl font-bold">All Examinees</div>

      <div className="flex flex-col sm:flex-row justify-between mb-4 gap-3">
        <input
          type="text"
          value={quizStartKey}
          onChange={handleQuizStartKeyChange}
          placeholder="Filter by Quiz Start Key"
          className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring focus:ring-primary transition duration-300"
        />
        <input
          type="text"
          value={nameFilter}
          onChange={handleNameFilterChange}
          placeholder="Filter by Examinee Name"
          className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring focus:ring-primary transition duration-300"
        />
      </div>

      <div className="relative overflow-auto">
        <div className="overflow-hidden shadow-md h-[400px] sm:rounded-lg">
          <Table className="w-full min-w-full table-fixed">
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="w-[50px] text-left">#</TableHead>
                <TableHead className="text-center w-[80px]">Photo</TableHead>
                <TableHead className="w-[150px]">Name</TableHead>
                <TableHead className="w-[220px]">Email</TableHead>
                <TableHead className="w-[150px]">Quiz Title</TableHead>
                <TableHead className="w-[80px]">Marks</TableHead>
                <TableHead className="text-right w-[220px]">Examiner&apos;s Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentExaminees.map((examinee, idx) => (
                <TableRow
                  key={examinee._id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <TableCell className="font-semibold text-gray-600">
                    {(currentPage - 1) * itemsPerPage + idx + 1}
                  </TableCell>
                  <TableCell className="text-center">
                    <Image
                      src={examinee.userImg || "/default-avatar.png"}
                      alt={examinee.userName}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                  </TableCell>
                  <TableCell className="font-medium text-gray-700">
                    {examinee.userName}
                  </TableCell>
                  <TableCell className="font-light text-gray-500 truncate max-w-[200px]">
                    {examinee.userEmail}
                  </TableCell>
                  <TableCell className="font-light text-gray-500">
                    {examinee.quizTitle}
                  </TableCell>
                  <TableCell className="font-semibold text-gray-600">
                    {examinee.marks}%
                  </TableCell>
                  <TableCell className="text-right font-light text-gray-500 truncate max-w-[200px]">
                    {examinee.quizCreator}
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
      </div>
    </div>
  );
};

export default ExamineeList;
