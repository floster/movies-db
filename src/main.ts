import { createApp } from "vue";
import './style.scss';

import App from "./App.vue";
import AppSection from './js/ui/AppSection.vue';
import AppPage from './js/ui/AppPage.vue';

const app = createApp(App);

app.component("AppSection", AppSection);
app.component("AppPage", AppPage);

app.mount('#app');