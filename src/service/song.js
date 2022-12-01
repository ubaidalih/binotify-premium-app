import axios from "../axios";

export const create = async (data, config) => {
    const result = await axios.post(`song/create`, data, config);
    return result;
}

export const read = async (data) => {
    const result = await axios.post(`song/read`, data);
    return result;
}

export const songDetail = async (song_id) => {
    const result = await axios.get(`song/songdetail?song_id=${song_id}`);
    return result;
}

export const update = async (data, config) => {
    const result = await axios.post(`song/update`, data, config);
    return result;
}

export const remove = async (data, config) => {
    const result = await axios.post(`song/delete`, data, config);
    return result;
}
