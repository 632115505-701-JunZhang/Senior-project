import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView";
import RegisterView from "../views/RegisterView.vue";
import ForgetView from "../views/ForgetView.vue";
import ResetView from "../views/ResetView.vue";

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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

//路由守卫

export default router;
