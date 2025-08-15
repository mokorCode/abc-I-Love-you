import { createRouter, createWebHashHistory } from "vue-router";
import Gaming from "@/views/Gaming/Gaming.vue";
export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: Gaming,
    },
  ],
});
