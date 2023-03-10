import axios from 'axios';

const api = axios.create({
    // baseURL: "http://localhost:3333", //mongodb server
    baseURL: "http://localhost:3300", //mysql server
    origin: true,
    withCredentials: true,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
    }
});

export default api;