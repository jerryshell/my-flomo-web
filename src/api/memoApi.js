import api from "./api";

const memoApi = {
    list: () => {
        return api.get('/memo/list')
    },
    create: data => {
        return api.post('/memo/create', data)
    },
}

export default memoApi;
