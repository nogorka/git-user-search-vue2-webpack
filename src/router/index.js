import Vue from "vue";
import VueRouter from "vue-router";
import ResultView from "@/views/ResultView.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: ResultView,
    },
    {
      path: "/search",
      name: "search",
      component: ResultView,
    },
    {
      path: "/user/:id",
      name: "user",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/AboutView.vue"),
    },
  ],
});

export default router;
