import api from './api'

const authApi = {
  login: (data: {
    username: string,
    password: string,
  }) => {
    return api.post('/auth/login', data)
  },
}

export default authApi
