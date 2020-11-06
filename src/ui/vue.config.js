module.exports = {
	chainWebpack: config => {
		config.plugin('html').tap(args => {
			args[0].title = 'Streetmerchant:UI';
			return args;
		});
	},
	transpileDependencies: ['vuetify']
};
