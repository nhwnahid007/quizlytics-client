"use client"
import "../globals.css";
// import Footer from "@/components/Shared/Footer";

import AuthProviders from "@/providers/AuthProviders";
import Sidebar from "@/components/Shared/Sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import LoadingSpinner from "@/components/Spinner/LoadingSpinner";


export default function RootLayout({ children }) {
  const [queryClient] = useState(() => new QueryClient());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700); // Adjust the delay as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen">
      <AuthProviders>
        <QueryClientProvider client={queryClient}>
          {isLoading ? (
            <div className="flex justify-center items-center w-full h-full">
              <LoadingSpinner /> {/* Replace with your actual loading spinner component */}
            </div>
          ) : (
            <>
              <Sidebar />
              <div className="flex-grow">
                {children}
              </div>
            </>
          )}
        </QueryClientProvider>
      </AuthProviders>
    </div>
  );
}
