import Link from "next/link";
import React from "react";

const notFound = () => {
  return (
    <div
      className="h-[100vh] bg-cover bg-right bg-no-repeat text-white"
      style={{
        backgroundImage: `url('https://i.ibb.co.com/X4fQqDn/question-mark-1872634-1920.jpg')`,
      }}
    >
      <div className="mx-auto space-y-4 pt-64">
        <h1 className="text-9xl font-extrabold text-center text-[#ff0000]">
          404
        </h1>
        <h2 className="text-4xl font-semibold text-center">
          Sorry, we couldn`t find this page.
        </h2>
        <h3 className="text-xl text-center">
          But don`t worry, you can find plenty of other things on our homepage
        </h3>
        <div className="mx-auto text-center justify-center items-center pt-5">
          <Link
            href={"/"}
            className="bg-[#ff0000] hover:bg-[#ffefd3] px-4 py-2 rounded-md text-white text-3xl"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default notFound;
