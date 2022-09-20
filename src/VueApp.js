import { createApp } from 'vue'
import App from './App.vue'

import './styles/theme.css'
import './styles/css.css';

import store from './scripts/store';

createApp(App).use(store).mount('#app')
