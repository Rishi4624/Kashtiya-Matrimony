import axios from 'axios';

export async function addInterest(user){

    try{

        const response = await axios.post(`${import.meta.env.VITE_AXIOS_API}/api/add-interest`, { user }, {
            withCredentials: true
        })

        return response;

    }catch(error){
        return error;
    }
}