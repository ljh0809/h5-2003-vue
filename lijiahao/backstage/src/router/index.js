import Vue from 'vue'
import VueRouter from 'vue-router'



Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login/Login.vue')
    },
    {
        path: '/',
        name: 'Home',
        redirect() {
            return '/index'
        },
        component: ()=>import('../views/Home/Home'),
        meta:{
            isLogin:true    // 添加该字段，表示进入这个路由是需要登录的
        },
        children: [{
            path: 'order',
            name: 'order',
            component: () => import('../components/product/Deal.vue'),
            meta:{
                isLogin:true    // 添加该字段，表示进入这个路由是需要登录的
            }
            },

            {
                path: 'index',
                name: 'index',
                component: () => import('../components/home/index.vue'),
                meta:{
                    isLogin:true    // 添加该字段，表示进入这个路由是需要登录的
                }
            },
            {
                path:'manage',
                name:'manage',
                component:()=>import('../components/category/Manage'),
                meta:{
                    isLogin:true    // 添加该字段，表示进入这个路由是需要登录的
                }
            },
            {
                path:'goodslist',
                name:'goodslist',
                component:()=>import('../components/goodslist/goodslist.vue'),
                meta:{
                    isLogin:true    // 添加该字段，表示进入这个路由是需要登录的
                }
            },
            {
                path:'information',
                name:'information',
                component:()=>import('../components/information/information.vue'),
                meta:{
                    isLogin:true    // 添加该字段，表示进入这个路由是需要登录的
                }
            },
            {
                path:'user',
                name:'user',
                component:()=>import('../components/user/user.vue'),
                meta:{
                    isLogin:true    // 添加该字段，表示进入这个路由是需要登录的
                }
            },
            {
                path:'caretaker',
                name:'caretaker',
                component:()=>import('../components/user/caretaker.vue'),
                meta:{
                    isLogin:true    // 添加该字段，表示进入这个路由是需要登录的
                }
            }
            ]
    },
    {
        path: '*',
        name:'Nofind',
        component:()=>import('../views/Nofind'),
    },

]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})
router.beforeEach((to,from,next)=>{
    if(to.matched.some(res=>res.meta.isLogin)){//判断是否需要登录
        if (localStorage['token']) {
            next();
        }else{
            next({
                path:"/login",

            });
        }

    }else{
        next()
    }
})
export default router
