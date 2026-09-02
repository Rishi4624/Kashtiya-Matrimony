import axios from 'axios';

const getShortlist = async () => {
    try {
        const response = await axios.get(
            'http://localhost:5000/api/shortlist',
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching shortlist", error);
        return { success: false, message: error.message, shortlisted: [] };
    }
}

export default getShortlist;
