import { createWebHistory, createRouter } from "vue-router";
import HelloWorldVue from "@/components/HelloWorld.vue";
import AboutVue from "@/components/About.vue";

const routes = [
  {
    path: "/",
    name: "首页",
    component: HelloWorldVue
  }, {
    path: "/about",
    name: "about",
    component: AboutVue
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;