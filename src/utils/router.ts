import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import Gaming from "@/views/Gaming/Gaming.vue";
export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Gaming
            }
        ]
    }
)