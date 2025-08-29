import { createApp } from "vue";
import { Skapi } from "skapi-js";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";

const app = createApp(App);

app.use(router);

app.mount("#app");

const SERVICE_ID = "";
const OWNER_ID = "";

export const skapi = new Skapi(SERVICE_ID, OWNER_ID);
