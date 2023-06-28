import request from "../Services/AxiosClient";

export const login = (data) => {
  return request({
    url: "/login",
    method: "POST",
    data,
  });
};
