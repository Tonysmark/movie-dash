import Vue from "vue";
import Router from "vue-router";
import About from "./views/About.vue";
import Recommand from "./views/Recommand.vue";
import Comments from "./views/Comments.vue";
import Recent from "./views/Recent.vue";
import Comming from "./views/Comming.vue";
import bilibili from "./components/BilibiliReview.vue";
import subComments from "./components/subComments.vue";
Vue.use(Router);

export default new Router({
  // mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "recent", // 近期上映
      component: Recent
    },
    {
      path: "/comming",
      name: "comming", //即将上映
      component: Comming
    },
    {
      path: "/about",
      name: "about", // 关于作者
      component: About
    },
    {
      path: "/recommand",
      name: "recommand", // top推荐
      component: Recommand
    },
    {
      path: "/comments",
      name: "comments", // 影评
      component: Comments,
      children: [
        {
          path: "/bilibili",
          name: "bilibili",
          component: bilibili
        },
        {
          path: "/subComments",
          name: "subComments",
          component: subComments
        }
      ],
      redirect: "/bilibili"
    }
  ],
  redirect: "/"
});
