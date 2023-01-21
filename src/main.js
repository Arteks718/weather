import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import App from "./App.vue";
import Weather from "./components/Weather.vue";
import WeatherInfo from "./components/WeatherInfo.vue";
import axios from "axios";
import VueAxios from "vue-axios";

const routes = [
  { path: "/", component: Weather },
  { path: "/weatherinfo/:id", component: WeatherInfo, props: true },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

createApp(App).use(VueAxios, axios).use(router).mount("#app");
