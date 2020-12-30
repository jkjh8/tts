import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VuetifyDialog from 'vuetify-dialog'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'vuetify-dialog/dist/vuetify-dialog.css'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false
axios.defaults.baseURL = 'http://' + window.location.hostname + ':3000'
Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

Vue.use(VuetifyDialog, {
  context: {
    vuetify
  }
})
