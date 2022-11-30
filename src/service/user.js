import axios from "../axios";

const login = async (data) => {
    const result = await axios.post(`user/login`, data );
    return result;
}

const register = async (data) => {
    const result = await axios.post(`user/register`, data );
    return result;
}
export default {login, register};