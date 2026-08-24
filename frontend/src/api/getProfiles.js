import axios from 'axios';


async function getUsers() {

    try{

        const response = await axios.get(`${import.meta.env.VITE_AXIOS_API}/api/get-profiles`, {
            withCredentials: true
        })
        if(response.data.success){
            return response.data.users || [];
        }
    }catch(error){
        console.log(error);
        return [];
    }

}

export default getUsers;