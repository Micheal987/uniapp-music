<template>
	<view>
		<view class="container">
			<view class="head-input"><u-search placeholder="搜索" @search="searchlist" @focus="searchchanges" v-model="name"></u-search></view>
			<view class="head-nav"><u-tabs :scrollable="true" :list="listSearch" @click="clicksong" @change="changs" :current="page"></u-tabs></view>
		</view>
		<view>
			<view v-if="type == 1018">
				<keep-alive><homeall :name="this.name" ref="homeall"></homeall></keep-alive>
			</view>
			<view v-if="type == 1"><singer :singerlist="songlist"></singer></view>
			<view v-if="type == 1000"><playlist :playlist="songlist"></playlist></view>
			<view v-if="type == 100"><ar :arlist="songlist"></ar></view>
			<view v-if="type == 10"><ablum :abumlist="songlist"></ablum></view>
			<view v-if="type == 1014"><viodes :videoslist="songlist"></viodes></view>
			<view v-if="type == 1002"><users :userlist="songlist"></users></view>
		</view>
	</view>
</template>
<script>
import homeall from '../list/songall.vue';
import ablum from '../list/album.vue';
import playlist from '../list/playlist.vue';
import singer from '../list/singer.vue';
import ar from '../list/ar.vue';
import viodes from '../list/video.vue';
import users from '../list/user.vue';
import { search_list_all, search_list } from '@/network/https/search.js';
export default {
	components: {
		homeall,
		ablum,
		ar,
		playlist,
		singer,
		viodes,
		users
	},
	data() {
		return {
			listSearch: [
				{
					name: '综合',
					type: 1018
				},
				{
					name: '单曲',
					type: 1
				},
				{
					name: '歌单',
					type: 1000
				},
				{
					name: '歌手',
					type: 100
				},
				{
					name: '专辑',
					type: 10
				},
				{
					name: '视频',
					type: 1014
				},
				{
					name: '用户',
					type: 1002
				}
			],
			page: 0,
			name: '',
			type: 1018,
			totalPage: 1, //有几页
			pageSize: 30, //每页几条
			currentPage: 1, //当前页数
			songlist: [],
			songCount: ''
		};
	},
	onReachBottom() {
		console.log('触底');
		this.totalPage = this.songCount / this.pageSize;
		if (this.currentPage < this.totalPage) {
			uni.showLoading({
				title: '加载中'
			});
			setTimeout(function () {
				uni.hideLoading();
			}, 2000);
			this.currentPage += 10;
			this.allsong();
		} else {
			uni.showToast({
				title: '没有下一页了'
			});
		}
	},
	onLoad(val) {
		this.name = val.name;
	},
	methods: {
		searchlist() {
			// this.songlist = [];
			this.allsong();
		},
		searchchanges() {
			console.log('触发');
			uni.navigateBack({
				delta: 1
			});
			uni.setStorage({
				key: 'name',
				data: this.name
			});
		},
		async getdata() {
			const { data: res } = await search_list(this.name);
			console.log(res);
		},
		async allsong() {
			const parm = {
				keywords: this.name,
				limit: this.pageSize,
				offset: this.currentPage,
				type: this.type
			};
			const { data: res } = await search_list_all(parm);
			console.log(res);
			switch (this.type) {
				case 1018:
					console.log('综合');
					break;
				case 1:
					this.songlist = [...this.songlist, ...res.result.songs];
					this.songCount = res.result.songCount;
					break;
				case 1000:
					this.songlist = [...this.songlist, ...res.result.playlists];
					this.songCount = res.result.playlistCount;
					break;
				case 100:
					this.songlist = [...this.songlist, ...res.result.artists];
					this.songCount = res.result.artistCount;
					break;
				case 10:
					this.songlist = [...this.songlist, ...res.result.albums];
					this.songCount = res.result.albumCount;
					break;
				case 1014:
					this.songlist = [...this.songlist, ...res.result.videos];
					this.songCount = res.result.videoCount;
					break;
				case 1002:
					this.songlist = [...this.songlist, ...res.result.userprofiles];
					this.songCount = res.result.userprofileCount;
			}
		},
		changs(item) {
			this.type = item.type;
			this.allsong();
		},
		clicksong(item) {
			this.page = item.index;
			this.songlist = [];
		}
	}
};
</script>
<style lang="scss" scoped>
.container {
	background-color: #f2f2f2;

	.head-input {
	}
	.head-nav {
		// display: flex;
		// margin-left: 30rpx;
		height: 60rpx;
		.list {
			flex: 0.3;
		}
		.act {
			color: red;
		}
	}
}
</style>
