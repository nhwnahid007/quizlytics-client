"use client";
import { getExaminees } from "@/requests/get"; 
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

const ExamineeList = () => {
  const [examinees, setExaminees] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [itemsPerPage] = useState(5); 

  
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

  
  const totalPages = Math.ceil(examinees.length / itemsPerPage);

  
  const currentExaminees = examinees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

 
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
   <div>
            <div className="text-center mt-5 text-3xl font-bold">
                        All Examinees
                        
            </div>
             <div className="my-5 mx-6">
      <main className="max-w-6xl mx-auto">
     
        <Table>
          <TableCaption>Examinee List</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-start">#</TableHead>
              <TableHead className="text-center">Photo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Quiz Title</TableHead>
              <TableHead>Marks</TableHead>
              <TableHead className="text-right">Examiner&apos;s Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentExaminees?.map((examinee, idx) => (
              <TableRow key={examinee._id}>
                <TableCell className="font-bold">
                  {(currentPage - 1) * itemsPerPage + idx + 1} 
                </TableCell>
                <TableCell className="text-center">
                  <Image
                    src={examinee.userImg || "/default-avatar.png"} 
                    alt={examinee.userName}
                    width={64} 
                    height={64} 
                    className="rounded-full" 
                  />
                </TableCell>
                <TableCell>{examinee.userName}</TableCell> 
                <TableCell>{examinee.userEmail}</TableCell> 
                <TableCell>{examinee.quizTitle}</TableCell> 
                <TableCell>{examinee.marks}%</TableCell>
                <TableCell className="text-right">{examinee.quizCreator}</TableCell> 
              </TableRow>
            ))}
          </TableBody>
        </Table>

      
        <div className="flex justify-center mt-4 space-x-2">
          
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md ${
              currentPage === 1 ? "bg-gray-300" : "bg-primary text-white"
            }`}
          >
            Previous
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
            Next
          </button>
        </div>
      </main>
    </div>
   </div>
  );
};

export default ExamineeList;
