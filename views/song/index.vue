<template>
	<view>
		<view class="container">
			<!-- //歌名标题 -->
			<view class="title">
				<view class="title-icon" @click="leave"><u-icon name="arrow-leftward" color="#000" size="28"></u-icon></view>
				<view class="title-name">{{ currentmsg.name }}</view>
				<view class="title-icon-1"><u-icon name="share-square" color="#000" size="28"></u-icon></view>
			</view>
			<!-- 	//歌曲图片 -->
			<view @click="lycs" ref="lyric">
				<view class="main-card" v-if="lys">
					<view class="card"><image class="img" :src="currentmsg.al.picUrl" mode=""></image></view>
				</view>
				<view v-else><lyric :lyric="lyricsObjArr" :lyricIndex="lyricIndex" :height="lyricHight"></lyric></view>
			</view>
		</view>
		<view class="foot">
			<view class="foot-line">
				{{ (currentime / 60).toFixed(2) }}
				<slider
					class="slider"
					:value="currentime"
					:min="-currentime"
					:max="maxtimer"
					@change="sliderChange"
					@changing="sliderChanging"
					step="5"
					block-size="15"
					activeColor="#53C21D"
				/>
				{{ (maxtimer / 60).toFixed(2) }}
			</view>
			<!-- icon -->
			<view class="icon-item">
				<!-- 	//循环 -->
				<view><u-icon @click="cyclelist" name="list-dot" color="#fafbfb" size="35"></u-icon></view>
				<!-- 上一首 -->
				<view><u-icon @click="last" name="play-left" color="#fafbfb" size="35"></u-icon></view>
				<!-- 播放 -->
				<view @click="play">
					<view v-if="player"><u-icon name="play-circle" color="#fafbfb" size="60"></u-icon></view>
					<view v-else><u-icon name="pause" color="#fafbfb" size="60"></u-icon></view>
				</view>
				<!-- 下一首 -->
				<view><u-icon @click="next" name="play-right" color="#fafbfb" size="35"></u-icon></view>
				<!-- 歌单列表 -->
				<view class="push">
					<u-popup :show="show" @close="close" @open="open" mode="bottom" :round="20">
						<scroll-view scroll-y="true">
							<view class="push-item">
								<view v-for="(item, index) in playlist" @click="sel(index, item)" :key="index" :class="{ active: currentIndex == index }">
									<view class="push-name">
										<view>{{ item.name }}</view>
									</view>
								</view>
							</view>
						</scroll-view>
					</u-popup>
					<u-icon name="list" color="#fafbfb" size="35" @click="pushlist"></u-icon>
				</view>
			</view>
		</view>
		<!-- //背景虚化 -->
		<view class="bg" :style="{ backgroundImage: 'url(' + currentmsg.al.picUrl + ')' }"></view>
	</view>
</template>
<script>
const { songurl, lyri_c } = require('@/network/https/api.js'); //网络请求
const { formatLyricTime, selectmusic } = require('@/utils/song.js');
const { playerAudio, playaudio } = require('@/utils/player.js');
const { currtenlyric } = require('@/utils/lyric.js');
import lyric from '@/components/common/lyric.vue';
import { mapState, mapMutations, mapActions } from 'vuex'; //vuex
export default {
	data() {
		return {
			lys: true,
			lyricsObjArr: [],
			currentIndex: null,
			lyricIndex: 0,
			lyricHight: 0,
			currentmsg: '',
			currtenlist: [],
			playlist: [],
			scrolltop: 50,
			show: false,
			maxtimes: ''
		};
	},
	onLoad(val) {
		this.playlist = uni.getStorageSync('music');
		console.log('缓存', this.playlist);
		this.currentmsg = uni.getStorageSync('currentmusic');
		console.log('当前歌曲的信息', this.currentmsg);
		this.currentIndex = uni.getStorageSync('currentindex');
		//
		uni.$on('update', items => {
			console.log(items);
		});
		this.lycslist();
		this.currtenlyricupdate();
		this.songEnd();
	},
	methods: {
		currtenlyricupdate() {
			playerAudio.onTimeUpdate(() => {
				let currentimer = playerAudio.currentTime.toFixed(2);
				for (let currentlyric = 1; currentlyric < this.lyricsObjArr.length; currentlyric++) {
					if (currentimer < this.lyricsObjArr[currentlyric].time) {
						let newindex = currentlyric - 1;
						this.lyricHight = 220 - newindex * 20;
						return (this.lyricIndex = newindex);
					}
				}
			});
		},
		async singerurl() {
			const { data: res } = await songurl(this.playlist[this.currentIndex].id);
			//修改vuex中MP3url
			playaudio(res.data[0]);
		},
		leave() {
			uni.navigateBack({
				delta: 1
			});
		},
		sliderChange(e) {
			console.log('点击value 发生变化：' + e.detail.value);
			playerAudio.seek(e.detail.value);
		},
		sliderChanging(e) {
			console.log('拖动value 发生变化：' + e.detail.value);
			playerAudio.seek(e.detail.value);
		},
		currentsonglist() {
			this.currentmsg = this.playlist[this.currentIndex];
		},
		//下一首
		async next() {
			if (this.currentIndex < this.playlist.length - 1) {
				this.currentIndex++;
				this.singerurl();
				this.currentsonglist();
				this.lycslist();
				this.songEnd();
			} else {
				console.log('没有下一首了');
			}
		},
		//上一首
		async last() {
			if (this.currentIndex >= 1) {
				this.currentIndex--;
				this.songEnd();
				this.singerurl();
				this.currentsonglist();
				this.lycslist();
			} else {
				console.log('最上一首了');
			}
		},
		songEnd() {
			playerAudio.onEnded(() => {
				this.next();
			});
		},
		play() {},
		async cyclelist() {
			this.songEnd();
		},
		lycs() {
			this.lys = !this.lys;
		},
		async lycslist() {
			this.lyricsObjArr = [];
			const { data: res } = await lyri_c(this.playlist[this.currentIndex].id);
			const regNewLine = /\n/;
			const lineArr = res.lrc.lyric.split(regNewLine); // 每行歌词的数组
			const regTime = /\[\d{2}:\d{2}.\d{2,3}\]/;
			lineArr.forEach(item => {
				if (item === '') return;
				const obj = {};
				const time = item.match(regTime);
				obj.lyric = item.split(']')[1].trim() === '' ? '' : item.split(']')[1].trim();
				obj.time = time ? formatLyricTime(time[0].slice(1, time[0].length - 1)) : 0;
				obj.uid = Math.random()
					.toString()
					.slice(-6);
				if (obj.lyric === '') {
					console.log('这一行没有歌词');
				} else {
					this.lyricsObjArr.push(obj);
				}
			});
			console.log(this.lyricsObjArr);
		},
		open() {
			// console.log('open');
		},
		close() {
			this.show = false;
			// console.log('close');
		},
		pushlist() {
			this.show = true;
		},
		sel(index, item) {
			this.actives = index;
			// console.log(item);
			let select = selectmusic(item);
			playaudio(select);
			console.log(select);
		}
	},
	computed: {},
	watch: {
		currentime() {
			// 匹配歌词
			// let currentimer = playerAudio.currentTime.toFixed(2);
			// for (let currentlyric = 1; currentlyric < this.lyricsObjArr.length; currentlyric++) {
			// 	if (currentimer < this.lyricsObjArr[currentlyric].time) {
			// 		let newindex = currentlyric - 1;
			// 		this.height = 220 - newindex * 20;
			// 		return (this.lyricIndex = newindex);
			// 	}
			// }
		}
	},
	components: {
		lyric
	},
	computed: {
		...mapState({
			currentime: state => state.songs.currentimer,
			maxtimer: state => state.songs.maxtimer,
			player: state => state.songs.player
		})
	}
};
</script>
<style lang="scss" scoped>
.container {
	.title {
		display: flex;
		position: relative;
		top: 60rpx;
		&-icon {
			display: flex;
			flex: 1;
			justify-content: center;
		}
		&-name {
			display: flex;
			flex: 3;
			justify-content: center;
			align-items: center;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		&-icon-1 {
			display: flex;
			flex: 1;
			justify-content: center;
		}
	}
	.main-card {
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 20rpx;
		.card {
			width: 400rpx;
			height: 400rpx;
			border-radius: 50%;
			border: 10rpx #007aff solid;
			display: flex;
			justify-content: center;
			align-items: center;
			.img {
				opacity: 0.5;
				width: 300rpx;
				height: 300rpx;
				border-radius: 50%;
				animation-name: imgpricurl;
				animation-duration: 20s;
				animation-direction: reverse;
				animation-iteration-count: infinite;
			}
		}
	}
}
@keyframes imgpricurl {
	10% {
		transform: rotate(0);
	}
	100% {
		transform: rotate(360deg);
	}
}
.foot {
	position: fixed;
	bottom: 60rpx;
	.foot-line {
		display: flex;
		justify-content: center;
		align-items: center;
		padding-left: 20rpx;
		padding-right: 20rpx;
		.slider {
			flex: 1;
		}
	}
	.icon-item {
		width: 100vw;
		display: grid;
		// grid-template-rows: repeat(1, 1fr);
		// grid-template-columns: repeat(5, 1fr);
		grid-template: 100rpx / repeat(5, 1fr);
		column-gap: 30rpx;
		justify-items: center;
		align-items: center;
	}
	view:nth-child(1) {
	}
	view:nth-child(2) {
	}
	view:nth-child(3) {
		justify-content: center;
		align-items: center;
	}
	view:nth-child(4) {
	}
	.push {
		&-item {
			height: 800rpx;
			padding-left: 20rpx;
		}
		&-name {
			margin-top: 20rpx;
			padding: 10rpx;
		}
	}
}
.bg {
	width: 100%;
	height: 100vh;
	background-position: center;
	background-size: cover;
	background-repeat: no-repeat;
	position: relative;
	filter: blur(150rpx);
	position: absolute;
	top: 100rpx;
	z-index: -1;
}
.active {
	color: red;
}
</style>
