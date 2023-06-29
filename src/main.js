import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//导入全局element
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
//引入axios
import Request from "./Services/AxiosClient.js";

const app = createApp(App).use(store).use(router).use(ElementPlus);

app.config.globalProperties.$http = Request;
app.mount("#app");
