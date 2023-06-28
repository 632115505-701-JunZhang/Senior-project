import axios from "axios";

const ApiClient = axios.create({
  //通用请求地址
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  //超时时间
  timeout: 5000,
});

//添加请求拦截器
// ApiClient.interceptors.request.use(
//   function (config) {
//     //在发送请求之前做什么
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

//添加响应拦截器
// ApiClient.interceptors.response.use(
//   function (response) {
//     //对响应数据做点什么
//     return response;
//   },
//   function (error) {
//     //对响应错误做什么
//     return Promise.reject(error);
//   }
// );

export default ApiClient;
