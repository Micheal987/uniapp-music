const {
	service
} = require('../config/config.js')
//首页轮播
const get_banners = () => {
	return service({
		url: `/banner`,
		method: "get"
	})
}
// 首页-发现-圆形图标入口列表
// 说明 : 调用此接口 , 可获取 APP 首页圆形图标入口列表
const get_icon = () => {
	return service({
		url: `/homepage/dragon/ball`,
		method: "get"
	})
}
//推荐歌单
// 说明 : 调用此接口 , 可获取推荐歌单
// 可选参数 : limit: 取出数量 , 默认为 30 (不支持 offset)
const push_list = (limit) => {
	return service({
		url: `/personalized?limit${limit}`,
		method: "get"
	})
}
//获取歌单详情
// 说明 : 歌单能看到歌单名字, 但看不到具体歌单内容 , 调用此接口 , 
// 传入歌单 id, 可 以获取对应歌单内的所有的音乐(未登录状态只能获取不完整的歌单,登录后是完整的)，
// 但是返回的 trackIds 是完整的，tracks 则是不完整的，可拿全部 trackIds 
// 请求一次 song/detail 接口获取所有歌曲的详情 (https://github.com/Binaryify/NeteaseCloudMusicApi/issues/452)
// 必选参数 : id : 歌单 id
// 可选参数 : s : 歌单最近的 s 个收藏者,默认为 8
const song_palylist = (id, s) => {
	return service({
		url: `/playlist/detail?id=${id}&?s=${s}`
	})
}
// 获取歌曲详情
// 说明 : 调用此接口 , 传入音乐 id(支持多个 id, 用 , 隔开), 可获得歌曲详情
// 必选参数 : ids: 音乐 id, 如 ids=347230
// 接口地址 : /song/detail
// 调用例子 : /song/detail?ids=347230,/song/detail?ids=347230,347231
const song_detail = (ids) => {
	return service({
		url: `/song/detail?ids=${ids}`,
	})
}
// 获取歌单所有歌曲
// 说明 : 由于网易云接口限制，歌单详情只会提供 10 首歌，通过调用此接口，传入对应的歌单id，即可获得对应的所有歌曲
// 必选参数 : id : 歌单 id
// 可选参数 : limit : 限制获取歌曲的数量，默认值为当前歌单的歌曲数量
// 可选参数 : offset : 默认值为0，用于歌曲的分页，计算方法为 limit * offset<= 你得到的歌曲 <= limit * offset + 1
// 接口地址 : /playlist/track/all
// 调用例子 : /playlist/track/all?id=24381616&limit=10&offset=1
const palylist_track = (id) => {
	return service({
		url: `/playlist/track/all?id=${id}`
	})
}

// 歌单评论
// 说明 : 调用此接口 , 传入音乐 id 和 limit 参数 , 可获得该歌单的所有评论 ( 不需要 登录 )
// 必选参数 : id: 歌单 id
// 可选参数 : limit: 取出评论数量 , 默认为 20
// offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
// before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过 5000 条评论的时候需要用到)
// 接口地址 : /comment/playlist
// 调用例子 : /comment/playlist?id=705123491
const playlist_msg = (id, limit, offset) => {
	return service({
		url: `/comment/playlist?id=${id}&limit=${limit}&offset=${offset}`
	})
}
// 新歌速递
// 说明 : 调用此接口 , 可获取新歌速递
// 必选参数 :
// type: 地区类型 id,对应以下:
// 全部:0
// 华语:7
// 欧美:96
// 日本:8
// 韩国:16
const new_music = (type = "96") => {
	return service({
		url: `/top/song?type=${type}`
	})
}
const new_est = () => {
	return service({
		url: `/album/newest`
	})
}
// 新碟上架
// 说明 : 调用此接口 , 可获取新碟上架列表 , 如需具体音乐信息需要调用获取专辑列表接 口 /album , 然后传入 id, 如 /album?id=32311&limit=30
// 可选参数 :
// limit: 取出数量 , 默认为 50
// offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
// area: ALL:全部,ZH:华语,EA:欧美,KR:韩国,JP:日本
// type : new:全部 hot:热门,默认为 new
// year : 年,默认本年
// month : 月,默认本月
// 接口地址 : /top/album
// 调用例子 : /top/album?offset=0&limit=30&year=2019&month=6
const news_album = (limit, offset, area, type) => {
	return service({
		url: `/top/album?limit=${limit}&offset=${offset}&area=${area}&type=${type}`
	})
}
// 数字专辑-新碟上架
// 说明 : 调用此接口 ,可获取数字专辑-新碟上架
// 可选参数 :
// limit : 返回数量 , 默认为 30
// offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
// 接口地址 : /album/list
// 调用例子 : /album/list?limit=10
const num_list = (limit, offset) => {
	return service({
		url: `/album/list?limit=${limit}&offset=${offset}`
	})
}
// 获取歌单所有歌曲
// 说明 : 由于网易云接口限制，歌单详情只会提供 10 首歌，通过调用此接口，传入对应的歌单id，即可获得对应的所有歌曲
// 必选参数 : id : 歌单 id
// 可选参数 : limit : 限制获取歌曲的数量，默认值为当前歌单的歌曲数量
// 可选参数 : offset : 默认值为0
// 接口地址 : /playlist/track/all
// 调用例子 : /playlist/track/all?id=24381616&limit=10&offset=1

const all_song = (id, limit, offset) => {
	return service({
		url: `/playlist/track/all?id=${id}&limit=${limit}&offset=${offset}`
	})
}
// 获取音乐 url
// 说明 : 使用歌单详情接口后 , 能得到的音乐的 id, 但不能得到的音乐 url, 调用此接口, 传入的音乐 id
//( 可多个 , 用逗号隔开 ), 可以获取对应的音乐的 url,未登录状态或者非会员返回试听片段(返回字段包含被截取的正常歌曲的开始时间和结束时间)
// 注 : 部分用户反馈获取的 url 会 403,hwaphon找到的解决方案是当获取到音乐的 id 后，将 https://music.163.com/song/media/outer/url?id=id.mp3 以 src 赋予 Audio 即可播放
// 必选参数 : id : 音乐 id
// 可选参数 : br: 码率,默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推
// 接口地址 : /song/url
// 调用例子 : /song/url?id=33894312 /song/url?id=405998841,33894312
const songurl = (id) => {
	return service({
		url: `/song/url?id=${id}`
	})
}
// 热门歌单分类
// 说明 : 调用此接口,可获取歌单分类,包含 category 信息
// 接口地址 : /playlist/hot
// 调用例子 : /playlist/hot
const cat_egory = () => {
	return service({
		url: `/playlist/hot`
	})
}
// 获取歌词
// 说明 : 调用此接口 , 传入音乐 id 可获得对应音乐的歌词 ( 不需要登录 )
// 必选参数 : id: 音乐 id
// 接口地址 : /lyric
// 调用例子 : /lyric?id=33894312
const lyri_c = (id) => {
	return service({
		url: `/lyric?id=${id}`
	})
}
// 推荐电台
// 说明 : 调用此接口 , 可获取推荐电台
// 接口地址 : /personalized/djprogram
// 调用例子 : /personalized/djprogram
const song_category = () => {
	return service({
		url: `/personalized/djprogram`
	})
}
// 所有榜单内容摘要
// 说明 : 调用此接口,可获取所有榜单内容摘要
// 接口地址 : /toplist/detail
// 调用例子 : /toplist/detail
const top_list = () => {
	return service({
		url: '/toplist/detail'
	})
}
// 歌单收藏者
// 说明 : 调用此接口 , 传入歌单 id 可获取歌单的所有收藏者
// 必选参数 :
// id : 歌单 id
// 可选参数 : limit: 取出评论数量 , 默认为 20
// offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
// 接口地址 : /playlist/subscribers
// 调用例子 : /playlist/subscribers?id=544215255&limit=30
const subscribers = (parm) => {
	return service({
		url: '/playlist/subscribers',
		data: parm
	})
}
// 获取相似歌单
// 说明 : 调用此接口 , 传入歌曲 id, 可获得相似歌单
// 必选参数 : id: 歌曲 id
// 接口地址 : /simi/playlist
// 调用例子 : /simi/playlist?id=347230 ( 对应 ' 光辉岁月 ' 相似歌单 )
const simi = (id) => {
	return service({
		url: `/simi/playlist?id=${id}`
	})
}
// 对歌单添加或删除歌曲
// 说明 : 调用此接口 , 可以添加歌曲到歌单或者从歌单删除某首歌曲 ( 需要登录 )
// 必选参数 :
// op: 从歌单增加单曲为 add, 删除为 del
// pid: 歌单 id tracks: 歌曲 id,可多个,用逗号隔开
// 接口地址 : /playlist/tracks
// 调用例子 : /playlist/tracks?op=add&pid=24381616&tracks=347231
const adminsongs = (parm) => {
	return service({
		url: `/playlist/tracks`,
		data: parm
	})
}
// 发送/删除评论
// 说明 : 调用此接口,可发送评论或者删除评论
// 接口地址 : /comment
// 发送评论
// 必选参数
// t:1 发送, 2 回复
// type: 数字,资源类型,对应歌曲,mv,专辑,歌单,电台,视频对应以下类型
const addcomments = (parm) => {
	return service({
		url: `/comment`,
		data: parm
	})
}
// mv 地址
// 说明 : 调用此接口 , 传入 mv id,可获取 mv 播放地址
// 必选参数 : id: mv id
// 可选参数 : r: 分辨率,默认 1080,可从 /mv/detail 接口获取分辨率列表
// 接口地址 : /mv/url
// 调用例子 :
// /mv/url?id=5436712 /mv/url?id=10896407&r=1080
const palymv = (id, r) => {
	return service({
		url: `/mv/url?id=${id}&r=${r}`
	})
}
// 获取 mv 数据
// 说明 : 调用此接口 , 传入 mvid ( 在搜索音乐的时候传 type=1004 获得 ) ,
//  可获取对应 MV 数据 , 数据包含 mv 名字 , 歌手 , 发布时间 , mv 视频地址等数据 ,
//  其中 mv 视频 网易做了防盗链处理 , 可能不能直接播放 , 需要播放的话需要调用 ' mv 地址' 接口
// 必选参数 : mvid: mv 的 id
// 接口地址 : /mv/detail
// 调用例子 : /mv/detail?mvid=5436712
// 返回数据如下图 :
const mvdata = (mvid) => {
	return service({
		url: `/mv/detail?mvid=${mvid}`
	})
}
// mv 评论
// 说明 : 调用此接口 , 传入音乐 id 和 limit 参数 , 可获得该 mv 的所有评论 ( 不需要 登录 )
// 必选参数 : id: mv id
// 可选参数 : limit: 取出评论数量 , 默认为 20
// offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
// before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过 5000 条评论的时候需要用到)
// 接口地址 : /comment/mv
// 调用例子 : /comment/mv?id=5436712
const mvcomments = (parm) => {
	return service({
		url: `/comment/mv`,
		data: parm
	})
}
// 电台 - 详情
// 说明 : 登录后调用此接口 , 传入rid, 可获得对应电台的详情介绍
// 必选参数 : rid: 电台 的 id
// 接口地址 : /dj/detail
// 调用例子 : /dj/detail?rid=336355127 ( 对应 ' 代码时间 ' 的详情介绍 )
const Radio_data = (id) => {
	return service({
		url: `/dj/detail?rid=${id}`
	})
}
// 电台 - 节目
// 说明 : 登录后调用此接口 , 传入rid, 可查看对应电台的电台节目以及对应的 id, 需要 注意的是这个接口返回的 mp3Url 已经无效 ,
// 都为 null, 但是通过调用 /song/url 这 个接口 , 传入节目 id 仍然能获取到节目音频 , 如 /song/url?id=478446370 
// 获取代 码时间的一个节目的音频
// 必选参数 : rid: 电台 的 id
// 可选参数 :
// limit : 返回数量 , 默认为 30
// offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
// asc : 排序方式,默认为 false (新 => 老 ) 设置 true 可改为 老 => 新
// 接口地址 : /dj/program
// 调用例子 : /dj/program?rid=336355127&limit=40 ( 对应 ' 代码时间 ' 的节目列表 )
const program = (parm) => {
	return service({
		url: `/dj/program`,
		data: parm
	})

}
const musicon = (parm) =>{
	return service({
		url:`/comment/music`,
		data:parm
	})
}
// 获取每日推荐歌曲
// 说明 : 调用此接口 , 可获得每日推荐歌曲 ( 需要登录 )
// 接口地址 : /recommend/songs
// 调用例子 : /recommend/songs
const daymusic = () =>{
	return service({
		url:`/recommend/songs`
	})
}
export {
	get_banners,
	get_icon,
	push_list,
	song_palylist,
	song_detail,
	palylist_track,
	playlist_msg,
	new_music,
	news_album,
	num_list,
	all_song,
	songurl,
	cat_egory,
	lyri_c,
	new_est,
	song_category,
	top_list,
	subscribers,
	simi,
	adminsongs,
	addcomments,
	palymv,
	mvdata,
	mvcomments,
	Radio_data,
	program,
	musicon,
	daymusic
}
