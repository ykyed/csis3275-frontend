import { createWebHistory, createRouter } from "vue-router";
import ShoeList from "../components/ShoeList.vue";

const routes = [
    {
        path: "/",
        alias: "/shoelist",
        name: "shoeList",
        component: ShoeList
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
