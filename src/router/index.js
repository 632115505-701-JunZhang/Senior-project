import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView";
import RegisterView from "../views/RegisterView.vue";
import ForgetView from "../views/ForgetView.vue";
import ResetView from "../views/ResetView.vue";
import RentView from "../views/RentView.vue";
import Rentfound from "../views/RentfoundView.vue";
import DetailView from "../views/DetailView.vue";
import ManageView from "../views/ManageView.vue";
import AddcardView from "../views/AddcardView.vue";
import MycardView from "../views/MycardView.vue";

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
  {
    path: "/rent",
    name: "Rent",
    component: RentView,
    children: [],
  },
  {
    path: "/find/:houses",
    name: "Find",
    component: Rentfound,
    props: true,
    // meta: {
    //   showFather: false,
    // },
  },
  {
    path: "/detail",
    name: "Detail",
    component: DetailView,
    children: [],
    props: true,
  },
  {
    path: "/manage",
    name: "Manage",
    component: ManageView,
    children: [],
  },
  {
    path: "/addcard",
    name: "Addcard",
    component: AddcardView,
    children: [],
  },
  {
    path: "/mycard",
    name: "Mycard",
    component: MycardView,
    children: [],
  },
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
