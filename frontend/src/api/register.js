import axios from 'axios';
async function registerUser(name, email, password) {
    try {
        console.log("name:", name, "email:", email, "password:", password);
        let response = await axios.post(`${import.meta.env.VITE_AIXOS_API}`, { name, email, password });
        console.log({response});
        return response.data;
    } catch (error) {
        console.error({error});
        return error.response.data;
    }
}
export { registerUser };