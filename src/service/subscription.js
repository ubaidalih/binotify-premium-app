import axios from "../axios";

export const getSubs = async () => {
    const result = await axios.get(`subscription`);
    return result;
}

export const approval = async (data) => {
    const result = await axios.post(`subscription/approval`, data );
    return result;
}

export const reject = async (data) => {
    const result = await axios.post(`subscription/reject`, data );
    return result;
}
