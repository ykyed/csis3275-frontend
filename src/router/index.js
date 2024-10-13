import { createWebHistory, createRouter } from "vue-router";
import ShoeList from "../components/ShoeList.vue";
import ShoeDetailInfo from "../components/ShoeDetailInfo.vue";
import UserLogin from "../components/UserLogin.vue";
import CartItem from "../components/CartItem.vue";

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
    },
    {
        path: "/login",
        name: "UserLogin",
        component: UserLogin
    },
    {
        path: "/cart",
        name: "CartItem",
        component: CartItem
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
