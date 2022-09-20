import { createApp } from 'vue'
import App from './App.vue'

import './scripts/styles/theme.css'
import './scripts/styles/css.css';

import store from './scripts/store';

createApp(App).use(store).mount('#app')
