import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import './assets/global.css'

// fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
library.add(fas, far, fab)

const app = createApp(App)
app.use(store).use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')