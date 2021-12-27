import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import * as ElIcons from '@element-plus/icons-vue';
import "@/assets/css/global.css";
const app = createApp(App)

for (const name in ElIcons) {
  app.component(name, (ElIcons as any)[name])
}

app.use(router).mount('#app');