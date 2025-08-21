import { createApp } from "vue";
import { Skapi } from "skapi-js";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";

const app = createApp(App);

app.use(router);

app.mount("#app");

const SERVICE_ID = "ap22uU9iEzUsYtdNgi5D";
const OWNER_ID = "bf305ace-03b5-4f9d-b88f-291458748ca3";

let options = {
    autoLogin: true,
    eventListener: {
        onLogin: (user) => {
            if (!user) {
                // user is not logged in.
                // If url is welcome.html redirect to index.html
                if (router.path === "/welcome") {
                    router.push("/");
                }
            }
        },
    },
};

export const skapi = new Skapi(SERVICE_ID, OWNER_ID, options);
