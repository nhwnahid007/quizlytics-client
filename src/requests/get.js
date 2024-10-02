import axios from 'axios';

<<<<<<< HEAD
// export const getMCQ = async () => {
//     try {
//         const res = await axios.get("https://quiz.muktikathan.com/quiz?category=html&skill=advanced");
//         return res.data;
//     } catch (error) {
//         console.error("Error fetching MCQ:", error);
//         return [];
//     }
// }
=======

const getMCQ = async(category, skill) => {
    const url = `https://quizlytics.jonomukti.org/quiz?category=${category}&skill=${skill}`;
    console.log(url);
    try{
       
        const res = await axios.get(url)
        return res.data
    }
    catch (error)
    {
        console.log("Error Fetching MCQ", error);
        return []
    }
 
};

export default getMCQ;
>>>>>>> 432f196ef3e4c880c1fe25fd54d4a7a86cca69c6
