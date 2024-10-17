"use client";
import Link from "next/link";
import React from "react";
import { signIn, useSession } from "next-auth/react";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import SocialAuth from "@/components/Shared/SocialAuth";
import useShowPassState from "@/app/hooks/useShowPassState";
import useValidationStateHook from "@/app/hooks/useValidationStateHook";

const Login = () => {
  const { data: session, status } = useSession();
  const [showPass, setShowPass] = useShowPassState();
  const [validState, setValidState] = useValidationStateHook();

  const handleLogin = async (e) => {
    e.preventDefault();

    // reset state
    setValidState("");

    const email = e.target.email.value;
    const password = e.target.password.value;
    if (isNaN(password)) {
      setValidState("Close Eye icon in the password field");
    }

    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (response.status === 401) {
      setValidState("Invalid User!");
    }
  };

  return (
    <div className="flex pt-10 lg:min-h-screen mt-10 lg:mt-0 justify-center lg:items-center h-screen bg-white">
      <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Login</h2>
        <SocialAuth />
        <p className="text-center my-4 text-gray-500">or</p>
        <form onSubmit={handleLogin}>
          <div className="space-y-4">
            <div className="w-full flex flex-col">
              <label className="text-sm font-semibold text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                className="py-2 px-4 border rounded-lg"
                placeholder="Email"
              />
            </div>
            <div className="w-full flex flex-col relative">
              <label className="text-sm font-semibold text-gray-600">Password</label>
              <input
                type={showPass ? "text" : "password"}
                name="password"
                className="py-2 px-4 border rounded-lg"
                placeholder="Password"
              />
              <span
                onClick={() => setShowPass(!showPass)}
                className="absolute mt-4 inset-y-0 right-4 flex items-center text-xl cursor-pointer"
              >
                {showPass ? <IoEyeOff /> : <IoEye />}
              </span>
            </div>
          </div>
          <button className="btn bg-purple-500 text-white text-lg mt-6 w-full py-2 rounded-lg">
            Login
          </button>
          {validState === "Invalid User!" && (
            <p className="text-red-500 mt-2 text-center font-semibold">
              {validState}
            </p>
          )}
        </form>
        <div className="flex justify-center mt-4">
          <Link href="/register">
            <button className="btn text-purple-500">Create a new account</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
