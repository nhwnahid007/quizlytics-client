"use client"
import useMakeExam from '@/app/hooks/useMakeExam';
import React from 'react';

const MakeExam = ({setShowMakeExam}) => {


    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center'>
            <div className='bg-[#ffefd3] w-[90%] md:w-[580px] p-8 rounded-lg shadow-lg'>
                <h1 className='text-[#008000] font-bold text-center text-3xl'>Quick Exam</h1>
                <div className='w-full md:w-[480px] mx-auto mt-8 flex justify-between'>
                    <div className='flex flex-col space-y-1'>
                        <h1 className='font-medium'><span className='font-bold'>Duration:</span> 10 Minutes</h1>
                        <h1 className='font-medium'><span className='font-bold'>Examinee:</span> Tanvir Rahman</h1>
                    </div>
                    <div className='flex flex-col space-y-1'>
                        <h1 className='font-medium'><span className='font-bold'>MCQ:</span> 10</h1>
                        <h1 className='font-medium'><span className='font-bold'>Total Marks:</span> 1 x 10 = 10</h1>
                    </div>
                </div>
                <div className='w-full md:w-[480px] mx-auto flex flex-col md:flex-row gap-4 mt-6'>
                    <input type="text" className='bg-black w-full md:w-1/2 py-2 px-4 text-[#ffefd3] rounded-lg text-lg' placeholder='Write topics' />
                    <select className='bg-black w-full md:w-1/2 py-2 px-4 text-[#ffefd3] rounded-lg text-lg'>
                        <option value="" disabled selected>Level</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
                <div className='flex justify-center mt-6'>
                    <button onClick={() => setShowMakeExam(false)} className='btn bg-[#22b322] text-white text-lg px-12'>Start</button>
                </div>
            </div>
        </div>
    );
};

export default MakeExam;
