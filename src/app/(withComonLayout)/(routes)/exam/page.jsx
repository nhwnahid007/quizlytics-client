"use client";
import useMakeExam from '@/app/hooks/useMakeExam';
import MakeExam from '@/components/Modals/MakeExam';
import './style.css';
import Questions from '@/components/Questions/Questions';
import useQuestionNumber from '@/app/hooks/useQuestionNumber';
import useDate from '@/app/hooks/useDate';
import useUserExamData from '@/app/hooks/useUserExamData';
import { useEffect, useState } from 'react';
import { postOnlyMark, postUserExamData } from '@/requests/post';
import Swal from 'sweetalert2';
import useShowResult from '@/app/hooks/useShowResult';
import { useSession } from 'next-auth/react';
import useExamId from '@/app/hooks/useExamId';
import Loading from '@/components/Modals/Loading';
import useAllMCQ from '@/app/hooks/useAllMCQ';
import { getMCQ } from '@/requests/get';
import ExamResult from '@/components/Modals/ExamResult';

const Exam = () => {
    const [showMakeExam, setShowMakeExam] = useMakeExam();
    const [currentMCQ, setCurrentMCQ] = useQuestionNumber();
    const today = useDate();
    const [userExamData, setUserExamData] = useUserExamData();
    const [showResult, setShowResult] = useShowResult();
    const [allMCQ, setAllMCQ] = useAllMCQ();
    const [examId, setExamId] = useExamId();
    const [isDataSent, setIsDataSent] = useState(false); // Flag to prevent multiple submissions
    const [myMark, setMyMark] = useState(null);

    const { data: session } = useSession();
    const name = session?.user?.name;
    const email = session?.user?.email;
    const profile = session?.user?.profile;
    const image = session?.user?.image;

    useEffect(() => {
        const getAllMCQ = async () => {
            try {
                const data = await getMCQ();
                setAllMCQ(data);
            } catch (error) {
                console.log("data fetching error:", error);
            }
        };
        getAllMCQ();
    }, [setAllMCQ]);

    useEffect(() => {
        const sendingExamData = async () => {
            if (!isDataSent) {
                try {
                    const response = await postUserExamData(userExamData);
                    if (response && response.status === 200) {
                        // Calculate marks and set myMark before posting results
                        const correctMCQ = userExamData.filter(data => data.user_answer === data.options[parseInt(data.correct_answer)]);
                        const calculatedMark = correctMCQ.length;
                        setMyMark(calculatedMark);

                        const userResultMark = { examId: examId, exam_date: today, name, email, profile: image || profile, my_mark: calculatedMark };
                        const resultResponse = await postOnlyMark(userResultMark);

                        if (resultResponse && resultResponse.status === 200) {
                            // Swal.fire("Exam result saved successfully!", "", "success");
                        }

                        setIsDataSent(true); // Prevents further submissions
                    }
                } catch (error) {
                    console.error("Error sending data:", error);
                }
            }
        };

        if (currentMCQ > 10 && !isDataSent) {
            sendingExamData();
        }
    }, [userExamData, name, email, image, profile, examId, today, isDataSent]); // if add currentMCQ dependency, Data save to database twice that is very unpredictable, this is why I ignore this dependency 

    return (
        <div className="bg-[#dad7cd] min-h-[100vh] py-20">
            {showMakeExam ? (
                <MakeExam setShowMakeExam={setShowMakeExam} />
            ) : (
                <>
                    {!allMCQ || allMCQ.length !== 10 ? (
                        <Loading />
                    ) : !showResult ? (
                        <>
                            <div className='w-[580px] mx-auto bg-black text-[#ffefd3] rounded-lg mb-8 p-4'>
                                <h2 className='text-2xl text-center font-bold text-[#39FF14]'>Assessment Overview</h2>
                                <div className='w-full md:w-[480px] mx-auto my-6 flex justify-between'>
                                    <div className='flex flex-col space-y-1'>
                                        <h1><span className='font-semibold text-[#f08f45]'>Date:</span> {today}</h1>
                                        <h1><span className='font-semibold text-[#f08f45]'>Duration:</span> 100 Seconds</h1>
                                        <h1><span className='font-semibold text-[#f08f45]'>Examinee:</span> Tanvir Rahman</h1>
                                    </div>
                                    <div className='flex flex-col space-y-1'>
                                        <h1><span className='font-semibold text-[#f08f45]'>MCQ:</span> 10</h1>
                                        <h1><span className='font-semibold text-[#f08f45]'>Total Marks:</span> 1 x 10 = 10</h1>
                                    </div>
                                </div>
                            </div>

                            <Questions
                                currentMCQ={currentMCQ}
                                setCurrentMCQ={setCurrentMCQ}
                                userExamData={userExamData}
                                setUserExamData={setUserExamData}
                                examId={examId}
                                setExamId={setExamId}
                                allMCQ={allMCQ}
                                setAllMCQ={setAllMCQ}
                                setShowResult={setShowResult}
                            />
                        </>
                    ) : (
                        <ExamResult myMark={myMark} />
                    )}
                </>
            )}
        </div>
    );
};

export default Exam;
























// "use client";
// import useMakeExam from '@/app/hooks/useMakeExam';
// import MakeExam from '@/components/Modals/MakeExam';
// import './style.css';
// import Questions from '@/components/Questions/Questions';
// import useQuestionNumber from '@/app/hooks/useQuestionNumber';
// import useDate from '@/app/hooks/useDate';
// import useUserExamData from '@/app/hooks/useUserExamData';
// import { useEffect, useState } from 'react';
// import { postOnlyMark, postUserExamData } from '@/requests/post';
// import Swal from 'sweetalert2';
// import useShowResult from '@/app/hooks/useShowResult';
// import { useSession } from 'next-auth/react';
// import useExamId from '@/app/hooks/useExamId';
// import Loading from '@/components/Modals/Loading';
// import useAllMCQ from '@/app/hooks/useAllMCQ';
// import { getMCQ } from '@/requests/get';
// // import useSearchCategory from '@/app/hooks/useSearchCategory';
// // import useSearchLevel from '@/app/hooks/useSearchLevel';
// import ExamResult from '@/components/Modals/ExamResult';

// const Exam = () => {
//     const [showMakeExam, setShowMakeExam] = useMakeExam();
//     const [currentMCQ, setCurrentMCQ] = useQuestionNumber();
//     const today = useDate();
//     const [userExamData, setUserExamData] = useUserExamData();
//     const [showResult, setShowResult] = useShowResult();
//     const [allMCQ, setAllMCQ] = useAllMCQ();
//     const [examId, setExamId] = useExamId();
//     const [isDataSent, setIsDataSent] = useState(false); // Flag to prevent multiple submissions
//     const [myMark, setMyMark] = useState(null);

//     const { data: session } = useSession();
//     const name = session?.user?.name;
//     const email = session?.user?.email;
//     const profile = session?.user?.profile;
//     const image = session?.user?.image;

//     useEffect(() => {
//         const getAllMCQ = async () => {
//             try {
//                 const data = await getMCQ();
//                 setAllMCQ(data);
//             } catch (error) {
//                 console.log("data fetching error:", error);
//             }
//         };
//         getAllMCQ();
//     }, [setAllMCQ]);

//     useEffect(() => {
//         const handleShowResult = async () => {
//             // count correct answer
//             const handleShowResult = () => {
//                 const correctMCQ = userExamData.filter(data => data.user_answer === data.options[parseInt(data.correct_answer)])
//                 setMyMark(correctMCQ.length);
//             }
//             handleShowResult();

//             // post user result mark
//             const userResultMark = { examId: examId, exam_date: today, name, email, profile: image || profile, my_mark: myMark };
//             const response = await postOnlyMark(userResultMark);

//             if (response && response.status === 200) {
//                 Swal.fire("Exam result saved successfully!", "", "success");
//             }
//         };

//         const sendingExamData = async () => {
//             if (!isDataSent) {
//                 try {
//                     const response = await postUserExamData(userExamData);
//                     if (response && response.status === 200) {
//                         handleShowResult();
//                         setIsDataSent(true); // Prevents further submissions
//                     }
//                 } catch (error) {
//                     console.error("Error sending data:", error);
//                 }
//             }
//         };

//         if (currentMCQ > 10 && !isDataSent) {
//             sendingExamData();
//         }
//     }, [userExamData, currentMCQ, name, email, image, profile, examId, today, isDataSent, myMark]);

//     return (
//         <div className="bg-[#dad7cd] min-h-[100vh] py-20">
//             {showMakeExam ? (
//                 <MakeExam setShowMakeExam={setShowMakeExam} />
//             ) : (
//                 <>
//                     {!allMCQ || allMCQ.length !== 10 ? (
//                         <Loading />
//                     ) : !showResult ? (
//                         <>
//                             <div className='w-[580px] mx-auto bg-black text-[#ffefd3] rounded-lg mb-8 p-4'>
//                                 <h2 className='text-2xl text-center font-bold text-[#39FF14]'>Assessment Overview</h2>
//                                 <div className='w-full md:w-[480px] mx-auto my-6 flex justify-between'>
//                                     <div className='flex flex-col space-y-1'>
//                                         <h1><span className='font-semibold text-[#f08f45]'>Date:</span> {today}</h1>
//                                         <h1><span className='font-semibold text-[#f08f45]'>Duration:</span> 10 Minutes</h1>
//                                         <h1><span className='font-semibold text-[#f08f45]'>Examinee:</span> Tanvir Rahman</h1>
//                                     </div>
//                                     <div className='flex flex-col space-y-1'>
//                                         <h1><span className='font-semibold text-[#f08f45]'>MCQ:</span> 10</h1>
//                                         <h1><span className='font-semibold text-[#f08f45]'>Total Marks:</span> 1 x 10 = 10</h1>
//                                     </div>
//                                 </div>
//                             </div>

//                             <Questions
//                                 currentMCQ={currentMCQ}
//                                 setCurrentMCQ={setCurrentMCQ}
//                                 userExamData={userExamData}
//                                 setUserExamData={setUserExamData}
//                                 examId={examId}
//                                 setExamId={setExamId}
//                                 allMCQ={allMCQ}
//                                 setAllMCQ={setAllMCQ}
//                                 setShowResult={setShowResult}
//                             />
//                         </>
//                     ) : (
//                         <ExamResult examId={examId} myMark={myMark} setShowMakeExam={setShowMakeExam} />
//                     )}
//                 </>
//             )}
//         </div>
//     );
// };

// export default Exam;
