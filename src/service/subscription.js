import axios from "../axios";

export const getSubs = async (config) => {
    const result = await axios.get(`subscription`, config);
    return result;
}

export const approval = async (data, config) => {
    const result = await axios.post(`subscription/approval`, data, config );
    return result;
}

export const reject = async (data, config) => {
    const result = await axios.post(`subscription/reject`, data, config );
    return result;
}
