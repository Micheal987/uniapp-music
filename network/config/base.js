let baseURL = '';
// 是否在控制台显示接口请求日志,本地环境启用,打包环境禁用
let showHttpLog = true;
// 测试环境
// baseURL = 'http://47.106.148.51:3000';
baseURL = '/api';
// 正式环境
// baseURL = 'XXXXX.XXXXX.com';
module.exports = {
	baseURL: baseURL,
	showHttpLog: showHttpLog,
	head:{}
}
