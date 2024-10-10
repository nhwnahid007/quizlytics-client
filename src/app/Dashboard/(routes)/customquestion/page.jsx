'use client';
import { useState } from 'react';
import axios from 'axios'; 
const Page = () => {
    const [questionData, setQuestionData] = useState({
        question: '',
        options: ['', '', '', ''],
        correct_answer: ''
      });
    
      const [questions, setQuestions] = useState([]);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setQuestionData({
          ...questionData,
          [name]: value
        });
      };
    
      const handleOptionChange = (index, value) => {
        const newOptions = [...questionData.options];
        newOptions[index] = value;
        setQuestionData({
          ...questionData,
          options: newOptions
        });
      };
    
      const addQuestion = () => {
        if (
          questionData.question &&
          questionData.options.every((option) => option !== '') &&
          questionData.correct_answer !== ''
        ) {
          const newQuestion = {
            id: questions.length + 1,
            question: questionData.question,
            options: questionData.options,
            correct_answer: questionData.correct_answer
          };
    
          setQuestions([...questions, newQuestion]);
    
          // Reset form
          setQuestionData({
            question: '',
            options: ['', '', '', ''],
            correct_answer: ''
          });
        } else {
          alert('Please fill in all fields before adding the question.');
        }
      };
    
      const submitQuestions = async () => {
        try {
          // Replace with your backend API endpoint
          const response = await axios.post('https://quizlytics.jonomukti.org/saveManualQuiz', questions);
          console.log('Questions submitted successfully:', response.data);
          // Clear the questions array after submission
          setQuestions([]);
        } catch (error) {
          console.error('Error submitting questions:', error);
        }
      };
    
      return (
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Create Custom Questions</h1>
    
          <div className="mb-4">
            <label className="block text-gray-700">Question:</label>
            <input
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
              <input
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
            <input
              type="number"
              name="correct_answer"
              value={questionData.correct_answer}
              onChange={handleChange}
              min="0"
              max="3"
              className="w-full p-2 border border-gray-300 rounded mt-2"
            />
          </div>
    
          <button
            onClick={addQuestion}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Add Question
          </button>
    
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Questions Preview</h2>
            {questions.map((q) => (
              <div key={q.id} className="mb-4 p-4 border border-gray-300 rounded">
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
              <button
                onClick={submitQuestions}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mt-4"
              >
                Submit Questions
              </button>
            )}
          </div>
        </div>
      ); 
}

export default Page;