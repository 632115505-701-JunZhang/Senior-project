import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView";
import RegisterView from "../views/RegisterView.vue";
import ForgetView from "../views/ForgetView.vue";
import ResetView from "../views/ResetView.vue";
import RentView from "../views/RentView.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: LoginView,
  },

  {
    path: "/register",
    name: "Register",
    component: RegisterView,
  },

  {
    path: "/home",
    name: "Home",
    component: HomeView,
    children: [],
  },
  {
    path: "/fpwd",
    name: "Fpwd",
    component: ForgetView,
  },
  {
    path: "/resetpwd/:email",
    name: "Resetpwd",
    component: ResetView,
  },
  { path: "/rent", name: "Rent", component: RentView },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

//路由守卫

// router.beforeEach((to, from, next) => {
//   //验证token 存在token的时候跳转到内容页
//   let Go = localStorage.getItem("token");
//   if (Go || to.path === "/") {
//     next();
//   } else {
//     next("/login");
//   }
// });

export default router;
