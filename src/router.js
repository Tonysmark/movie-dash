import Vue from "vue";
import Router from "vue-router";
import Recent from "./views/Recent.vue";
import bilibili from "./components/BilibiliReview.vue";
import subComments from "./components/subComments.vue";
Vue.use(Router);
const router = new Router({
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
      component: () => import("./views/Comming.vue")
    },
    {
      path: "/about",
      name: "about", // 关于作者
      component: () => import("./views/About.vue")
    },
    {
      path: "/recommand",
      name: "recommand", // top推荐
      component: () => import("./views/Recommand.vue")
    },
    {
      path: "/login",
      name: "login", // 登录
      component: () => import("./views/Login.vue")
    },
    {
      path: "/comments",
      name: "comments", // 影评
      component: () => import("./views/Comments.vue"),
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
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.login ? true : false;
  if (to.path == "/login") {
    next(); // 登陆注册页面正常跳转
  } else {
    isLogin ? next() : next("/login");
  }
});
export default router;
