//tools
import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

//using tools
Vue.use(Vuex);
Vue.use(VueRouter);


//files
import store from './store/store';
import routes from './routes';

// import bootstrap 4
import 'bootstrap/dist/css/bootstrap.css';

//import Toaster

import Toaster from 'v-toaster'
import 'v-toaster/dist/v-toaster.css'

Vue.use(Toaster, {timeout: 2000});


Vue.config.productionTip = false;


const router = new VueRouter({
  routes,
  mode: 'history',
});

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
