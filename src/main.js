import { createApp } from "vue";
import "./styles.css";
import PrimeVue from "primevue/config";
import "primeicons/primeicons.css";
import App from "./App.vue";
import Lara from "./presets/lara";

createApp(App)
.use(PrimeVue, {
    unstyled: true,
    pt: Lara
})
.mount("#app");
