import axios from "../axios";

export const listPenyanyi = async () => {
    const result = await axios.get(`listpenyanyi`);
    return result;
}

export const listPenyanyiById = async (user_id) => {
    const result = await axios.get(`listpenyanyi/id?user_id=${user_id}`);
    return result;
}
