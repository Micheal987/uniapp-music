import {
	baseURL
} from './base.js'; //导入接口的前缀地址

export const service = (options) => {
	return new Promise((resolve, reject) => {
		let token = uni.getStorageSync("user_token")
		uni.request({
			url: baseURL + options.url, //接口地址：前缀+方法中传入的地址
			method: options.method || 'GET', //请求方法：传入的方法或者默认是“GET”
			withCredentials: true, //跨域请求时是否携带凭证（cookies）
			header: {
				user_token: token
			}, //设置请求的 header
			data: options.data || {}, //传递参数：传入的参数或者默认传递空集合
			success: (res) => {
				console.log("开始请求", res);
				//返回的数据（不固定，看后端接口，这里是做了一个判断，如果不为true，用uni.showToast方法提示获取数据失败)
				if (res.statusCode === 200) {
					resolve(res)
				} else {
					uni.showToast({
						title: '获取数据失败',
						icon: 'none'
					})
				}
				// 如果不满足上述判断就输出数据
			},
			// 这里的接口请求，如果出现问题就输出接口请求失败
			fail: (err) => {
				console.log("接口请求失败", err),
					uni.showToast({
						title: '获取数据失败',
						icon: 'none'
					})
				reject(err)
			}
		})
	})
}
