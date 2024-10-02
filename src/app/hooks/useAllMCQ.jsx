import React, { useState } from 'react';

const useAllMCQ = () => {
    const [allMCQ, setAllMCQ] = useState([]);
    return [allMCQ, setAllMCQ];
};

export default useAllMCQ;