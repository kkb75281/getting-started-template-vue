import { createRouter, createWebHistory } from "vue-router";
import Index from "../views/Index.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import Welcome from "../views/Welcome.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "index",
            component: Index,
        },
        {
            path: "/login",
            name: "login",
            component: Login,
        },
        {
            path: "/signup",
            name: "signup",
            component: Signup,
        },
        {
            path: "/signup-success",
            name: "signup-success",
            component: () => import("../views/SignupSuccess.vue"),
        },
        {
            path: "/welcome",
            name: "welcome",
            component: Welcome,
        },
    ],
});

export default router;
