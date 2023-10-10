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
  getChatPartners(user_id) {
    return apiClient.get("/findChatPartners?user_id=" + user_id);
  },
  getMessagesBetweenUsers(user_id, partner_id) {
    return apiClient.get(
      "/findMessagesBetweenUsers?user_id=" +
        user_id +
        "&partner_id=" +
        partner_id
    );
  },
  addMessage(message) {
    return apiClient.post("/addMessage", message);
  },
};
