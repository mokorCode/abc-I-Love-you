import "@/scss/global.scss";
import { createPinia } from "pinia";
import { createApp } from "vue";
import { router } from './utils/router'
import App from "./App.vue";

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.mount("#app");