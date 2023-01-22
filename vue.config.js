module.exports = {
	devServer: {
		port: '8080',
		disableHostCheck: true,
		proxy: {
			'/api': {
				target: 'http://47.106.148.51:3000',
				changeOrigin: true,
				pathRewrite: {
					'^/api': ''
				}
			}
		}
	}
}
