import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import p404 from '../views/p404.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        props: true
    },
    {
        path: '/cart',
        name: 'Cart',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: function () {
            return import(/* webpackChunkName: "about" */ '../views/Cart.vue');
        }
    },
    {
        path: '/good',
        name: 'Good',
        component: function () {
            return import('../views/Good.vue');
        }
    },
    {
        path: '*',
        name: 'p404',
        component: function () {
            return import('../views/p404.vue');
        }
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
