import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import "font-awesome/css/font-awesome.min.css"
Vue.config.productionTip = false
window.axios = axios
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
