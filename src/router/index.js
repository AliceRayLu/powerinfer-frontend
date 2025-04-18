import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: () => import('../views/HomePage'),
        meta: {
            title: "PowerInfer - Fast Large Language Model Serving with a Consumer-grade GPU & sparse models"
        }
    },
    {
        path: '/install',
        name: 'InstallPage',
        component: () => import('../views/InstallPage'),
        meta: {
            title: "Install - PowerInfer",
        }
    },
    {
        path: '/models',
        name: 'ModelsPage',
        component: () => import('../views/ModelsHomePage'),
        meta: {
            title: "Models - PowerInfer",
        }
    },
    {
        path: '/models/create',
        name: 'ModelCreatePage',
        component: () => import('../views/ModelCreatePage'),
        meta: {
            title: "Create Model - PowerInfer",
        }
    },
    {
        path: '/models/detail/:uname?/:mname?',
        name: 'ModelDetailPage',
        component: () => import('../views/ModelDetailPage'),
        meta: {
            titleTemplate: "%uname%/%mname% - PowerInfer",
        }
    },
    {
        path: '/about',
        name: 'AboutPage',
        component: () => import('../views/AboutPage'),
        meta: {
            title: "About - PowerInfer",
        }
    },
    {
        path: '/usr/:uname?',
        name: 'UserPage',
        component: () => import('../views/UserPage'),
        meta: {
            titleTemplate: "%uname% - PowerInfer",
        }
    },
    {
        path: '/settings',
        name: 'SettingsPage',
        component: () => import('../views/SettingsPage'),
        meta: {
            title: "Settings - PowerInfer",
        }
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior () {
        return {top: 0}
    }
})

router.beforeEach((to, from, next) => {
    // set title
    if (to.meta && to.meta.title) {
        document.title = to.meta.title;
    }
    if (to.meta && to.meta.titleTemplate) {
        const { uname, mname } = to.params;
        let title = to.meta.titleTemplate
            .replace('%uname%', uname || 'User');
        if (mname) {
            title = title.replace('%mname%', mname || 'Model');
        }
        document.title = title;
    }
    next();
});

export default router;