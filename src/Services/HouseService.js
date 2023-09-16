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
  houseSearch(house) {
    return apiClient.post("/houseSearch", house);
  },
  addHouse(house) {
    return apiClient.post("/setHouse", house);
  },
  updateHouse(house) {
    return apiClient.post("/updateHouse", house);
  },
  getUserById(id) {
    return apiClient.get("/getUserById/" + id);
  },
  getHouseByUserId(id) {
    return apiClient.get("/getHouseByUserId?id=" + id);
  },
  deleteHouseById(id) {
    return apiClient.get("/deleteHouseById?house_id=" + id);
  },
  uploadFile(file) {
    let formData = new FormData();
    formData.append("file", file);
    return apiClient.post("/uploadFile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
