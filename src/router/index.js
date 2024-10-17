import { createWebHistory, createRouter } from "vue-router";
import ShoeList from "../components/ShoeList.vue";
import ShoeDetailInfo from "../components/ShoeDetailInfo.vue";
import UserLogin from "../components/UserLogin.vue";
import CartItem from "../components/CartItem.vue";
import AdminPage from "../components/AdminPage.vue";
import SignUp from '../components/SignUp.vue';

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
    },
    {
        path: "/admin",
        name: "AdminPage",
        component: AdminPage
    },

    {
        path: '/signup',
        name: 'SignUp',
        component: SignUp
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
