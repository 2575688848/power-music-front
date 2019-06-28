import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './js/router/routes.js'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import store from './vuex/store'
import VueAplayer from 'vue-aplayer'

import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


Vue.use(VueRouter);
Vue.use(ElementUi);
Vue.use(VueAxios, Axios);
Vue.use(Vuex);
Vue.use(VueAplayer);

//Axios.defaults.baseURL = 'http://localhost:8080/music'
Axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'
Axios.defaults.withCredentials = true

const router = new VueRouter({
	mode: 'history',
  routes // (缩写) 相当于 routes: routes
})

new Vue({
	router,
	store,
  el: '#app',
  render: h => h(App)
})
