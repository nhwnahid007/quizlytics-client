import React, { useState } from 'react';

const useQuestionNumber = () => {
    const [currentMCQ, setCurrentMCQ] = useState(9);
    return [currentMCQ, setCurrentMCQ];
};

export default useQuestionNumber;