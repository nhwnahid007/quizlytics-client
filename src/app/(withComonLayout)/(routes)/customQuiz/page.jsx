import QuizScreen from "@/components/QuizPage/QuizScreen";

import { useState } from "react";

const page = () => {
  const [quizKey, setQuizKey] = useState(null);

  const handleChange = (e) => {
    setQuizKey(e.target.value);
  };

  console.log(quizKey);

  return (
    <div>
      <div className="mb-4">
        <label className="block text-gray-700"></label>
        <input
          type="text"
          name="question"
          value={questionData.question}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
      </div>
      {/* <QuizScreen /> */}
    </div>
  );
};

export default page;
