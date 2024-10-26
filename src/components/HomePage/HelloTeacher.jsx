


import Image from "next/image";
import React from "react";

const HelloTeacher = () => {


  return (
    <div className="my-auto  mt-10 flex gap-10 flex-col md:text-center md:items-center lg:flex-row p-4 md:p-8">
      <div className="flex-1 lg:pl-14 ">
          <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">
            Hello Teachers!
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">
            Add Interactivity to your Teaching
          </h2>
          <p className="text-base md:text-lg mb-2 md:mb-4 opacity-80 text-justify">
            A quiz can teach anything to your students. From primary school to
            university, quizzes make education more engaging and fun. You can also
            test the knowledge of your students and view their results in real time.
            Your quiz automatically records the participants and their answers.
            In the report, you have access to the participants&apos; answers, the
          time they spent on your quiz, and their score.
          </p>
          
      </div>
      <div className="flex-1">
        <Image
          src="https://svgshare.com/i/1BcG.svg"
          alt="Quiz Illustration"
          width={500}
          height={500}
          className="max-w-full h-auto"
        />
      </div>
    </div>
  );
};

export default HelloTeacher;
