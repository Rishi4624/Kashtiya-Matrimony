import axios from 'axios';

const toggleShortlist = async (targetUserId) => {
    try {
        const response = await axios.post(
            'http://localhost:5000/api/shortlist',
            { targetUserId },
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        console.error("Error toggling shortlist", error);
        return { success: false, message: error.message };
    }
}

export default toggleShortlist;
