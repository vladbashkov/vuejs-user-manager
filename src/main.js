import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../node_modules/materialize-css/dist/js/materialize.min.js'
import Vuelidate from 'vuelidate'
import Paginate from 'vuejs-paginate'

Vue.mixin({
  URLmixin: 'https://6202c7314d21c200170b9a3c.mockapi.io/users',
  headers: {
    "Content-Type": 'application/json'
  }
})

Vue.use(Vuelidate);
Vue.component('paginate', Paginate)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
