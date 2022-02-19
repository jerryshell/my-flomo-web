import api from './api'

const userApi = {
    updateEmail: (data: {
        email: string,
    }) => {
        return api.post('/user/updateEmail', data)
    },
}

export default userApi
