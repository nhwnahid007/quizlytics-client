"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname to get the current route

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname(); // Get the current pathname

  const isActive = (route) => pathname === route; // Check if the route is active

  return (
    <div>
      {/* Sidebar */}
      <div
        className={`fixed md:relative h-screen z-20 inset-y-0 left-0 w-64 bg-gray-800 text-white p-5 transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
        <nav>
          <ul>
            <li className="mb-4">
              <Link
                href="/Dashboard"
                className={`block py-2 px-4 rounded ${
                  isActive("/dashboard")
                    ? "bg-gray-700 text-yellow-300"
                    : "hover:bg-gray-700"
                }`}
              >
                Home
              </Link>
            </li>
            <li className="mb-4">
              <Link
                href="/Dashboard/customquestion"
                className={`block py-2 px-4 rounded ${
                  isActive("/Dashboard/customquestion")
                    ? "bg-gray-700 text-yellow-300"
                    : "hover:bg-gray-700"
                }`}
              >
                Make custom questions
              </Link>
            </li>
            <li className="mb-4">
              <Link
                href="/Dashboard/examinersDashboard"
                className={`block py-2 px-4 rounded ${
                  isActive("/Dashboard/examinersDashboard")
                    ? "bg-gray-700 text-yellow-300"
                    : "hover:bg-gray-700"
                }`}
              >
                All custom questions
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/reports"
                className={`block py-2 px-4 rounded ${
                  isActive("/dashboard/reports")
                    ? "bg-gray-700 text-yellow-300"
                    : "hover:bg-gray-700"
                }`}
              >
                Reports
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Hamburger Button for mobile */}
      <button
        className="md:hidden m-4"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
    </div>
  );
};

export default Sidebar;
