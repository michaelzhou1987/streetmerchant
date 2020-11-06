import App from './App';
import Vue from 'vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

new Vue({
	render: h => h(App),
	router,
	store,
	vuetify
}).$mount('#app');
