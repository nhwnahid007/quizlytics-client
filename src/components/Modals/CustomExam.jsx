import React from "react";

const CustomExam = ({ setCustomExam, setQuizKey }) => {
  const handleChange = (e) => {
    setQuizKey(e.target.value);
  };
  const handleStart = () => {
    setCustomExam(false);
    console.log("exam started");
  };
  return (
    <div className="h-56 flex flex-col justify-center items-center">
      <div className="mb-4 text-center">
        <label className="block text-gray-200">Enter Quiz Key to Start</label>
        <input
          type="text"
          name="question"
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />

        <button
          onClick={handleStart}
          type="submit"
          className="btn btn-accent mt-4"
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default CustomExam;
