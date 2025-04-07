import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: () => import('../views/HomePage')
    },
    {
        path: '/install',
        name: 'InstallPage',
        component: () => import('../views/InstallPage')
    },
    {
        path: '/models',
        name: 'ModelsPage',
        component: () => import('../views/ModelsHomePage')
    },
    {
        path: '/models/create',
        name: 'ModelCreatePage',
        component: () => import('../views/ModelCreatePage')
    },
    {
        path: '/models/detail/:uname?/:mname?',
        name: 'ModelDetailPage',
        component: () => import('../views/ModelDetailPage')
    },
    {
        path: '/about',
        name: 'AboutPage',
        component: () => import('../views/AboutPage')
    },
    {
        path: '/usr/:uname?',
        name: 'UserPage',
        component: () => import('../views/UserPage')
    },
    {
        path: '/settings',
        name: 'SettingsPage',
        component: () => import('../views/SettingsPage')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior () {
        return {top: 0}
    }
})

export default router;