import axios from 'axios';

const logoutUser = async () => {
    try{

        const response = await axios.get(`${import.meta.env.VITE_AXIOS_API}/api/logout`,{
            withCredentials: true
        });
        return response.data;
    }catch(error){
        return error.response?.data ?? {
            success: false,
            message: 'Unable to log out'
        };
    }
}

export default logoutUser;