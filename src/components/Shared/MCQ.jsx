import React, { useState } from 'react';

const MCQ = ({ currentMCQ, setCurrentMCQ, exactMCQ }) => {
    const { id, question, answers = [] } = exactMCQ || {};
    const [selectedAnswer, setSelectedAnswer] = useState([]);
    console.log(exactMCQ);

    const handleNext = () => {
        if (currentMCQ < 10) {
            setCurrentMCQ(currentMCQ + 1);
        }
    };

    const handlePrev = () => {
        if (currentMCQ > 1) {
            setCurrentMCQ(currentMCQ - 1);
        }
    };

    return (
        <div className='p-8 bg-[#ffefd3] rounded-lg'>
            <h3 className='text-lg font-bold mb-4'><span>{currentMCQ}.</span> {question}</h3>
            {/* Radio list */}
            <div className='radio-section'>
                <div className='radio-list'>
                    {answers.map((ans, index) => (
                        <div className='radio-item' key={index}>
                            <input 
                                type="radio" 
                                name="radio" 
                                id={`radio${id}-${index}`} 
                                value={ans} 
                                className='hidden peer' 
                            />
                            <label htmlFor={`radio${id}-${index}`} className='cursor-pointer'>
                                {ans}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Next & Prev */}
            <div className='flex justify-end gap-4 mt-6'>
                <button onClick={handlePrev} className='btn bg-[#ff2929] px-6 text-white'>Prev</button>
                <button onClick={handleNext} className='btn bg-[#33be1a] px-6 text-white'>Next</button>
            </div>
        </div>
    );
};

export default MCQ;





// import React from 'react';

// const MCQ = ({ currentMCQ, setCurrentMCQ, exactMCQ }) => {
//     const { id, question, answers = [] } = exactMCQ || {};
//     console.log(exactMCQ);

//     const handleNext = () => {
//         if (currentMCQ < 10) {
//             setCurrentMCQ(currentMCQ + 1);
//         }
//     }
//     const handlePrev = () => {
//         if (currentMCQ > 1) {
//             setCurrentMCQ(currentMCQ - 1);
//         }
//     }

//     return (
//         <div className='p-8 bg-[#ffefd3] rounded-lg '>
//             <h3 className='text-lg font-bold mb-4'><span>{currentMCQ}.</span> {question}</h3>
//             {/* radio list */}
//             <div className='radio-section'>
//                 <div className='radio-list'>

//                     {answers.map((ans, index) => (
//                         <div 
//                         className='radio-item'
//                         key={index}
//                         >
//                             <input type="radio" name="radio" id={`radio${id}`} value="accounting" className='hidden peer' />
//                             <label htmlFor={`radio${id}`} className='cursor-pointer'>
//                                 {ans} ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssdddddd
//                             </label>
//                         </div>
//                     ))}

//                     {/* <div className='radio-item'>
//                         <input type="radio" name="radio" id="radio1" value="accounting" className='hidden peer' />
//                         <label htmlFor="radio1" className='cursor-pointer'>
//                             Accounting
//                         </label>
//                     </div>
//                     <div className='radio-item'>
//                         <input type="radio" name="radio" id="radio2" value="finance" className='hidden peer' />
//                         <label htmlFor="radio2" className='cursor-pointer'>
//                             Finance
//                         </label>
//                     </div>
//                     <div className='radio-item'>
//                         <input type="radio" name="radio" id="radio3" value="mathematics" className='hidden peer' />
//                         <label htmlFor="radio3" className='cursor-pointer'>
//                             Mathematics
//                         </label>
//                     </div>
//                     <div className='radio-item'>
//                         <input type="radio" name="radio" id="radio4" value="physics" className='hidden peer' />
//                         <label htmlFor="radio4" className='cursor-pointer'>
//                             Physics
//                         </label>
//                     </div> */}
//                 </div>
//             </div>

//             {/* next & prev */}
//             <div className='flex justify-end gap-4 mt-6'>
//                 <button onClick={handlePrev} className='btn bg-[#ff2929] px-6 text-white'>Prev</button>
//                 <button onClick={handleNext} className='btn bg-[#33be1a] px-6 text-white'>Next</button>
//             </div>
//         </div>
//     );
// };

// export default MCQ;