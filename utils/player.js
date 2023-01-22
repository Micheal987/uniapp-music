//vuex
import store from "@/store/index.js"
const playerAudio = uni.createInnerAudioContext();
//播放器方法
//播放实例
const playaudio = (val) => {
	playerAudio.src = val.url;
	playerAudio.autoplay = true;
	playerAudio.onPlay(() => {
		console.log("开始播放")
	});
	playerAudio.onError((res) => {
		console.log(res.errMsg);
		console.log(res.errCode);
	});
	playerAudio.onTimeUpdate(() => {
		store.dispatch('curtime', playerAudio.currentTime)
	})
	playerAudio.onCanplay(() => {
		store.dispatch('durtime', playerAudio.duration)
	});
}
export {
	playerAudio,
	playaudio,
}
