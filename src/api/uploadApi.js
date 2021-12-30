import api from "./api"

const uploadApi = {
    upload: data => {
        return api.post('/upload', data)
    },
}

export default uploadApi
