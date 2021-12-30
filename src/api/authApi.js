import api from "./api"

const authApi = {
    login: data => {
        return api.post('/auth/login', data)
    },
}

export default authApi
