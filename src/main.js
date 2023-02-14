import * as vue from "vue";
import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import "./assets/styles/global.css";

const app = vue.createApp(App);

app.use(router);

app.mount("#app");
