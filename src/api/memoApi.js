import api from "./api";

const memoApi = {
    list: () => {
        return api.get('/memo/list')
    },
    create: data => {
        return api.post('/memo/create', data)
    },
    deleteById: id => {
        return api.post(`/memo/delete/id/${id}`)
    },
}

export default memoApi;
