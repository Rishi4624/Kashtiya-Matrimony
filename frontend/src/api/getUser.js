import axios from 'axios';

const getUser = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_AXIOS_API}/api/user`, {
            withCredentials: true,
        });

        return response.data;
    } catch (error) {
        return error.response?.data ?? {
            success: false,
            message: 'Unable to load user',
        };
    }
};

export { getUser };
export default getUser;