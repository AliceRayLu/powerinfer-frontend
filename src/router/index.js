import { createRouter, createWebHashHistory } from "vue-router";

const routes = [

]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior () {
        return {top: 0}
    }
})

export default router;