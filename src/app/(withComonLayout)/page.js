"use client";
import { useState, useEffect } from "react";
import Banner from "@/components/HomePage/Banner";
import Overview from "@/components/HomePage/Overview";
import Footer from "@/components/Shared/Footer";
import Feedback from "@/components/HomePage/Feedback";
import Partnership from "@/components/HomePage/Partnership";
import Faq from "@/components/HomePage/Faq";
import HelloTeacher from "@/components/HomePage/HelloTeacher";
import HowItWorks from "@/components/HomePage/HowItWorks";
import LoadingSpinner from "@/components/Spinner/LoadingSpinner";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className="overflow-hidden">
      <Banner />
      <HowItWorks />
      <HelloTeacher />
      <Overview />
      <Partnership />
      <Feedback />
      <Faq />
    </div>
  );
}
