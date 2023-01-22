<template>
	<view>
		<!-- 头部 -->
		<view class="navbar">
			<view class="nav-left" @click="leave"><u-icon name="arrow-left" color="#000" size="30"></u-icon></view>
			<view class="nav-center">{{ songs.name }}</view>
			<view class="nav-right">
				<!-- //模糊搜索 -->
				<view class="searchlist">
					<u-popup :show="show" :round="10" mode="bottom" @close="close" @open="open">
						<view>
							<view><u-search placeholder="模糊搜索" v-model="resultsName" @change="result"></u-search></view>
							<view class="searchlist-item">
								<view v-for="(item, index) in Dataresults" :key="index">{{ item.name }}</view>
							</view>
						</view>
					</u-popup>
				</view>
				<!-- ions -->
				<u-icon class="iocn-search" name="search" color="#000" size="30" @click="search"></u-icon>
				<view @click="more"><u-icon class="iocn-move" size="30" name="../../static/icon/更多.png"></u-icon></view>
			</view>
		</view>
		<view class="menu" v-if="moreshow" @click="moreclose">
			<view class="menu-list">
				<view class="name" v-if="songs.userid == userid.account.id" @click="addsong">添加歌曲</view>
				<view class="name" v-if="songs.userid == userid.account.id" >更新歌单名称</view>
				<view></view>
				<view @click="sequence">调整歌曲顺序</view>
			</view>
		</view>
		<u-modal :show="seqshow" :showConfirmButton="false" :showCancelButton="true" @cancel="order">
			<view class="seq">
				<view v-for="(items, seq) in seqlist" :key="seq" :class="{ sqeactive: active == seq ? 'sqeactive' : '' }" @click="seqse(seq)">
					<view>{{ items.name }}</view>
				</view>
			</view>
		</u-modal>
		<!-- 	标题 -->
		<view class="cover">
			<view class="cover-img" @click="covers"><image class="img" :src="songs.coverImgUrl" mode=""></image></view>
			<view class="cover-title">
				<view class="cover-detail">
					<view class="more">
						<view class="song">{{ songs.name }}</view>
						<view @click="showfold">
							<u-icon v-if="folds" name="/static/icon/s.png" color="#fff" size="28"></u-icon>
							<u-icon v-else name="/static/icon/x.png" color="#fff" size="28"></u-icon>
						</view>
					</view>
				</view>
				<view class="cover-user">
					<view class="cover-media">
						<view><image class="user-img" :src="songs.avatarUrl" mode=""></image></view>
						<view class="user-name">{{ songs.nickname }}</view>
					</view>
				</view>
				<!-- 弹出详情歌单封面 -->
				<u-popup :show="cover" @close="coverSclose" @open="coverSopen" mode="bottom">
					<view class="popus">
						<view class="popus-img"><img class="img" :src="songs.coverImgUrl" alt="" /></view>
						<view class="detail">{{ songs.description }}</view>
						<view class="timer">{{ songs.createtime | FormData }}</view>
						<!-- 收藏者 -->
						<view class="user">
							<view><u-avatar-group :urls="songs.subscribers" size="35" gap="0.4" maxCount="10"></u-avatar-group></view>
							<view class="subscribedCount" @click="usergroud">
								<view>{{ songs.subscribedCount | formartNum }}人收藏</view>
								<view><u-icon name="arrow-right" color="#000" size="28"></u-icon></view>
							</view>
						</view>
					</view>
				</u-popup>
			</view>
		</view>
		<!-- 相似歌单 -->
		<view class="fold" v-if="similarlist != '||null' && folds">
			<scroll-view scroll-x>
				<view class="fold-item">
					<view v-for="(item, num) in similarlist" :key="num" @click="golist(item, num)">
						<view><img class="img" :src="item.coverImgUrl" alt="" /></view>
						<view class="title">{{ item.name }}</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 背景虚化 -->
		<view class="head-bg" :style="{ background: 'url(' + songs.coverImgUrl + ')' }"></view>
		<!-- 	按钮 -->
		<!-- 添加数量 -->
		<view class="shadow">
			<view class="shadow-iocn">
				<view class="icon-1">
					<view><image class="img" src="../../static/icon/add-3.png" mode=""></image></view>
					<view class="icon-text">{{ songs.subscribedCount | formartNum }}</view>
				</view>
				<!-- 评论 -->
				<view class="icon-2">
					<image @click="msg" class="img" src="../../static/icon/ico-msg.png" mode=""></image>
					<view class="icon-text">{{ songs.commentCount | formartNum }}</view>
				</view>
				<!-- 	分享 -->
				<view class="icon-3">
					<u-icon name="share" color="#000" size="30"></u-icon>
					<view class="icon-text">{{ songs.shareCount | formartNum }}</view>
				</view>
			</view>
		</view>
		<view class="user">
			<view><u-avatar-group :urls="songs.subscribers" size="35" gap="0.4" maxCount="10"></u-avatar-group></view>
			<view class="subscribedCount" v-if="songs.subscribedCount != '' || null" @click="usergroud">
				<view>{{ songs.subscribedCount | formartNum }}人收藏</view>
				<view><u-icon name="arrow-right" color="#000" size="28"></u-icon></view>
			</view>
		</view>
		<!-- 	播放 -->
		<view class="play-list">
			<view class="list-1">
				<image class="img" src="../../static/icon/play.png" mode=""></image>
				<view class="text">播放全部({{ playlist.length }})</view>
			</view>
			<!-- 	//icon -->
			<view class="icon">
				<view class="list-2"><image class="img" src="../../static/icon/pull_down.png" mode=""></image></view>
				<view class="list-3"><image class="img" src="../../static/icon/check.png" mode=""></image></view>
			</view>
		</view>
		<!-- 播放列表 -->
		<view class="play-name">
			<view v-for="(items, index) in playlist" :key="index">
				<view class="name">
					<view class="song">
						<view class="song-name">
							<view class="index">{{ index + 1 }}</view>
							<view class="items" @click="getall(items, index)">
								<view class="items-name">{{ items.name }}</view>
								<view class="items-singer">{{ items.ar[0].name }}--{{ items.al.name }}</view>
							</view>
							<view class="right">
								<image v-if="items.mv != 0" class="img" src="@/static/icon/play1.png" mode="" @click="gomvlist(items)"></image>
								<image @click="alone(items, index)" class="img" src="@/static/icon/more.png" mode=""></image>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view>
				<u-popup :show="aloneshow" round="20" mode="bottom" overlayOpacity="0" @close="close1" @open="aloneopen">
					<view class="alone">
						<view class="head">
							<img class="img" :src="currtensong.picUrl" alt="" />
							<view class="name">
								{{ currtensong.name }}
								<view class="ar">{{ currtensong.alias }}</view>
							</view>
						</view>
						<view></view>
					</view>
					<beslayout :songid="currtensong.id" :ar="currtensong.alias"></beslayout>
				</u-popup>
			</view>
			<view v-if="playlist == '' || null"><button @click="addsong">添加歌曲</button></view>
		</view>
		<view class="foot"></view>
		<songplay></songplay>
	</view>
</template>
<script>
import { mapState, mapMutations } from 'vuex'; //vuex
import songplay from '@/components/player/songplay.vue';
import beslayout from './currten.vue';
import { debounce } from '@/utils/search.js';
const { song_palylist, song_detail, palylist_track, all_song, songurl, subscribers, simi } = require('@/network/https/api.js'); //请求
const { formartNum, albumSong, songdata, singerid, currtenitems, sortdata, sortal } = require('@/utils/song.js');
const { playaudio, playerAudio } = require('@/utils/player.js');
const { dateFormat } = require('@/utils/time.js');
export default {
	data() {
		return {
			songs: '', //歌单列表数据
			playlist: [], //歌单
			songid: '', //歌单id
			currentpage: 1, //当前页
			size: 20, //每页数量
			pagesize: [], //分割的数组
			toalpage: '', //总页数
			show: false, //模糊搜索开关
			resultsName: '', //模糊搜索输入框得值
			Dataresults: [], //模糊搜索返回得值
			cover: false, //歌单封面弹出层
			similarlist: [], //相似歌单
			userimgs: [], //收藏者
			moreshow: false,
			userid: '',
			folds: false,
			aloneshow: false,
			seqshow: false,
			currtensong: {},
			active: '',
			seqlist: [{ name: '默认' }, { name: '歌曲名称排序' }, { name: '专辑排序' }, { name: '歌手排序' }]
		};
	},
	onLoad(val) {
		//歌单id
		this.songid = val.id;
		this.songlist(); //传入歌单id
		this.userid = uni.getStorageSync('user');
		console.log('user', this.userid);
	},
	onReachBottom() {
		console.log('触底');
		this.currentpage++;
		if (this.currentpage > this.toalpage) return;
		uni.showLoading({
			title: '加载中',
			mask: true
		});
		setTimeout(() => {
			this.songlist();
			uni.hideLoading();
		}, 1000);
	},
	onPageScroll(e) {
		if (this.moreshow) {
			this.moreshow = false;
		}
		console.log('滚动距离为：' + e.scrollTop);
	},
	methods: {
		//歌单列表
		async songlist() {
			const s = 10; //参数
			const { data: res } = await song_palylist(this.songid, s); //请求
			let id = singerid(res.playlist.trackIds); //js处理id
			this.songs = songdata(res);
			console.log('sss', this.songs);
			this.playsong(id);
			this.similar(id);
			this.toalpage = Math.ceil(id.length / this.size); //总页数
		},
		//上拉加载更多
		async playsong(val) {
			//所有歌曲
			//假分页数据处理
			//第一种做法
			//数组分割平均每份几个
			//触底的时候 将分割得到的新数组index下标加或减
			//index为0开始
			// let count = 50;
			// this.pagesize = [];
			// // console.log(this.index);
			// for (let i = 0; i < val.length; i += count) {
			// 	this.pagesize.push(val.slice(i, i + count));
			// }
			// console.log('分割', this.pagesize);
			// if (this.index > this.pagesize.length) return;
			// const { data: songid } = await song_detail(this.pagesize[this.index]); //请求
			//截取的方法
			//数组截取一般从0开始
			//默认开始页码1，页面减1 *每页多少条，页码*每页多少条
			let id = val.slice((this.currentpage - 1) * this.size, this.currentpage * this.size); //分页
			const { data: res } = await song_detail(id); //请求
			this.playlist = [...this.playlist, ...res.songs]; //所有歌曲
			console.log('具体信息', res);
			//缓存
			uni.setStorage({
				key: 'music',
				data: this.playlist,
				success: function() {
					console.log('success');
				}
			});
		},
		//相似歌单
		async similar(id) {
			const { data: res } = await simi(id[this.currentpage - 1]);
			// this.similarlist.push(...res.playlists))
			this.similarlist = [...this.similarlist, ...res.playlists];
			// let name = [];
			// let arr = [];
			// for (let i = 0; i < this.similarlist.length; i++) {
			// 	if (name.indexOf(this.similarlist[i].id) == -1) {
			// 		name.push(this.similarlist[i].id);
			// 		arr.push(this.similarlist[i]);
			// 	}
			// }
			// this.similarlist = arr;
			// console.log('aaa', arr);
			let obj = {};
			this.similarlist = this.similarlist.reduce((cur, next) => {
				obj[next.id] ? '' : (obj[next.id] = true && cur.push(next));
				return cur;
			}, []);
		},
		alone(items, index) {
			console.log(items);
			this.currtensong = currtenitems(items);
			this.aloneshow = true;
		},
		close1() {
			this.aloneshow = false;
		},
		aloneopen() {},
		//收藏者
		usergroud() {
			//收藏者
			uni.navigateTo({
				url: `/views/collector/collector?id=${this.songid}`
			});
		},
		//评论
		msg() {
			console.log(this.songid);
			//评论
			uni.navigateTo({
				url: `/views/Comment/Comment?id=${this.songid}`
			});
		},
		showfold() {
			this.folds = !this.folds;
		},
		//播放实例调用
		async getall(item, index) {
			uni.$emit('song', { list: item });
			console.log('杀杀杀', index);
			//请求
			const { data: res } = await songurl(item.id);
			// //存起来MP3
			playaudio(res.data[0]);
			//缓存
			//currentmusic 当前歌曲信息
			uni.setStorage({
				key: 'currentmusic',
				data: item,
				success: () => {
					console.log('成功');
				}
			}),
				//index下标
				uni.setStorage({
					key: 'currentindex',
					data: index,
					success: () => {
						console.log('index');
					}
				});
			//播放页面
			uni.navigateTo({
				url: `/views/song/index?id=${item.id}`
			});
		},
		//模糊搜索
		//节流
		result() {
			debounce(() => {
				//找到为true的值然后返回出去
				this.Dataresults = this.playlist.filter(items => items.name.includes(this.resultsName) != false);
			}, 2000);
		},
		//歌单详情页面
		golist(items) {
			console.log(items.id);
			uni.navigateTo({
				url: `/views/song/play-list?id=${items.id}`
			});
		},
		more() {
			this.moreshow = true;
		},
		moreclose() {
			this.moreshow = false;
		},
		//添加歌单里面的歌曲
		addsong() {
			uni.navigateTo({
				url: `/views/song/adminsong?id=${this.songid}`
			});
		},
		//mv页面
		gomvlist(items) {
			uni.navigateTo({
				url: `/views/video/playmv?vid=${items.mv}`
			});
		},
		//返回
		leave() {
			uni.navigateBack({
				delta: 1
			});
		},
		//歌单
		coverSopen() {
			console.log('open');
		},
		coverSclose() {
			this.cover = false;
			console.log('close');
		},
		covers() {
			this.cover = true;
		},
		//模糊搜索
		open() {
			// console.log('open');
		},
		close() {
			this.show = false;
			// console.log('close');
		},
		search() {
			this.show = true;
		},
		sequence() {
			this.seqshow = true;
		},
		seqse(index) {
			this.active = index;
			//0默认
			//1歌曲名称
			//2专辑名称
			//3歌手名称
			this.seqshow = false;
			switch (this.active) {
				case 1:
					this.playlist.sort(sortdata('no'));
					break;
				case 2:
					this.playlist.sort(sortdata('pop'));
					break;
				case 3:
					this.playlist.sort(sortdata('publishTime'));
					// this.playlist.sort((a, b) => {
					// 	return a.ar[0].name - b.ar[0].name;
					// });
					break;
			}
		},
		order() {
			this.seqshow = false;
		}
	},
	//
	computed: {
		...mapState({
			currten: state => state.songs.currentimer
		})
	},
	//时间处理
	filters: {
		formartNum(val) {
			return formartNum(val);
		},
		//歌曲时间
		FormData(val) {
			let date = new Date();
			return dateFormat('YYYY年-mm月-d日-H时', date);
		}
	},
	components: {
		songplay,
		beslayout
	}
};
</script>

<style lang="scss" scoped>
.navbar {
	display: flex;
	margin-top: 10rpx;
	margin-left: 30rpx;
	align-items: center;
	.nav-left {
	}
	.nav-center {
		flex: 2;
		font-size: 30rpx;
		margin-left: 30rpx;
		white-space: nowrap;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.nav-right {
		display: flex;
		flex: 1;
		justify-content: flex-end;
		.searchlist {
			&-item {
				height: 150vw;
			}
		}
		.iocn-search {
			margin-right: 30rpx;
		}
		.iocn-move {
			margin-left: 10rpx;
			margin-right: 10rpx;
		}
	}
}
.menu {
	width: 200rpx;
	height: 400rpx;
	position: fixed;
	top: 30rpx;
	right: 10rpx;
	z-index: 3;
	background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);
	box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
	&-list {
		padding-top: 20rpx;
		text-align: center;
	}
}
.seq {
	display: flex;
	flex-direction: column;
	.sqeactive {
		color: red;
	}
}
.cover {
	padding-top: 130rpx;
	padding-bottom: 50rpx;
	padding-left: 60rpx;
	display: flex;
	align-items: center;
	z-index: 5;
	.cover-img {
		flex: 1;
		.img {
			width: 250rpx;
			height: 250rpx;
			border-radius: 40rpx;
		}
	}
	.cover-title {
		flex: 2;
		padding-left: 20rpx;
		.cover-detail {
			.more {
				display: flex;
				flex: 1;
				justify-content: center;
				.song {
					width: 350rpx;
					font-size: 32rpx;
					color: #ffffff;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 3; //2行
					-webkit-box-orient: vertical;
				}
			}
		}
		.cover-user {
			display: flex;
			padding-top: 30rpx;
			.cover-media {
				display: flex;
				flex: 1;
				.user-img {
					width: 60rpx;
					height: 60rpx;
					border-radius: 50%;
				}
				.user-name {
					line-height: 60rpx;
					text-align: center;
					margin-left: 20rpx;
					color: #fff;
				}
			}
		}
	}
	.popus {
		width: 50vh;
		height: 80vh;
		background-image: linear-gradient(to top, #accbee 0%, #e7f0fd 100%);
		&-img {
			display: flex;
			justify-content: center;
			padding-top: 60rpx;
			.img {
				width: 300rpx;
				height: 300rpx;
				border-radius: 30rpx;
			}
		}
		.detail {
			color: #70415d;
			padding-top: 30rpx;
			margin: auto;
			width: 400rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 5; //2行
			-webkit-box-orient: vertical;
		}
		.timer {
			color: darkmagenta;
			padding-top: 30rpx;
			display: flex;
			justify-content: center;
		}
		.user {
			display: flex;
			padding-top: 20rpx;
			padding-left: 40rpx;
			padding-bottom: 10rpx;
			.subscribedCount {
				display: flex;
				flex: 1;
				justify-content: flex-end;
				padding-right: 50rpx;
				font-size: 30rpx;
				line-height: 50rpx;
				text-align: center;
			}
		}
	}
}
.fold {
	&-item {
		display: flex;
		padding-bottom: 30rpx;
		padding-left: 35rpx;
		.img {
			width: 200rpx;
			height: 200rpx;
			margin-left: 20rpx;
			border-radius: 20rpx;
		}
		.title {
			width: 200rpx;
			padding-left: 20rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2; //2行
			-webkit-box-orient: vertical;
		}
	}
}
.cover-box {
	width: 320rpx;
	height: 290rpx;
	margin-left: 30rpx;
	z-index: -1;
	position: absolute;
	top: 200rpx;
	background: linear-gradient(360deg, #70415d, #171628);
	border-radius: 30rpx;
	box-shadow: 10rpx 10rpx 3rpx 5rpx #b3b7b5;
}
.head-bg {
	width: 100%;
	height: 850rpx;
	background-size: cover;
	position: absolute;
	top: 100rpx;
	bottom: 0;
	left: 0;
	right: 0;
	filter: blur(100rpx);
	z-index: -1;
}
.shadow {
	width: 100%;
	display: flex;
	justify-content: center;
	.shadow-iocn {
		width: 650rpx;
		height: 100rpx;
		display: flex;
		font-size: 30rpx;
		border-radius: 60rpx;
		align-items: center;
		background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
		box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
		.icon-1 {
			display: flex;
			flex: 1.7;
			margin-left: 20rpx;
			align-items: center;
			.img {
				width: 50rpx;
				height: 50rpx;
				margin-left: 20rpx;
			}
			.icon-text {
				margin-left: 20rpx;
				white-space: nowrap;
			}
		}
		.icon-2 {
			display: flex;
			flex: 2;
			justify-content: center;
			align-items: center;
			.img {
				width: 60rpx;
				height: 60rpx;
			}
			.icon-text {
				margin-left: 20rpx;
				white-space: nowrap;
			}
		}
		.icon-3 {
			flex: 2;
			display: flex;
			justify-content: center;
			align-items: center;
			.icon-text {
			}
		}
	}
}
.user {
	display: flex;
	padding-top: 20rpx;
	padding-left: 40rpx;
	padding-bottom: 10rpx;
	.subscribedCount {
		display: flex;
		flex: 1;
		justify-content: flex-end;
		padding-right: 50rpx;
		font-size: 30rpx;
		line-height: 50rpx;
		text-align: center;
	}
}
.play-list {
	display: flex;
	color: #cfd9df;
	.list-1 {
		display: flex;
		align-items: center;
		flex: 1.8;
		margin-left: 20rpx;
		.img {
			width: 60rpx;
			height: 60rpx;
		}
		.text {
			padding-left: 20rpx;
		}
	}
	.icon {
		display: flex;
		justify-content: center;
		flex: 0.8;
		margin-top: 20rpx;
		.list-2 {
			.img {
				width: 60rpx;
				height: 60rpx;
			}
		}
		.list-3 {
			margin-left: 20rpx;
			.img {
				width: 60rpx;
				height: 60rpx;
			}
		}
	}
}
.play-name {
	padding-left: 50rpx;
	padding-bottom: 100rpx;
	border-radius: 30rpx;
	box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
	background-color: #dcd9d4;
	background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%),
		radial-gradient(at 50% 0%, rgba(255, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0.5) 50%);
	background-blend-mode: soft-light, screen;
	.name {
		padding-top: 30rpx;
		.song {
			&-name {
				display: flex;
				align-items: center;
				.index {
					padding-right: 20rpx;
					font-size: 35;
					font-weight: bold;
				}
				.items {
					&-name {
						width: 500rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					&-singer {
						font-size: 25rpx;
						color: #767676;
						width: 400rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
				.right {
					display: flex;
					flex: 1;
					justify-content: flex-end;
					.img {
						width: 60rpx;
						height: 60rpx;
					}
				}
			}
		}
	}
	.alone {
		padding-top: 30rpx;
		padding-left: 20rpx;
		.head {
			display: flex;
			.img {
				width: 150rpx;
				height: 150rpx;
				border-radius: 30rpx;
			}
			.name {
				width: 600rpx;
				padding-left: 30rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 3; //2行
				-webkit-box-orient: vertical;
				.ar {
					font-size: 25rpx;
				}
			}
		}
		.foot {
			height: 420rpx;
			padding-top: 10rpx;
			padding-left: 5rpx;
			&-item {
				display: flex;
				align-items: center;
				padding-top: 30rpx;
				.names {
					padding-left: 30rpx;
					width: 600rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
		}
	}
}
.foot {
	padding-bottom: 20rpx;
}
</style>
