import {createRouter, createWebHistory} from 'vue-router';
import Home from '../pages/Home.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/user/:login',
        name: 'User',
        component: () => import('../pages/User.vue'),
    }
];

export default createRouter({
    history: createWebHistory(),
    routes
});