import axios from "../axios";

export const create = async (data) => {
    const result = await axios.post(`song/create`, data );
    return result;
}

export const read = async (user_id, data) => {
    const result = await axios.get(`song/read?user_id=${user_id}`, data );
    return result;
}

export const songDetail = async (song_id) => {
    const result = await axios.get(`song/songdetail?song_id=${song_id}`);
    return result;
}

export const update = async (data) => {
    const result = await axios.post(`song/update`, data );
    return result;
}

export const remove = async (data) => {
    const result = await axios.post(`song/delete`, data );
    return result;
}
