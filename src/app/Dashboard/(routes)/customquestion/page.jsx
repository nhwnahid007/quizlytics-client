"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";

const Page = () => {
  const [quizKey, setQuizKey] = useState(1234);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  const { data: session } = useSession();
  const email = session?.user?.email;

  function generateRandomKey() {
    const numbers = "0123456789";
    const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let key = "";

    // Generate 4 random numbers
    for (let i = 0; i < 4; i++) {
      key += numbers[Math.floor(Math.random() * numbers.length)];
    }

    // Generate 2 random alphabets
    for (let i = 0; i < 2; i++) {
      key += alphabets[Math.floor(Math.random() * alphabets.length)];
    }

    return key;
  }

  // console.log("random key", generateRandomKey());

  const newKey = generateRandomKey();

  useEffect(() => {
    setQuizKey(newKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [questionData, setQuestionData] = useState({
    question: "",
    options: ["", "", "", ""],
    correct_answer: "",
  });

  const [questions, setQuestions] = useState([]);

  // console.log(questions);

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestionData({
      ...questionData,
      [name]: value,
    });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...questionData.options];
    newOptions[index] = value;
    setQuestionData({
      ...questionData,
      options: newOptions,
    });
  };

  const addQuestion = () => {
    if (
      questionData.question &&
      questionData.options.every((option) => option !== "") &&
      questionData.correct_answer !== ""
    ) {
      const newQuestion = {
        id: questions.length + 1,
        question: questionData.question,
        options: questionData.options,
        correct_answer: questionData.correct_answer,
      };

      setQuestions([...questions, newQuestion]);

      // Reset form
      setQuestionData({
        question: "",
        options: ["", "", "", ""],
        correct_answer: "",
      });
      // console.log(questionData);
    } else {
      alert("Please fill in all fields before adding the question.");
    }
  };

  const quizSet = {
    quizTitle: title,
    quizCategory: category,
    quizStartKey: quizKey,
    quizArr: questions,
    quizCreator: email,
  };

  const submitQuestions = async () => {
    try {
      // Replace with your backend API endpoint
      const response = await axios.post(
        "https://quizlytics.jonomukti.org/saveManualQuiz",
        quizSet
      );
      Swal.fire({
        title: "Success!",
        toast: true,
        text: "Quiz saved successfully",
        icon: "success",
        timer: 2000,
      });
      console.log("Questions submitted successfully:", response.data);
      console.log(questions);
      // Clear the questions array after submission
      setQuestions([]);
      setQuizKey(newKey);
    } catch (error) {
      console.error("Error submitting questions:", error);
    }
  };

  return (
    <div className="my-12">
      <main className="max-w-6xl mx-auto">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Create Custom Questions</h1>

          <div className="mb-4">
            <label className="block text-gray-700">Quiz Start Key:</label>
            <Input
              type="text"
              value={quizKey}
              className="w-full p-2 border border-gray-300 rounded mt-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Quiz Title</label>
            <Input
              type="text"
              name="quizTitle"
              onChange={handleChangeTitle}
              className="w-full p-2 border border-gray-300 rounded mt-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Category</label>
            <Input
              type="text"
              onChange={handleChangeCategory}
              className="w-full p-2 border border-gray-300 rounded mt-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Question:</label>
            <Input
              type="text"
              name="question"
              value={questionData.question}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Options:</label>
            {questionData.options.map((option, index) => (
              <Input
                key={index}
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
                className="w-full p-2 border border-gray-300 rounded mt-2"
              />
            ))}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Correct Answer (0-3):</label>
            <Input
              type="number"
              name="correct_answer"
              value={questionData.correct_answer}
              onChange={handleChange}
              min="0"
              max="3"
              className="w-full p-2 border border-gray-300 rounded mt-2"
            />
          </div>

          <Button
            variant="secondary"
            onClick={addQuestion}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Add Question
          </Button>

          <div className="mt-8">
            {questions.length > 0 && (
              <h2 className="text-xl font-semibold mb-4">Questions Preview</h2>
            )}
            {questions.map((q) => (
              <div
                key={q.id}
                className="mb-4 p-4 border border-gray-300 rounded"
              >
                <h3 className="font-semibold">{q.question}</h3>
                <ul className="list-disc list-inside">
                  {q.options.map((option, index) => (
                    <li key={index}>
                      {index}: {option}
                    </li>
                  ))}
                </ul>
                <p>Correct Answer: {q.correct_answer}</p>
              </div>
            ))}

            {questions.length > 0 && (
              <Button
                variant="secondary"
                onClick={submitQuestions}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mt-4"
              >
                Submit Questions
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
