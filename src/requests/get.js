import axios from 'axios';


const getMCQ = async(category, skill) => {

    try{
        const res = await axios.get(`http://localhost:4000/quiz?category=${category}&skill=${skill}`)
        return res.data
    }
    catch (error)
    {
        console.log("Error Fetching MCQ", error);
        return []
    }
 
};

export default getMCQ;