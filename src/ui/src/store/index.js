import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
	actions: {

	},
	mutations: {
		setConfig: (state, payload) => {
			// Payload = {
			// 	showOnlyBrands: ['evga', 'asus', 'msi', 'nvidia'],
			// 	showOnlyModels: [],
			// 	showOnlySeries: ['3080'],
			// 	stores: [
			// 		{maxPageSleep: 10000, minPageSleep: 10000, name: 'adorama'},
			// 		{maxPageSleep: 10000, minPageSleep: 10000, name: 'amazon'},
			// 		{maxPageSleep: 10000, minPageSleep: 10000, name: 'asus'},
			// 		{maxPageSleep: 10000, minPageSleep: 10000, name: 'bestbuy'},
			// 		{maxPageSleep: 10000, minPageSleep: 10000, name: 'gamestop'},
			// 		{maxPageSleep: 10000, minPageSleep: 10000, name: 'newegg'},
			// 		{maxPageSleep: 10000, minPageSleep: 10000, name: 'bandh'}
			// 	]
			// };
			state.config = payload;
			state.brands = payload.showOnlyBrands;
			state.models = payload.showOnlyModels;
			state.series = payload.showOnlySeries;
			state.stores = payload.stores;
		}
	},
	state: {
		brands: {},
		config: {},
		models: {},
		series: {},
		stores: {}
	}
});
