import Vue from 'vue'
import axios from 'axios'
import {store} from './store/store'
import Index from './index.vue'
import toCurrencyFormat from './plugins/toCurrencyFormat'

Vue.prototype.$http = axios;
Vue.filter('toCurrencyFormat', toCurrencyFormat);

new Vue({
  el: '#app',
  store,
  render: h => h(Index)
})
