import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    redirect: "/login",
    path: "/",
    name: "/",
    meta: { hidden: true }
  },
  {
    path: "/403",
    name: "Error403",
    meta: { hidden: true, title: "403" },
    component: () => import("@/views/403.vue")
  },
  {
    path: "/404",
    name: "Error404",
    meta: { hidden: true, title: "404" },
    component: () => import("@/views/404.vue")
  },
  {
    path: "/500",
    name: "Error500",
    meta: { hidden: true, title: "500" },
    component: () => import("@/views/500.vue")
  },
  {
    path: "/login",
    name: "Login",
    meta: { hidden: true, title: "登录" },
    component: () => import("@/views/Login.vue")
  },
  {
    path: "/home",
    name: "Home",
    meta: { title: "首页" },
    component: () => import("@/views/Home.vue")
  },
  {
    redirect: "/404",
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    meta: { title: "首页" },
  },
]
export default routes