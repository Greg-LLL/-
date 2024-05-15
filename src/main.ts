import { createApp } from 'vue'
import 'normalize.css'
import './assets/css/index.less'
import App from './App.vue'
import router from './router'
import store from './store'
import registerIcons from '@/global/register-icons'

/* 本项目按需导入,需要在tsconfig.app.json的include里
添加 "auto-imports.d.ts","components.d.ts",才会有elementui组件的类型
按需导入的两个插件只有在template有效,其他地方需要自己导入
*/

// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// createApp(App).use(router).mount('#app')

// 针对ElMessage和elLoading等组件引入样式,新版element按需引入，安装插件后，无需这样
// import 'element-plus/theme-chalk/el-message.css'

const app = createApp(App)
app.use(registerIcons)
// app.use(ElementPlus)

// 处理刷新时，数据丢失，useRouter必须在这三段代码后面
// app.use(pinia)
// const loginStore = useLoginStore()
// loginStore.loadLocalCacheAction()

app.use(store)
app.use(router)
app.mount('#app')
