import { createWebHistory, createRouter, RouteRecordRaw } from "vue-router";


const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "登录",
    component: () => import("@/view/login.vue"),
  },
  {
    path: '/404',
    name: "404",
    component: () => import("@/view/exception/404.vue"),
  }
  ,
  {
    path: "/admin",
    name: "管理首页",
    component: () => import("@/view/layout.vue"),
    children: [
      {
        path: 'sys',
        name: '系统管理',
        component: () => import("@/view/sys/system.vue"),
        children: [
          {
            path: 'role',
            name: "角色管理",
            component: () => import("@/view/sys/role.vue")
          },
          {
            path: 'user',
            name: "用户管理",
            component: () => import("@/view/sys/user.vue")
          },
          {
            path: 'menu',
            name: "菜单管理",
            component: () => import("@/view/sys/menu.vue")
          },
          {
            path: 'sql',
            name: "sql监控",
            component: () => import("@/view/sys/sql.vue")
          },
          {
            path: 'param',
            name: "参数管理",
            component: () => import("@/view/sys/param.vue")
          },
        ]
      },
      {
        path: "article",
        name: "博客管理",
        redirect: () => ({ path: "/admin/article/list" }),
        component: () => import("@/view/article/article.vue"),
        children: [
          {
            path: "list",
            name: "博客列表",
            component: () => import("@/view/article/article.vue")
          }
        ]
      },
      {
        path: "read",
        name: "阅读管理",
        component: () => import("@/view/read/read.vue"),
        redirect: () => ({ path: "/admin/read/note" }),
        children: [
          {
            path: "note",
            name: "笔记管理",
            component: () => import("@/view/read/note.vue")
          },
          {
            path: "book",
            name: "图书管理",
            component: () => import("@/view/read/book.vue")
          }

        ]
      },


      {
        path: "operation",
        name: "运营管理",
        component: () => import("@/view/operation/operation.vue"),
        redirect: () => ({ path: "/admin/operation/tag" }),
        children: [
          {
            path: "tag",
            name: "标签管理",
            component: () => import("@/view/operation/tag.vue")
          },
          {
            path: "recommend",
            name: "推荐管理",
            component: () => import("@/view/operation/recommend.vue")
          },
          {
            path: "category",
            name: "分类管理",
            component: () => import("@/view/operation/category.vue")
          },
          {
            path: "link",
            name: "友链管理",
            component: () => import("@/view/operation/link.vue")
          },

        ]
      },


    ]
  },

  {
    path: "/:catchAll(.*)",
    name: "其他",
    redirect: () => ({ path: "/404" })
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

//白名单中的路径不需要登录鉴权
const whileList = [
  "/login", "/404"
]

router.beforeEach((to, from, next) => {

  console.log(`即将从${from.fullPath} 跳转到 ${to.fullPath}`)
  //白名单页面则不需要验证token
  if (whileList.includes(to.path)) {
    next();
  } else {
    //否则需要验证token的有效性；
    const token = localStorage.getItem("self_blog_token");
    if (token) {
      //TODO验证token
      next();
    } else {
      next("/login");
    }
  }
})

export default router;