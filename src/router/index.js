import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView";
import RegisterView from "../views/RegisterView.vue";

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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
