import { createApp } from 'vue'
import App from './App.vue'

// ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import './styles.css';

const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')
