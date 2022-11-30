import axios from "../axios";

const getSubs = async () => {
    const result = await axios.get(`subscription`);
    return result;
}

const approval = async (data) => {
    const result = await axios.post(`subscription/approval`, data );
    return result;
}

const reject = async (data) => {
    const result = await axios.post(`subscription/reject`, data );
    return result;
}

export default {getSubs, approval, reject};