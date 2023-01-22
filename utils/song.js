import {
	formatDate
} from "./time.js"
// 数字过万的处理
const formartNum = (val) => {
	let num = 0
	if (val > 9999) {
		num = Math.round(val / 10000 * 10) / 10 + '万'
	} else {
		num = val
	}
	return num
}
//处理歌词时间
const formatLyricTime = (time) => {
	// 格式化歌词的时间 转换成 sss:ms
	const regMin = /.*:/;
	const regSec = /:.*\./;
	const regMs = /\./;
	const min = parseInt(time.match(regMin)[0].slice(0, 2));
	let sec = parseInt(time.match(regSec)[0].slice(1, 3));
	const ms = time.slice(time.match(regMs).index + 1, time.match(regMs).index + 3);
	if (min !== 0) {
		sec += min * 60;
	}
	return Number(sec + '.' + ms);
}
//url获取处理
const albumSong = (items) => {
	let songs = {
		url: `https://music.163.com/song/media/outer/url?id=${items.id}.mp3`
	}
	return songs
}
const songitems = (items) => {

}
const songindex = (index) => {

}
const currentmsg = (items) => {
	let currentobj = {
		name: items.name,
		picUrl: items.al.picUrl
	}
	return currentobj
}
class music {
	static foot = 1100;
	constructor({
		url,
		name,
		cd
	}) {
		this.url = url
		this.name = name
		this.cd = cd
	}
}
const selectmusic = (items) => {
	console.dir(music);
	let select = new music({
		url: `https://music.163.com/song/media/outer/url?id=${items.id}.mp3`,
		name: items.name
	})
	return select
}
//歌曲数据处理
const songdata = (res) => {
	let list = res.playlist.subscribers
	let subscribers = []
	let map = new Map()
	subscribers = list.map((items, index) => {
		return items.avatarUrl
	})
	const singer = {
		name: res.playlist.name,
		trackCount: res.playlist.shareCount,
		coverImgUrl: res.playlist.coverImgUrl,
		createtime: res.playlist.createTime,
		commentCount: res.playlist.commentCount,
		subscribedCount: res.playlist.subscribedCount,
		avatarUrl: res.playlist.creator.avatarUrl,
		nickname: res.playlist.creator.nickname,
		description: res.playlist.description,
		shareCount: res.playlist.shareCount,
		playCount: res.playlist.playCount,
		userid:res.playlist.creator.userId,
		subscribers: subscribers
	}
	return singer
}
//歌曲id处理
const singerid = (val) => {
	let id = []
	let map = new Map()
	id = val.map((items, index) => {
		return items.id
	})
	return id
}
const getsong = () => {

}
const sortdata = (key) => {
	return (a, b) => {
		let no = a[key]
		let no1 = b[key]
		return no - no1
	}
}
const sortal = (key)=>{
	return (a, b) => {
		let no = a.al[key]
		let no1 = b.al[key]
		return no - no1
	}
}
const currtenitems = (items) =>{
	let currtenmsg ={
		picUrl:items.al.picUrl,
		name:items.name,
		id:items.id,
		alias:items.ar[0].name,
		alia:items.alia[0]
	}
	return currtenmsg
}
export {
	formartNum,
	formatLyricTime,
	albumSong,
	songitems,
	songindex,
	currentmsg,
	songdata,
	singerid,
	getsong,
	selectmusic,
	sortdata,
	currtenitems,
	sortal
}
