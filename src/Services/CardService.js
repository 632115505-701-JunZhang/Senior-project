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
  getCards() {
    return apiClient.get("/getCards");
  },
  searchCards(address, room_type, price, acc) {
    return apiClient.get(
      "/cardSearch?" +
        "address=" +
        address +
        "&room_type=" +
        room_type +
        "&price=" +
        price +
        "&share_accommodation=" +
        acc
    );
  },
  setCard(card) {
    return apiClient.post("/setCard", card);
  },
  getCardsByUserId(id) {
    return apiClient.get("/getCardsByUserId?id=" + id);
  },
  deleteCardById(id) {
    return apiClient.get("/deleteCard?id=" + id);
  },
  updateCard(card) {
    return apiClient.post("/updateCard", card);
  },
};
