import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist/dist/umd';

Vue.use(Vuex);

const vuexPersist = new VuexPersist({
  key: 'user-balance',
  storage: window.localStorage
})
export const store = new Vuex.Store({
	state: {
		userBalance: 5000000000,
    // title: "Pembayaran",
    // countdownTimeInterval: null,
    // isTimeout: false,
    // modalCounter: 0,
	},
	mutations: {
		mutateUserBalance: state => {
			state.userBalance;
		},
    // mutateTitle(state, title) {
    //   state.title = title;
    // },
    // setTimeInterval(state, interval) {
    //   state.countdownTimeInterval = interval;
    // },
    // setTimeout(state, payload) {
    //   state.isTimeout = payload;
    // },
    // modalCounterIncrement(state) {
    //   state.modalCounter++;
    // },
	},
	plugins: [vuexPersist.plugin],
});
