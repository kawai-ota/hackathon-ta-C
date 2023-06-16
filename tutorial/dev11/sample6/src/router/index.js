import { createRouter, createWebHistory } from "vue-router"
import Home from "../components/Home.vue"
import Hello from "../components/Hello.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/rakus",
      component: Hello,
      name: "hello"
    }
  ],
})

export default router