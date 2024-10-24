'use client'

import Image from "next/image";
import React, { Suspense } from "react";
import { signIn, useSession } from "next-auth/react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import SocialAuth from "@/components/Shared/SocialAuth";
import useShowPassState from "@/app/hooks/useShowPassState";
import useValidationStateHook from "@/app/hooks/useValidationStateHook";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

// Loading component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-[200px]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
  </div>
);

// Client-side wrapper component
const ClientWrapper = () => {
  const searchParams = useSearchParams();
  const path = searchParams.get('redirect');
  const [showPass, setShowPass] = useShowPassState();
  const [validState, setValidState] = useValidationStateHook();
  const { data: session, status } = useSession();

  const handleLogin = async (e) => {
    e.preventDefault();

    setValidState("");

    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    if (!email || !password) {
      setValidState("Please fill in both fields.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setValidState("Please enter a valid email.");
      return;
    }
    if (password.length < 6) {
      setValidState("Password must be at least 6 characters long.");
      return;
    }

    const response = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: path || '/',
    });

    if (response?.status === 401) {
      setValidState("Invalid User!");
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-3 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Login</h2>
      <SocialAuth />
      <p className="text-center my-3 text-gray-500">or</p>
      <form onSubmit={handleLogin}>
        <div className="space-y-3">
          <div className="w-full flex flex-col">
            <label className="text-sm font-semibold text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              className="py-2 px-3 border rounded-lg"
              placeholder="Email"
              required
            />
          </div>
          <div className="w-full flex flex-col relative">
            <label className="text-sm font-semibold text-gray-600">Password</label>
            <input
              type={showPass ? "text" : "password"}
              name="password"
              className="py-2 px-3 border rounded-lg"
              placeholder="Password"
              required
            />
            <span
              onClick={() => setShowPass(!showPass)}
              className="absolute mt-3 inset-y-0 right-3 flex items-center text-xl cursor-pointer"
            >
              {showPass ? <IoEyeOff /> : <IoEye />}
            </span>
          </div>
        </div>
        <button className="btn bg-purple-500 text-white text-lg mt-4 w-full py-2 rounded-lg">
          Login
        </button>
        {validState && (
          <p className={`mt-2 text-center font-semibold ${validState === "Invalid User!" ? "text-red-500" : "text-gray-500"}`}>
            {validState}
          </p>
        )}
      </form>
      <div className="flex justify-center mt-3">
        <Link href="/register">
          <button className="btn text-purple-500">Create a new account</button>
        </Link>
      </div>
    </div>
  );
};

// Main Login component
const Login = () => {
  return (
    <div className="flex pt-6 lg:min-h-screen mt-6 lg:mt-0 justify-center lg:items-center h-screen bg-white">
      <Suspense fallback={<LoadingSpinner />}>
        <ClientWrapper />
      </Suspense>
    </div>
  );
};

export default Login;