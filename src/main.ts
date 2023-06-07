import { createApp } from "vue";
import './style.scss';

import App from "./App.vue";
import AppPage from './js/ui/AppPage.vue';
import AppLoader from './js/ui/AppLoader.vue'
import AppSection from './js/ui/AppSection.vue';
import AppSectionHeader from './js/ui/AppSectionHeader.vue';

const app = createApp(App);

app.component("AppPage", AppPage);
app.component("AppLoader", AppLoader);
app.component("AppSection", AppSection);
app.component("AppSectionHeader", AppSectionHeader);

app.mount('#app');