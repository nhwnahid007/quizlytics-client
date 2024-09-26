import axios from 'axios';


const getMCQ = async(category, skill) => {

    const url = `https://quiz.muktikathan.com/quiz?category=${category}&skill=${skill}`
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