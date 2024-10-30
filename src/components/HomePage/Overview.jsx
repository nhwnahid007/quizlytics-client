'use client'
import AOS from 'aos';
import 'aos/dist/aos.css';
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import axios from 'axios';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from 'lucide-react'; // Import the icons
import { toast } from 'react-toastify';

const Overview = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [chartData, setChartData] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const correctAnswer = "B) Building scalable server-side applications"; // Update the correct answer

  const handleCheckAnswer = () => {
    if (selectedOption) {
      const isAnswerCorrect = selectedOption === correctAnswer;
      setIsCorrect(isAnswerCorrect);
      setIsDialogOpen(true);
    } else {
      toast.error("Please select an option first.");
    }
  };

  // Fetch examinee data
  const fetchExaminees = async () => {
    try {
      const res = await axios.get("https://quizlytics.jonomukti.org/allExaminee");
      const data = res.data;

      // Process data to count quizzes per category
      const quizCategoryCounts = data.reduce((acc, item) => {
        acc[item.quizCategory] = (acc[item.quizCategory] || 0) + 1;
        return acc;
      }, {});

      // Format the data for the BarChart
      const formattedData = Object.keys(quizCategoryCounts).map((category) => ({
        quizCategory: category,
        count: quizCategoryCounts[category],
      }));

      setChartData(formattedData);
    } catch (error) {
      console.error("Error fetching examinees:", error);
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    // Call the function to fetch examinee data when the component mounts
    fetchExaminees();
  }, []);

  return (
    <div className=" py-8 bg-gray-100">
      <div className="w-[90%]  max-w-6xl mx-auto">
        <h1
          className="text-4xl font-bold text-center text-semibold"
          style={{ color: "#2C2F33" }}
        >
          Activities Overview
        </h1>

        {/* Trending Topics & Question Type */}
        <div className="flex flex-col lg:flex-row gap-8 mt-12">
          <div
            className="w-full lg:w-[65%] bg-white bg-opacity-90 rounded-2xl p-8"
            style={{ color: "#2C2F33" }}
          >
            <h2 className="text-3xl font-bold pb-2 mb-4 text-semibold">
              Trending Topics
            </h2>
            <div className="flex justify-center">
              <BarChart width={600} height={300} data={chartData}>
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis dataKey="quizCategory" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </div>
          </div>
     
          <div
            className="w-full lg:w-[35%] bg-white bg-opacity-90 rounded-2xl p-8"
            style={{ color: "#2C2F33" }}
          >
            <h2 className="text-3xl font-bold border-b-2 border-gray-300 pb-2 mb-8 text-semibold">
              DemoQuestion Type
            </h2>
            <h3 className="text-xl font-semibold text-semibold">
              What is the primary use of Node.js in the MERN stack?
            </h3>
            <div >
              <ul className="mt-3 space-y-2">
                {[
                  "A) Handling client-side rendering",
                  "B) Building scalable server-side applications",
                  "C) Managing the application's state",
                  "D) Optimizing network performance"
                ].map((option, index) => (
                  <li
                    key={index}
                    className={`flex items-center border-2 border-gray-300 py-2 px-4 rounded-xl ${
                      selectedOption === option ? "bg-secondary-color opacity-80" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      id={`option${index}`}
                      name="question"
                      className="mr-2"
                      onChange={() => setSelectedOption(option)}
                    />
                    <label htmlFor={`option${index}`} className="text-semibold">
                      {option}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <button onClick={handleCheckAnswer} className="mt-4 bg-primary-color text-white py-2 px-4 rounded">
              Check
            </button>
          </div>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <button className="mt-4 bg-primary-color text-white py-2 px-4 rounded">
              Check
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                <div className="flex items-center">
                  {isCorrect ? (
                    <>
                      <CheckCircle color="green" size={24} className="mr-2" />
                      <span>Correct Answer!</span>
                    </>
                  ) : (
                    <>
                      <XCircle color="red" size={24} className="mr-2" />
                      <span>Incorrect Answer</span>
                    </>
                  )}
                </div>
              </DialogTitle>
              <DialogDescription>
                {isCorrect ? (
                  <p>Your answer is correct!</p>
                ) : (
                  <p>
                    Your answer is incorrect. <br /> The correct answer is: {correctAnswer}
                  </p>
                )}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Achievement */}
        <div className="flex flex-col lg:flex-row gap-8 mt-8 lg:pr-8">
          <div
            className="w-full lg:w-1/2 bg-white bg-opacity-90 rounded-2xl p-8"
            style={{ color: "#2C2F33" }}
          >
            <div className="flex flex-col md:flex-row gap-8">
              <div className="relative w-[120px] h-[120px] md:w-[500px] md:h-[104px]">
                <Image
                  src={"https://i.ibb.co/S36XTTY/schedule-3652191.png"}
                  alt="achievement"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-4 text-semibold">Time</h1>
                <p>
                  In QuizApp, each quiz has a time limit, challenging users to
                  answer quickly and accurately. The timer adds excitement and
                  tests quick thinking skills. Completing quizzes within the
                  allotted time enhances decision-making skills while fostering
                  a sense of urgency and excitement.
                </p>
              </div>
            </div>
          </div>
          <div
            className="w-full lg:w-1/2 bg-white bg-opacity-90 rounded-2xl p-8"
            style={{ color: "#2C2F33" }}
          >
            <div className="flex flex-col md:flex-row gap-8">
              <div className="relative w-[120px] h-[120px] md:w-[500px] md:h-[104px]">
                <Image
                  src={"https://i.ibb.co/wWN0M1T/badge-2583264.png"}
                  alt="achievement"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-4 text-semibold">
                  Achievement
                </h1>
                <p>
                  A Quiz Win Achievement marks success in mastering quiz topics.
                  It reflects knowledge and effort, boosting confidence and
                  encouraging further engagement with quizzes. It&apos;s a
                  recognition of intellectual growth and accomplishment in the
                  quiz community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
