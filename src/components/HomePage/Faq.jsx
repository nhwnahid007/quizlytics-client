import React from "react";

const Faq = () => {
  return (
    <section className="dark:bg-gray-100 dark:text-gray-800 bg-black">
      <div className="container flex flex-col justify-center px-4 py-8 mx-auto md:p-8 bg-black text-white">
        <h2 className="text-2xl font-semibold sm:text-4xl mb-8">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          <details className="w-full border rounded-lg">
            <summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-violet-600">
              Can I retake a quiz?
            </summary>
            <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">
              Yes, you can retake quizzes as many times as you like to improve
              your score.{" "}
            </p>
          </details>
          <details className="w-full border rounded-lg">
            <summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-violet-600">
              Are the quizzes timed?
            </summary>
            <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">
              Yes, most quizzes have a set time limit to complete. The time
              varies depending on the difficulty and length of the quiz.{" "}
            </p>
          </details>
          <details className="w-full border rounded-lg">
            <summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-violet-600">
              How is my score calculated?
            </summary>
            <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">
              Each correct answer earns you points, and your final score is the
              sum of all correct responses. There are no penalties for incorrect
              answers.{" "}
            </p>
          </details>
          <details className="w-full border rounded-lg">
            <summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-violet-600">
              Can I skip questions and return to them later in the quiz?
            </summary>
            <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">
              Yes, you can skip questions but not return to them before.{" "}
            </p>
          </details>
          <details className="w-full border rounded-lg">
            <summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-violet-600">
              Can I share feedback on quizzes?
            </summary>
            <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">
              Yes! After completing your quiz task, you can share your feedback
              on quizzes of social media platform.{" "}
            </p>
          </details>
          <details className="w-full border rounded-lg">
            <summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-violet-600">
              Can I suggest new quiz topics?
            </summary>
            <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">
              Yes, we welcome user feedback! If you’d like to suggest new quiz
              topics or technologies, you can contact us via the `Contact`
              section.{" "}
            </p>
          </details>
        </div>
      </div>
    </section>
  );
};

export default Faq;
