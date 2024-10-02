import axios from 'axios';

// export const getMCQ = async (category, level) => {
//     console.log(category, level);
//     try { 
//         const res = await axios.get('/data.json'); // Fetch from public folder
//         return res.data;
//     } catch (error) {
//         console.error("Error fetching MCQ:", error);
//         return [];
//     }
// }

export const getMark = async(examId) => {
    try {
        const res = await axios.get(`http://localhost:5000/my_mark/${examId}`);
        return res.data;
    } catch (error) {
        console.error("Error fetching MCQ:", error);
        return [];
    }
}



// import axios from 'axios';

// export const getMCQ = async (category, level) => {
//     console.log(category, level);
//     try {
//         // const res = await axios.get(`https://quizlytics.jonomukti.org/quiz?category=${category}&skill=${level}`);
//         // const res = await axios.get(`https://quizlytics.jonomukti.org/quiz?category=python&skill=beginner`);
//         return res.data;
//     } catch (error) {
//         console.error("Error fetching MCQ:", error);
//         return [];
//     }
// }

// https://quizlytics.jonomukti.org/quiz?category=nodejs&skill=beginner
// https://quiz.muktikathan.com/quiz?category=html&skill=advanced