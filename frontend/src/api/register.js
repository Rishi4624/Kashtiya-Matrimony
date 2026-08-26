import axios from 'axios';
async function registerUser(registerData) {
    try {
        let response = await axios.post(`${import.meta.env.VITE_AXIOS_API}/api/register`,
            registerData,
            {withCredentials: true}
        
        );
        console.log({response});
        return response.data;
    } catch (error) {
        console.error({error});
        return error.response.data;
    }
}
export { registerUser };