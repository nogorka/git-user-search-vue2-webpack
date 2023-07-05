import Vue from "vue";
import VueRouter from "vue-router";
import ResultView from "@/views/ResultView.vue";
import AboutView from "@/views/AboutView.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: "/",
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
      component: AboutView,
    },
  ],
});

export default router;
