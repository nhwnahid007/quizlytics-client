"use client";
import useMakeExam from '@/app/hooks/useMakeExam';
import MakeExam from '@/components/Modals/MakeExam';
import './style.css';
import Questions from '@/components/Questions/Questions';
import useQuestionNumber from '@/app/hooks/useQuestionNumber';

const Exam = () => {
    const [showMakeExam, setShowMakeExam] = useMakeExam();
    const [currentMCQ, setCurrentMCQ] = useQuestionNumber();


    return (
        <div className="bg-[#dad7cd] min-h-[100vh] py-20">
            {showMakeExam && <MakeExam setShowMakeExam={setShowMakeExam} />}

            {/* Instructions */}
            <div className='w-[580px] mx-auto bg-black text-[#ffefd3] rounded-lg mb-8 p-4'>
                <h2 className='text-2xl text-center font-bold text-[#39FF14]'>Assessment Overview</h2>
                <div className='w-full md:w-[480px] mx-auto my-6 flex justify-between'>
                    <div className='flex flex-col space-y-1'>
                        <h1 className='font-medium'><span className='font-bold'>Duration:</span> 10 Minutes</h1>
                        <h1 className='font-medium'><span className='font-bold'>Examinee:</span> Tanvir Rahman</h1>
                    </div>
                    <div className='flex flex-col space-y-1'>
                        <h1 className='font-medium'><span className='font-bold'>MCQ:</span> 10</h1>
                        <h1 className='font-medium'><span className='font-bold'>Total Marks:</span> 1 x 10 = 10</h1>
                    </div>
                </div>
            </div>

            {/* MCQ */}
            <Questions currentMCQ={currentMCQ} setCurrentMCQ={setCurrentMCQ} />
        </div>
    );
};

export default Exam;
