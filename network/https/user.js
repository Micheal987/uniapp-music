import {
	service
} from "../config/config.js"
const iphoe_user = (iphoe, password) => {
	return service({
		url: `/login/cellphone?phone=${iphoe}&password=${password}`
	})
}
const email_user = (email, password) => {
	return service({
		url: `/login?email=${email}&password=${password}`
	})
}
// 获取用户歌单
// 说明 : 登录后调用此接口 , 传入用户 id, 可以获取用户歌单
// 必选参数 : uid : 用户 id
// 可选参数 :
// limit : 返回数量 , 默认为 30
// offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
// 接口地址 : /user/playlist
// 调用例子 : /user/playlist?uid=32953014
const user_list = (uid, limit, offset) => {
	return service({
		url: `/user/playlist?uid=${uid}&limit=${limit}&offset=${offset}`
	})
}

// 喜欢音乐列表
// 说明 : 调用此接口 , 传入用户 id, 可获取已喜欢音乐 id 列表(id 数组)
// 必选参数 : uid: 用户 id
// 接口地址 : /likelist
// 调用例子 : /likelist?uid=32953014

const user_like = (uid) => {
	return service({
		url: `/likelist?uid=${uid}`
	})
}

// 获取用户信息 , 歌单，收藏，mv, dj 数量
// 说明 : 登录后调用此接口 , 可以获取用户信息
// 接口地址 : /user/subcount
// 调用例子 : /user/subcount

const user_data = () => {
	return service({
		url: `/user/subcount`
	})
}

// 登录状态
// 说明 : 调用此接口,可获取登录状态
// 接口地址 : /login/status
const s_t = () => {
	return service({
		url: `/login/status`
	})
}
// 刷新登录
// 说明 : 调用此接口 , 可刷新登录状态
// 调用例子 : /login/refresh
const user_res = () => {
	return service({
		url: `/login/refresh`
	})
}
// 新建歌单
// 说明 : 调用此接口 , 传入歌单名字可新建歌单
// 必选参数 : name : 歌单名
// 可选参数 :
// privacy : 是否设置为隐私歌单，默认否，传'10'则设置成隐私歌单
// type : 歌单类型,默认'NORMAL',传 'VIDEO'则为视频歌单,传 'SHARED'则为共享歌单
// 接口地址 : /playlist/create
// 调用例子 : /playlist/create?name=测试歌单,/playlist/create?name=test&type=VIDEO
const createlist = (parm) =>{
	return service({
		url:`/playlist/create`,
		data:parm
	})
}
// 获取用户播放记录
// 说明 : 登录后调用此接口 , 传入用户 id, 可获取用户播放记录
// 必选参数 : uid : 用户 id
// 可选参数 : type : type=1 时只返回 weekData, type=0 时返回 allData
// 接口地址 : /user/record
// 调用例子 : /user/record?uid=32953014&type=1
const userplaylist = (parm) =>{
	return service({
		url:`/user/record`,
		data:parm
	})
}
// 获取用户详情
// 说明 : 登录后调用此接口 , 传入用户 id, 可以获取用户详情
// 必选参数 : uid : 用户 id
// 接口地址 : /user/detail
// 调用例子 : /user/detail?uid=32953014
const userdata = (uid) =>{
	return service({
		url:`/user/detail?uid=${uid}`
	})
}
export {
	iphoe_user,
	email_user,
	user_list,
	user_like,
	user_data,
	s_t,
	user_res,
	createlist,
	userplaylist,
	userdata
}
