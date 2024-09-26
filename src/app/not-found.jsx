import Link from "next/link";
import React from "react";

const notFound = () => {
  return (
    <div>
      <div className="absolute mx-auto">
        <h1 className="text-9xl font-extrabold">404</h1>
        <h2 className="text-4xl font-semibold">
          Sorry, we couldn`t find this page.
        </h2>
        <h3 className="text-xl">
          But don`t worry, you can find plenty of other things on our homepage
        </h3>
        <Link
          href={"/"}
          className="bg-red-500 px-4 py-2 rounded-md text-3xl text-white"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default notFound;
