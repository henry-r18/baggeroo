import { createApp, ref } from "vue";
import PrimeVue from "primevue/config";
import Aura from '@primevue/themes/aura';
import ToastService from 'primevue/toastservice';
import "./assets/base.css"
import App from "./App.vue";
import { getVersion } from '@tauri-apps/api/app';

const appVersion = ref();
getVersion().then( version => appVersion.value = version);

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
.use(ToastService)
.provide("appVersion", appVersion )
.mount("#app");
