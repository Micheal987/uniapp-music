//防抖
const debounce = (fn, wait) => {
	let timeout = null
	if (timeout) clearTimeout(timeout);
	timeout = setTimeout(fn, wait)
}
//节流
function throttle(fn, wait) {
	let prev = Date.now()
	return function() {
		let now = Date.now()
		if (now - prev > wait) {
			console.log("节流");
			fn.call(this)
			prev = Date.now()
		}
	}
}
//节流
//第二种方法
// const throttle = (fn, wait) => {
// 	let timeout = null
// 	return () => {
// 		if (!timeout) {
// 			timeout = setTimeout(() => {
// 				console.log(fn);
// 				fn.apply(this)
// 				console.log("节流");
// 				timeout = null
// 			}, wait)
// 		}
// 	}
// }
//节流
//箭头函数
//this有问题
// const throttle = (fn, wait) => {
// 	let prev = Date.now()
// 	return () => {
// 		let now = Date.now()
// 		if (now - prev > wait) {
// 			console.log("节流");
// 			fn.call(this)
// 			console.log(this);
// 			prev = Date.now()
// 		}
// 	}
// }

export {
	debounce,
	throttle
}
