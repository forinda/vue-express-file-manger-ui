import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/project/:projectId",
    name: "project",
    component: () => import("@/views/Project.vue"),
  },
  {
    path: "/project/:projectId/upload-image",
    name: "upload-image",
    component: () => import("@/views/UploadImage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
