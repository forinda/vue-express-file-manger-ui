import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import FontAwesomeIcon from "./plugins/fontawesome";

createApp(App).use(router).component("fa", FontAwesomeIcon).mount("#app");
