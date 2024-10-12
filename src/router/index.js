import { createWebHistory, createRouter } from "vue-router";
import ShoeList from "../components/ShoeList.vue";
import ShoeDetailInfo from "../components/ShoeDetailInfo.vue";

const routes = [
    {
        path: "/",
        name: "ShoeList",
        component: ShoeList
    },
    {
        path: "/shoes/:productCode",
        name: "ShoeDetailInfo",
        component: ShoeDetailInfo
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
