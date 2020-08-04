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
        path: '/1',
        name: 'Show',
        component: () => import('../views/Zq/Show.vue')
    },
    {
        path: '/',
        name: 'Home',
        redirect() {
            return '/index'
        },
        component: ()=>import('../views/Home/Home'),
        children: [{
            path: 'goodsList',
            name: 'goodsList',
            component: () => import('../components/product/Deal.vue'),
            },
            {
                path: 'index',
                name: 'index',
                component: () => import('../components/home/index.vue'),
            }]
    },
    {
        path: '*',
        name:'Nofind',
        component:()=>import('../views/Nofind')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
