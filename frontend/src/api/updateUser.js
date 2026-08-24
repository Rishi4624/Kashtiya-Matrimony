import axios from 'axios';

const updateUser = async ( formdata ) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_AXIOS_API}/api/updateUser`,
            formdata,
            { withCredentials: true }
        );

        return response.data;
    } catch (error) {
        return error.response?.data ?? {
            success: false,
            message: 'Unable to update user',
        };
    }
};

export { updateUser };
export default updateUser;

