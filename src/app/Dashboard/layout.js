"use client"
import "../globals.css";
// import Footer from "@/components/Shared/Footer";

import AuthProviders from "@/providers/AuthProviders";
import Sidebar from "@/components/Shared/Sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function RootLayout({ children }) {
  const [queryClient] = useState(() => new QueryClient());
    return (
            <div className="flex min-h-screen">
              <Sidebar />
              <div className="flex-grow">
                <AuthProviders>
                  <div>
                  <QueryClientProvider client={queryClient}>
                    {children}
                  </QueryClientProvider>
                  </div>
                </AuthProviders>
              </div>
            </div>
         
    )
}