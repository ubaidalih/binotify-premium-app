import axios from "../axios";

const create = async (data) => {
    const result = await axios.post(`song/create`, data );
    return result;
}

const read = async (user_id, data) => {
    const result = await axios.get(`song/read?user_id=${user_id}`, data );
    return result;
}

const songDetail = async (song_id) => {
    const result = await axios.get(`song/songdetail?song_id=${song_id}`);
    return result;
}

const update = async (data) => {
    const result = await axios.post(`song/update`, data );
    return result;
}

const remove = async (data) => {
    const result = await axios.post(`song/delete`, data );
    return result;
}

export default {create, read, songDetail, update, remove};