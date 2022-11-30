import axios from "../axios";

export const login = async (data) => {
    const result = await axios.post(`user/login`, data );
    return result;
}

export const register = async (data) => {
    const result = await axios.post(`user/register`, data );
    return result;
}