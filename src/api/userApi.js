import api from "./api"

const userApi = {
    updateEmail: data => {
        return api.post('/user/updateEmail', data)
    },
}

export default userApi
