import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import * as VeeValidate from 'vee-validate';
import moment from 'moment'

Vue.config.productionTip = false
Vue.prototype.moment = moment
Vue.use(VeeValidate);

new Vue({
  router,
  store,
  components:{
  },
  render: h => h(App)
}).$mount('#app')
