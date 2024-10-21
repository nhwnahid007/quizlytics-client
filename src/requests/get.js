import axios from 'axios';


export const getMCQ = async (category, level) => {
    console.log(category, level);
    try {
        const res = await axios.get(`https://quizlytics.jonomukti.org/quiz?category=${category}&skill=${level}`);
        return res.data;
    } catch (error) {   
        console.error("Error fetching MCQ:", error);
        return [];
    }

}
export const getQuizByLink = async (artLink) => {
    
    try {
        const res = await axios.get(`http://localhost:4000/testByLink?link=${artLink}`);
        return res.data;
    } catch (error) {   
        console.error("Error fetching MCQ:", error);
        return [];
    }
}

export const getMark = async(examId) => {
    try {
        const res = await axios.get(`https://quizlytics-server-gamma.vercel.app/my_mark/${examId}`);
        return res.data;
    } catch (error) {
        console.error("Error fetching MCQ:", error);
        return [];
    }
}

export const getCustomQuiz = async(quizKey) =>{
    try{
        const res = await axios.get(`https://quizlytics.jonomukti.org/getCustomQuizByKey?qKey=${quizKey}`)
        return res.data;
    } catch(error){
        console.error("Error fetching Custom Quiz:", error);
    
        return [];
    }
}

export const allCustomQuiz = async() =>{
    try{
        const res = await axios.get(`https://quizlytics.jonomukti.org/allCustomQuiz`)
        return res.data;
    } catch(error){
        console.error("Error fetching All Custom Quiz:", error);
        return [];
    }
}

export const getSubmissionByKey = async (key, email)=>{
    try{
        const res = await axios.get(`https://quizlytics.jonomukti.org/historyByKey?qKey=${key}&email=${email}`)
        return res.data;
    } catch(error){
        console.error("Error fetching submissions by key:", error)
        return [];
    }
}
export const getSubmissionByQuizTitle = async (searchCategory, email)=>{
    try{
        const res = await axios.get(`https://quizlytics.jonomukti.org/historyByUserAi?qTitle=${searchCategory}&email=${email}`)
        return res.data;
    } catch(error){
        console.error("Error fetching submissions by key:", error)
        return [];
    }
}

export const getLeaders = async()=>{
    try{
        const res = await axios.get(`https://quizlytics.jonomukti.org/leaderboard`)
        return res.data;
    } catch(error){
        console.log("Error fetching leaderboard:", error);
        return [];
    }
}


