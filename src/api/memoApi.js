import api from "./api";

const memoApi = {
    list: () => {
        return api.get('/memo/list')
    }
}

export default memoApi;
