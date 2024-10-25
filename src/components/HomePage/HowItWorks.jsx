"use client"
import AOS from 'aos';
import 'aos/dist/aos.css';
import React, { useEffect } from 'react';
import { PenTool, Users, BarChart2 } from 'lucide-react';

const HowItWorks = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000, 
            once: true,
        });
    }, []);

    return (
        <div className="flex flex-col md:flex-row justify-between lg:my-10 p-4  md:mt-0 md:p-8 gap-4  bg-gray-100">
            <div data-aos="zoom-in" className="bg-white rounded-lg shadow-md p-6 text-center w-full md:w-1/3">
                <PenTool className="w-12 h-12 mx-auto mb-4 text-blue-500" />
                <h3 className="text-xl font-semibold mb-2">Create</h3>
                <p className="text-gray-600">
                    Quickly <strong>create great looking quizzes</strong> using multiple question types and formatting options with Quizlytics.
                </p>
            </div>
            <div data-aos="zoom-in" className="bg-white rounded-lg shadow-md p-6 text-center w-full md:w-1/3">
                <Users className="w-12 h-12 mx-auto mb-4 text-red-500" />
                <h3 className="text-xl font-semibold mb-2">Publish</h3>
                <p className="text-gray-600">
                    Quizzes can either be <strong>published privately to a select group</strong> or open them up to everyone with a single link and registration page on Quizlytics.
                </p>
            </div>
            <div data-aos="zoom-in" className="bg-white rounded-lg shadow-md p-6 text-center w-full md:w-1/3">
                <BarChart2 className="w-12 h-12 mx-auto mb-4 text-green-500" />
                <h3 className="text-xl font-semibold mb-2">Analyze</h3>
                <p className="text-gray-600">
                    Quizlytics instantly marks and grades your quizzes. Powerful reports then allow you to <strong>perform in-depth analysis</strong> across all responses.
                </p>
            </div>
        </div>
    );
};

export default HowItWorks;
