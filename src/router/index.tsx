import { createRouter, createMemoryHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "home",
        component: () => import("@/views/Home.vue"),
    }
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;