import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_URL,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  register(user) {
    return apiClient.post("/register", user);
  },
  login(user) {
    return apiClient.post("/login", user);
  },
  getUser(id) {
    return apiClient.get("/getUserById/" + id);
  },
  updateUser(user) {
    return apiClient.post("/updateUser", user);
  },
  forgetPassword(email) {
    return apiClient.get("/forget-password?email=" + email);
  },
  resetPassword(body) {
    return apiClient.post("/reset-password", body);
  },
  saveUserPic(body) {
    return apiClient.post("/saveUserPic", body);
  },
  uploadFile(file) {
    let formDate = new FormData();
    formDate.append("file", file);
    return apiClient.post("/uploadFile", formDate, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
