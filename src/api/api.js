import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:8080/",
});

api.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.token = token;
    }
    return config;
});

api.interceptors.response.use(async (response) => {
    const token = localStorage.getItem('token');
    if (response.data.code === 401 && token) {
        localStorage.removeItem('token');
        window.location.href = '/';
        return Promise.reject(response);
    }
    return response;
});

export default api
