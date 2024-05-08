import { createApp } from 'vue'
import 'normalize.css'
import './assets/css/index.less'
import App from './App.vue'
import router from './router'
import pinia from './store'

/* 本项目按需导入,需要在tsconfig.app.json的include里
添加 "auto-imports.d.ts","components.d.ts",才会有elementui组件的类型
按需导入的两个插件只有在template有效,其他地方需要自己导入
*/

// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// createApp(App).use(router).mount('#app')
const app = createApp(App)
app.use(router)
// app.use(ElementPlus)
app.use(pinia)
app.mount('#app')
