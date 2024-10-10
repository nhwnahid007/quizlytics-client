"use client";
import React, {useState, useEffect} from "react";
import {FaStar} from "react-icons/fa";
import {RxCross1} from "react-icons/rx";
import axios from "axios";

const DropDown = () => {
  const [isModalOpen, setisModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState([]);
  const [error, setError] = useState("");

  // Fetch all feedback on component mount
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(
          "https://quizlytics.jonomukti.org/all-feedback"
        );
        setFeedback(response.data);
      } catch (err) {
        setError("Failed to fetch feedback.");
      }
    };
    fetchFeedback();
  }, []);

  // Handle feedback submission
  const handleSubmit = async () => {
    if (message.trim() === "" || rating === 0) {
      setError("Please provide a message and a rating.");
      return;
    }

    try {
      await axios.post("https://quizlytics.jonomukti.org/feedback", {
        message,
        rating,
      });
      setMessage("");
      setRating(0);
      setError("");
      setisModalOpen(false);

      // Optionally fetch updated feedback after submission
      const response = await axios.get(
        "https://quizlytics.jonomukti.org/all-feedback"
      );
      setFeedback(response.data);
    } catch (err) {
      setError("Failed to submit feedback.");
    }
  };

  return (
    <>
      <div className="p-8 mb-4 flex items-center gap-5 justify-center">
        <div className="w-full flex items-center justify-center">
          <button
            className="px-4 py-2 bg-[#3B9DF8] text-[#fff] rounded"
            onClick={() => setisModalOpen(true)}
          >
            User Feedback
          </button>
        </div>

        {/* Modal */}
        <div
          className={`${
            isModalOpen ? "visible" : "invisible"
          } w-full h-screen fixed top-0 left-0 z-50 bg-[#0000002a] transition-all duration-300 flex items-center justify-center`}
        >
          <div
            className={`${
              isModalOpen ? "scale-[1] opacity-100" : "scale-[0] opacity-0"
            } w-[90%] md:w-[80%] lg:w-[60%] bg-[#fff] rounded-lg transition-all duration-300 mx-auto mt-8`}
          >
            <div className="w-full flex items-end p-4 justify-between border-b border-[#d1d1d1]">
              <h1 className="text-[1.5rem] font-bold">
                Your Feedback about Quizlytics
              </h1>
              <RxCross1
                className="p-2 text-[2.5rem] hover:bg-[#e7e7e7] rounded-full transition-all duration-300 cursor-pointer"
                onClick={() => setisModalOpen(false)}
              />
            </div>

            {/* Feedback form */}
            <div className="p-4 border-b border-[#d1d1d1]">
              {error && <p className="text-red-500 mb-2">{error}</p>}
              <div className="w-[100%]">
                <label htmlFor="message" className="font-[400] text-[15px]">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  type="text"
                  name="message"
                  id="message"
                  placeholder="Write something about Quizlytics"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="border-[#e5eaf2] border rounded-md outline-none mt-1 px-4 w-full py-3 min-h-[200px] focus:border-[#3B9DF8] transition-colors duration-300"
                />
              </div>

              {/* Star rating */}
              <div className="flex items-center space-x-1 mt-2">
                {[...Array(5)].map((_, index) => {
                  const starRating = index + 1;
                  return (
                    <FaStar
                      key={starRating}
                      className={`cursor-pointer ${
                        starRating <= rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      size={24}
                      onClick={() => setRating(starRating)}
                    />
                  );
                })}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-4 p-4">
              <button
                className="py-2 px-4 rounded-md outline-none bg-[#3B9DF8] text-[#fff]"
                onClick={() => setisModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="py-2 px-4 border border-[#d1d1d1] rounded-md outline-none text-[#353535]"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Display feedback */}
      {/* <div className="p-8">
        <h2 className="text-[1.5rem] font-bold">All Feedback</h2>
        {feedback.length > 0 ? (
          <ul className="space-y-4 mt-1">
            {feedback.map((item, index) => (
              <li key={index} className="border p-4 rounded-md">
                <p>{item.message}</p>
                <div className="flex items-center mt-2">
                  {[...Array(5)].map((_, starIndex) => (
                    <FaStar
                      key={starIndex}
                      className={`${
                        starIndex + 1 <= item.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      size={20}
                    />
                  ))}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No feedback available.</p>
        )}
      </div> */}
    </>
  );
};

export default DropDown;
