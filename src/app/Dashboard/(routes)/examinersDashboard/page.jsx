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
    <div>
      <main className="max-w-6xl mx-auto my-12">
        <Table>
          <TableCaption>ALL CUSTOM QUESTIONS</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">SI</TableHead>
              <TableHead className="w-[100px]">Quiz Code</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>View Quiz</TableHead>
              <TableHead>Quiz Creator</TableHead>
              <TableHead className="text-center">Number of Qusetions</TableHead>
              <TableHead className="text-right">Delete Quiz</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allQuiz.map((item, idx) => (
              <TableRow key={item.quizStartKey}>
                <TableCell className="font-medium">{idx + 1}</TableCell>
                <TableCell className="font-medium">
                  {item.quizStartKey}
                </TableCell>
                <TableCell>{item.quizTitle}</TableCell>
                <TableCell>{item.quizCategory}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </TableCell>
                <TableCell>{item.quizCreator}</TableCell>
                <TableCell className="text-center">
                  {item.quizArr.length}
                </TableCell>

                <TableCell className="text-right">
                  <Button variant="destructive" size="sm">
                    Delete
                  </Button>
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
