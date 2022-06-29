import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import directivePlugin from './Plugins'

import '@/assets/scss/index.scss'

createApp(App).use(store).use(router).use(directivePlugin).mount('#app')
