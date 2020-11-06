import Home from '../views/Home';
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
	{
		component: Home,
		name: 'Home',
		path: '/'
	},
	{
		component: () =>
			import('../views/Panel'),
		name: 'Panel',
		path: '/panel'

	},
	{
		path: '*',
		redirect: '/'
	}
];

const router = new VueRouter({
	base: process.env.BASE_URL,
	mode: 'history',
	routes
});

export default router;
