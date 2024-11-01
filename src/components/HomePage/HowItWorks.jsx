"use client"
import AOS from 'aos';
import 'aos/dist/aos.css';
import React, { useEffect } from 'react';
import { PenTool, Users, BarChart2, Share2 } from 'lucide-react';

const HowItWorks = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000, 
            once: true,
        });
    }, []);

    return (
        <div className="flex flex-col md:flex-row justify-between lg:my-10 p-4 md:mt-0 md:p-8 gap-4 md:gap-8">
            <div data-aos="zoom-in" className="bg-gray-100 rounded-lg shadow-md p-6 text-center flex-1">
                <PenTool className="w-12 h-12 mx-auto mb-4 text-blue-500" />
                <h3 className="text-xl font-semibold mb-2">Create</h3>
                <p className="text-gray-600">
                    Quickly <strong>create great looking quizzes</strong> using multiple question types and formatting options with Quizlytics.
                </p>
            </div>

            <div data-aos="zoom-in" className="bg-gray-100 rounded-lg shadow-md p-6 text-center flex-1">
                <Users className="w-12 h-12 mx-auto mb-4 text-red-500" />
                <h3 className="text-xl font-semibold mb-2">Custom Access</h3>
                <p className="text-gray-600">
                    Control quiz access with <strong>unique access keys</strong> and create private assessments for specific groups or individuals.
                </p>
            </div>

            <div data-aos="zoom-in" className="bg-gray-100 rounded-lg shadow-md p-6 text-center flex-1">
                <BarChart2 className="w-12 h-12 mx-auto mb-4 text-green-500" />
                <h3 className="text-xl font-semibold mb-2">AI Generation</h3>
                <p className="text-gray-600">
                    Let AI help you <strong>create engaging quizzes</strong> automatically from your content or topics of interest.
                </p>
            </div>

            <div data-aos="zoom-in" className="bg-gray-100 rounded-lg shadow-md p-6 text-center flex-1">
                <Share2 className="w-12 h-12 mx-auto mb-4 text-purple-500" />
                <h3 className="text-xl font-semibold mb-2">URL to Quiz</h3>
                <p className="text-gray-600">
                    Instantly <strong>convert web content into quizzes</strong> by simply pasting a URL and letting our AI do the work.
                </p>
            </div>
        </div>
    );
};

export default HowItWorks;
