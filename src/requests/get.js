import axios from 'axios';

export const getMCQ = async () => {
    try {
        const res = await axios.get("https://quiz.muktikathan.com/quiz?category=html&skill=advanced");
        return res.data;
    } catch (error) {
        console.error("Error fetching MCQ:", error);
        return [];
    }
}