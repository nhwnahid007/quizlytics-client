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

const Page = () => {
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
    // <div>
    //   <div className="overflow-x-auto">
    //     <table className="table">
    //       {/* head */}
    //       <thead>
    //         <tr>
    //           <th className="text-center"></th>
    //           <th className="text-center">Quiz Title</th>
    //           <th className="text-center">Quiz Key</th>
    //           <th className="text-center">Number of Question</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {allQuiz.map((item, idx) => (
    //           <tr key={item.quizStartKey} className="bg-base-200">
    //             <th className="text-center">{idx + 1}</th>
    //             <td className="text-center">{item.quizTitle}</td>
    //             <td className="text-center">{item.quizStartKey}</td>
    //             <td className="text-center">{item.quizArr.length}</td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   </div>
    // </div>
    <div>
      <main className="max-w-6xl mx-auto my-12">
        <Table>
          <TableCaption>ALL CUSTOM QUESTIONS</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Quiz Code</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>View Quiz</TableHead>
              <TableHead>Quiz Creator</TableHead>
              <TableHead className="text-center">Number of Qusetions</TableHead>
              <TableHead>Update Quiz</TableHead>
              <TableHead className="text-right">Delete Quiz</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allQuiz.map((item) => (
              <TableRow key={item.quizStartKey}>
                <TableCell className="font-medium">
                  {item.quizStartKey}
                </TableCell>
                <TableCell>{item.quizTitle}</TableCell>
                <TableCell>
                  <Button variant="outline">View</Button>
                </TableCell>
                <TableCell>{item.creatorEmail}</TableCell>
                <TableCell className="text-center">
                  {item.quizArr.length}
                </TableCell>
                <TableCell>
                  <Button variant="secondary">Update</Button>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="destructive">Delete</Button>
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
