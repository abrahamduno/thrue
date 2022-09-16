import { createApp } from 'vue'
import App from './App.vue'

import './css/theme.css'
import './css/css.css';

import store from './store';

createApp(App).use(store).mount('#app')
