import React from "react";

const page = () => {
  return (
    <div className="bg-gray-50 bg-right bg-no-repeat text-center text-black">
      <div className="inset-0">
        <div className="w-full lg:w-[70%] mx-auto py-8">
          <h1 className="mt-10 text-4xl md:text-6xl text-center font-bold text-primary-color mb-8">
            About Quizlytics
          </h1>
          <p className="text-black text-lg md:text-xl md:mx-auto mx-4 leading-relaxed mb-8">
            Welcome to <span className="font-bold">Quizlytics</span>—your
            ultimate platform for mastering MCQs tailored for students and job
            seekers in Bangladesh. Whether for board exams or recruitment
            tests, Quizlytics offers an engaging and effective learning
            environment. Track your progress and enhance your knowledge with our
            timed tests and detailed feedback.
          </p>
          <h2 className="text-4xl font-bold text-primary-color mb-4">Key Features</h2>
          <ul className="text-black my-7 grid md:grid-cols-2 grid-cols-1 gap-5 md:mx-auto mx-4 text-lg md:text-xl">
            <li className="p-4 rounded-md bg-gray-200">
              <strong className="text-2xl">🗂️ Quiz Categories</strong>
              <p className="mt-2 text-base">
                Access a variety of quiz categories like Science, History, and
                Math, designed to cover key academic and professional exam
                topics.
              </p>
            </li>
            <li className="p-4 rounded-md bg-gray-200">
              <strong className="text-2xl">⏳ Timed Quizzes</strong>
              <p className="mt-2 text-base">
                Experience real exam scenarios with timed quizzes and a
                countdown that turns red in the last 30 seconds.
              </p>
            </li>
            <li className="p-4 rounded-md bg-gray-200">
              <strong className="text-2xl">🔄 Limited Attempts</strong>
              <p className="mt-2 text-base">
                Each quiz comes with limited attempts, encouraging you to
                prepare thoroughly and adding strategic value to your learning.
              </p>
            </li>
            <li className="p-4 rounded-md bg-gray-200">
              <strong className="text-2xl">📊 Quiz History</strong>
              <p className="mt-2 text-base">
                Track your progress over time with detailed quiz history,
                showing scores, time taken, and submitted answers.
              </p>
            </li>
            <li className="p-4 rounded-md bg-gray-200">
              <strong className="text-2xl">📈 Instant Results</strong>
              <p className="mt-2 text-base">
                Get instant feedback with detailed result breakdowns to help you
                learn from mistakes and improve.
              </p>
            </li>
            <li className="p-4 rounded-md bg-gray-200">
              <strong className="text-2xl">🏅 Badges & Achievements</strong>
              <p className="mt-2 text-base">
                Earn badges for mastering topics and completing challenges, and
                showcase them on your profile.
              </p>
            </li>
            <li className="p-4 rounded-md bg-gray-200">
              <strong className="text-2xl">📤 Social Sharing</strong>
              <p className="mt-2 text-base">
                Share your achievements on social media platforms to inspire
                others and boost engagement.
              </p>
            </li>
            <li className="p-4 rounded-md bg-gray-200">
              <strong className="text-2xl">🗣️ Community Forum</strong>
              <p className="mt-2 text-base">
                Join the community to discuss quizzes, share strategies, and
                connect with fellow learners.
              </p>
            </li>
            <li className="p-4 rounded-md bg-gray-200">
              <strong className="text-2xl">📝 Articles & Resources</strong>
              <p className="mt-2 text-base">
                Access valuable articles and resources to stay informed and
                improve your exam preparation.
              </p>
            </li>
            <li className="p-4 rounded-md bg-gray-200">
              <strong className="text-2xl">📥 User Feedback</strong>
              <p className="mt-2 text-base">
                Share your feedback to help us improve Quizlytics and make it
                even better for exam preparation.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default page;
