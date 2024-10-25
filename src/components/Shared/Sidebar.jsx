"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChartLine, FaCommentDots, FaDatabase, FaPeopleArrows, FaUser } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaFileCircleQuestion, FaPeopleGroup } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ChartSpline, CreditCard, Database, FileQuestion, House, ShieldEllipsis, ShieldQuestion, UserCog, Users } from "lucide-react";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const pathname = usePathname();

  const { data: session, error: sessionError, isLoading: sessionLoading } = useSession();
  const user = session?.user;

  const { data: role, error: roleError, isLoading: roleLoading } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      if (!user?.email) {
        return null; // Return null if email is not available
      }
      try {
        const { data } = await axios(`https://quizlytics.jonomukti.org/user/role?email=${user.email}`);
        console.log(data);

        return data.role || "user"; // Ensure a valid return value
      } catch (error) {
        console.error("Error fetching user role:", error);
        return null; // Return null in case of an error
      }
    },
  });

  // Handle loading and error states if necessary


  const isActive = (route) => pathname === route;

  const Menus = [
    { title: "Home", route: "/Dashboard", icon: <ChartSpline/> },
    {
      title: "Make custom questions",
      route: "/Dashboard/customquestion",
      icon: <FileQuestion />,
    },
    {
      title: "All Custom questions",
      route: "/Dashboard/examinersDashboard",
      icon: <ShieldQuestion/>,
    },
    {
      title: "Leaderboard",
      route: "/Dashboard/leaderboard",
      icon: <ShieldEllipsis />,
    },
    {
      title: "My Progress",
      route: "/Dashboard/statistics",
      icon: <Database />,
    },
    {
      title: "All Examinee",
      route: "/Dashboard/allExaminee",
      icon: <Users />,
    },
    {
      title: "User Management",
      route: "/Dashboard/allUser",
      icon: <UserCog />,
    },
    {
      title: "Payment",
      route: "/Dashboard/payment",
      icon: <CreditCard />,
    },
  ].filter(menu => 
    role === 'admin' || 
    (role === 'user' && ['Leaderboard', 'My Progress', 'Home'].includes(menu.title)) || 
    (role === 'teacher' && !['User Management', 'Payment'].includes(menu.title))
  );

  return (
    <div className="flex">
      <div
        className={`${
          isSidebarOpen ? "w-72 p-3" : "w-10 p-[6]"
        } bg-purple-600 bg-opacity-60 h-auto  pt-8 relative duration-300 text-white`}
      >
        <button
          className="absolute text-3xl cursor-pointer -right-3 top-9 w-7 border-gray-800 border-2 rounded-full bg-secondary-color"
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
            className={`text-white origin-left font-bold text-2xl duration-200 ${
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
              className={`flex rounded-md p-2 cursor-pointer hover:bg-gray-700 text-white text-sm font-semibold items-center gap-x-4 ${
                isActive(Menu.route) ? "bg-gray-700 text-secondary-color" : ""
              }`}
            >
              <Link href={Menu.route} className="flex items-center gap-x-4">
                <span
                  className={`text-md ${
                    isActive(Menu.route) ? "text-secondary-color" : ""
                  }`}
                >
                  {Menu.icon}
                </span>
                <span
                  className={`origin-left duration-200 ${
                    !isSidebarOpen ? "hidden" : "block"
                  }`}
                >
                  {Menu.title}
                </span>
              </Link>
            </li>
          ))}
          <li className="flex rounded-md p-2 cursor-pointer hover:bg-gray-700 text-white text-sm font-semibold items-center gap-x-4">
            <Link href="/" className="flex items-center gap-x-4">
              <span
                className={`text-lg ${
                  pathname === "/" ? "text-secondary-color" : ""
                }`}
              >
               <House />
              </span>
              <span
                className={`origin-left duration-200 ${
                  !isSidebarOpen ? "hidden" : "block"
                }`}
              >
                Go to Homepage
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
