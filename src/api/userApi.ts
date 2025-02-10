import api from "./api";

const userApi = {
  updateEmail: (data: { email: string }) => {
    return api.post("/user/updateEmail", data);
  },
  updatePassword: (data: { password: string }) => {
    return api.post("/user/updatePassword", data);
  },
};

export default userApi;
