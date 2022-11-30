import axios from "../axios";

const listPenyanyi = async () => {
    const result = await axios.get(`listpenyanyi`);
    return result;
}

const listPenyanyiById = async (user_id) => {
    const result = await axios.get(`listpenyanyi/id?user_id=${user_id}`);
    return result;
}


export default {listPenyanyi, listPenyanyiById};