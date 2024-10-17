"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChartLine, FaCommentDots, FaUser } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Default to open
  const pathname = usePathname();

  const isActive = (route) => pathname === route;

  const Menus = [
    { title: "Home", route: "/Dashboard", icon: <FaChartLine /> },
    {
      title: "Make custom questions",
      route: "/Dashboard/customquestion",
      icon: <FaCommentDots />,
    },
    {
      title: "All Custom questions",
      route: "/Dashboard/examinersDashboard",
      icon: <FaCommentDots />,
    },
    {
      title: "Leaderboard",
      route: "/Dashboard/leaderboard",
      icon: <FaCommentDots />,
    },
    { title: "Reports", route: "/dashboard/reports", icon: <FaUser /> },
  ];

  return (
    <div className="flex">
      <div
        className={`${
          isSidebarOpen ? "w-72" : "w-20"
        } bg-gray-800 h-auto p-5 pt-8 relative duration-300 text-white`}
      >
        <button
          className="absolute text-3xl cursor-pointer -right-3 top-9 w-7 border-gray-800 border-2 rounded-full bg-yellow-300"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? (
            <FiChevronLeft className="h-6 w-6" />
          ) : (
            <FiChevronRight className="h-6 w-6" />
          )}
        </button>
        <div className="flex gap-x-4 items-center">
          <Link
            href="/Dashboard"
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !isSidebarOpen && "scale-0"
            }`}
          >
            Dashboard
          </Link>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex rounded-md p-2 cursor-pointer hover:bg-gray-700 text-gray-300 text-sm items-center gap-x-4 ${
                isActive(Menu.route) ? "bg-gray-700 text-yellow-300" : ""
              }`}
            >
              <span className="text-lg">{Menu.icon}</span>
              <Link
                href={Menu.route}
                className={`${
                  !isSidebarOpen && "hidden"
                } origin-left duration-200`}
              >
                {Menu.title}
              </Link>
            </li>
          ))}
          <li className="flex rounded-md p-2 cursor-pointer hover:bg-gray-700 text-gray-300 text-sm items-center gap-x-4">
            <span className="text-lg">🏠</span>
            <Link
              href="/"
              className={`${
                !isSidebarOpen && "hidden"
              } origin-left duration-200`}
            >
              Go to Homepage
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
