import { createWebHistory, createRouter } from "vue-router";
import ShoesList from "../components/ShoesList.vue";
import ShoesDetail from "../components/ShoesDetail.vue";

const routes = [
    {
        path: "/",
        alias: "/shoes",
        name: "shoesList",
        component: ShoesList
    },
    {
        path: "/:title",
        name: "shoesDetail",
        component: ShoesDetail
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
