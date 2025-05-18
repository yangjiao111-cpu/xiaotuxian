// 引入初始化样式
import '@/styles/common.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// 引入懒加载指令并且注册
import { lazyPlugin } from './directives/index'
// 引入全局组件插件
import { componentPlugin } from './components/index'
import App from './App.vue'
import router from './router'
const app = createApp(App)
const pinia = createPinia()
// 注册持久化插件
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.mount('#app')
app.use(lazyPlugin)
app.use(componentPlugin)