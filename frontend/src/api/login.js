import axios from 'axios';
async function loginUser(email, password){

    try{
        console.log("email:", email, "password:", password);
        let response = await axios.post(`${import.meta.env.VITE_AXIOS_API}/api/login`, { email, password }, {
        withCredentials: true
      });
        console.log({response});
        return response.data;
    } catch (error) {
        console.error({error});
        return error.response.data;
    }
}

export { loginUser };