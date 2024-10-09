// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';

// 导入组件
import ReDirection from '../components/ReDirection.vue';
import LoginForm from '../components/LoginForm.vue';
import Home from "../components/Home.vue";


// 定义路由
const routes = [
    {
        path: '/',
        name: 'ReDirection',
        component: ReDirection
    },
    {
        path: '/login',
        name: 'LoginForm',
        component: LoginForm
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },

];

// 创建路由实例
const router = createRouter({
    history: createWebHistory(), // 使用 HTML5 history 模式
    routes
});

export default router;
