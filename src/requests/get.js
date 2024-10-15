import axios from 'axios';
import Swal from 'sweetalert2';

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


