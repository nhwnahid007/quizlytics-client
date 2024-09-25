"use client";
import React, { useEffect, useState } from 'react';
import MCQ from '../Shared/MCQ';
import { getMCQ } from '@/requests/get';

const Questions = ({currentMCQ, setCurrentMCQ}) => {
    const [allMCQ, setAllMCQ] = useState([]);
    const [exactMCQ, setExactMCQ] = useState([]);

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
    }, []);

    useEffect(() => {
        const getOneExpected = () => {
            const expectedOne = allMCQ.find((question) => parseInt(question.id) === currentMCQ);
            setExactMCQ(expectedOne); 
        }
        getOneExpected();
    }, [allMCQ, currentMCQ])


    if (!allMCQ || allMCQ.length === 0) {
        return <div>Loading data...</div>;  
    }

    return (
        <div className='w-[90%] md:w-[580px] mx-auto'>
            <MCQ currentMCQ={currentMCQ} setCurrentMCQ={setCurrentMCQ} exactMCQ={exactMCQ} />
        </div>
    );
};

export default Questions;
