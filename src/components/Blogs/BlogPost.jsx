import React from "react";
import Image from "next/image"; // Use Next.js Image component for optimization

const BlogPost = () => {
  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md dark:bg-gray-900 dark:text-gray-100">
      {/* Blog header with title, author info, and date */}
      <div className="flex flex-col items-start justify-between">
        <h2 className="text-3xl font-bold leading-tight mb-2 text-gray-800 dark:text-gray-100">
          Why Interactive Quizzes Are the Future of Learning
        </h2>
        <div className="flex items-center mb-4">
          {/* Replace img with next/image */}
          <Image
            src="https://i.ibb.co.com/5RtZVqP/ashim.jpg"
            alt="author"
            width={40} // Specify image width
            height={40} // Specify image height
            className="rounded-full mr-3"
          />
          
          <div>
            <span className="block text-sm font-semibold">Ashim</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              10 October 2024 | 08 min read | 10 comments
            </span>
          </div>
        </div>
      </div>

      {/* Blog image */}
      <div className="mb-6 ">
        <Image
          src="https://i.ibb.co.com/HpXLZVj/quiz-1373314-1280.jpg"
          alt="Blog visual"
          width={200} // Specify image width
          height={100} // Specify image height
          className="w-full h-72 rounded-lg"
        />
      </div>

      {/* Blog content */}
      <div className="text-gray-700 dark:text-gray-300">
        <p className="mb-4">
          Consider this: interactive quizzes are 60% more effective in enhancing
          learning retention compared to passive methods. With numbers like
          these, it&#39;s clear that integrating quizzes in education and corporate
          training can transform the learning experience.
        </p>
        <p className="mb-4">
          In recent years, quizzes have evolved beyond simple assessments and
          transformed into dynamic tools for engagement. Platforms like
          Quizlytics allow educators and trainers to create interactive quizzes
          that adapt to different learning styles. With features like timed
          quizzes, limited attempts, and instant feedback, Quizlytics is leading
          the way in personalized learning.
        </p>
        <p className="mb-4">
          Interactive quizzes offer an active learning process, encouraging
          participation and allowing learners to test their knowledge in real
          time. They also provide valuable analytics that can help educators
          understand students&#39; weaknesses and strengths.
        </p>

        <h3 className="text-xl font-semibold my-4">How Quizlytics Can Help</h3>

        <p className="mb-4">
          Quizlytics is more than just a quiz platform. It&#39;s an
          analytics-driven solution designed to enhance learning outcomes. It
          tracks quiz performance, time spent on questions, and even provides
          insights into which areas need improvement. Features like social
          sharing, quiz history, and community forums foster a collaborative
          learning environment, making it perfect for educational institutions
          and corporate training programs.
        </p>

        <p className="mb-4">
          Ready to make learning more interactive and effective? With
          Quizlytics, you can create quizzes tailored to your audience&#39;s needs,
          helping them achieve better results.
        </p>
      </div>

      {/* Footer with tags */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center">
          <span className="bg-purple-600 text-white text-xs font-semibold px-2 py-1 rounded-full mr-2">
            Education
          </span>
          <span className="bg-purple-600 text-white text-xs font-semibold px-2 py-1 rounded-full mr-2">
            eLearning
          </span>
          <span className="bg-purple-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
            Training
          </span>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          Published in Quizlytics Blog
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
