import { createApp } from 'vue'
import App from './App.vue'

import './res/css/theme.css'
import './res/css/css.css';

import store from './store';

createApp(App).use(store).mount('#app')
