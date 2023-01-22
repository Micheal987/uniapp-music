//日期处理简单方法
const formatDate = (value) => {
	let date = new Date();
	let month = date.getMonth() + 1;
	let hours = date.getHours();
	if (hours < 10) hours = '0' + hours;
	let minutes = date.getMinutes();
	if (minutes < 10) minutes = '0' + minutes;
	let time = date.getFullYear() + '-' + month + '-' + date.getDate() + ' ' + hours + ':' + minutes;
	return time;

}
//日期处理
const dateFormat = (fmt, date) => {
	let ret;
	const opt = {
		"Y+": date.getFullYear().toString(), // 年
		"m+": (date.getMonth() + 1).toString(), // 月
		"d+": date.getDate().toString(), // 日
		"H+": date.getHours().toString(), // 时
		"M+": date.getMinutes().toString(), // 分
		"S+": date.getSeconds().toString() // 秒
		// 有其他格式化字符需求可以继续添加，必须转化成字符串
	};
	for (let k in opt) {
		ret = new RegExp("(" + k + ")").exec(fmt);
		if (ret) {
			fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
		};
	};
	return fmt;
}
export {
	formatDate,
	dateFormat
}
