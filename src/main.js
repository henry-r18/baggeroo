import { createApp } from "vue";
import PrimeVue from "primevue/config";
import Aura from '@primevue/themes/aura';
import "./assets/base.css"
import App from "./App.vue";
import { getVersion } from '@tauri-apps/api/app';
const appVersion = await getVersion();

createApp(App)
.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: 'system'
        }
    },
    ripple: true
})
.provide("appVersion", appVersion )
.mount("#app");
