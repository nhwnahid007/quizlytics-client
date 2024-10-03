"use client"
import useRouterHook from '@/app/hooks/useRouterHook';
import React from 'react';

const ExamResult = ({ myMark }) => {
    const router = useRouterHook();

    const handleGoHome = () => {
        router.push('/');
    }

    // Determine the remark based on the score
    let remark = '';
    let remarkColor = '';

    if (myMark > 7) {
        remark = 'Excellent!';
        remarkColor = 'text-green-600';
    } else if (myMark >= 5) {
        remark = 'Good!';
        remarkColor = 'text-orange-600';
    } else {
        remark = 'Needs Improvement';
        remarkColor = 'text-red-600';
    }

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center'>
            <div className='bg-[#ffefd3] w-[90%] md:w-[580px] p-8 rounded-lg shadow-lg'>
                <div className={`w-[200px] h-[200px] mx-auto my-8 border-8 p-8 rounded-full flex justify-center items-center ${remarkColor}`}>
                    <h1 className={`text-4xl font-bold ${remarkColor}`}>{`${myMark} / 10`}</h1>
                </div>
                <h1 className={`text-center text-4xl ${remarkColor}`}>{remark}</h1>
                <div className='mt-4 flex justify-center gap-4'>
                    <button onClick={handleGoHome} className='text-red-600 hover:bg-red-600 hover:text-[#ffefd3] font-medium py-2 px-4 border border-red-600 rounded-md'>
                        Exit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExamResult;

