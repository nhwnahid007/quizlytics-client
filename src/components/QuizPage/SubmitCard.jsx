"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

const SubmitCard = ({ item, markedAnswer }) => {
  const isCorrect = item.correct_answer == markedAnswer;

  return (
    <div className="mb-4">
      <Card>
        <CardHeader>
          <CardTitle>Question : {item.question}</CardTitle>
          <CardDescription>Options:</CardDescription>
        </CardHeader>
        <CardContent>
          {item.options.map((option, index) => (
            <li
              className={
                markedAnswer === index
                  ? isCorrect
                    ? "bg-green-500"
                    : "bg-red-500"
                  : ""
              }
              key={index}
            >
              {option}
            </li>
          ))}
        </CardContent>
        <CardFooter>
          <p>
            Correct Answer :{" "}
            {item.options.find(
              (answer) => answer == item.options[item.correct_answer]
            )}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SubmitCard;
