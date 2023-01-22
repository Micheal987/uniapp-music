<template>
	<view>
		<view class="mide">
			<view class="search">
				<view @click="leaves"><u-icon name="arrow-leftward" color="#000" size="28"></u-icon></view>
				<u-search placeholder="日照香炉生紫烟"  shape="square" v-model="keyword" :showAction="false" @search="searchsong"></u-search>
			</view>
			<view class="mide-items" v-if="keyword == '' || null">
				<view class="head">最近播放</view>
				<view v-for="(items, index) in userplaylist" :key="index">
					<view class="song" @click="addsong(items, index)">
						<view class="name">{{ items.song.name }}</view>
						<view class="ar">{{ items.song.ar[0].name }}</view>
					</view>
				</view>
			</view>
			<view v-else>
				<view class="mide-res">
					<view v-for="(items, index) in result" :key="index">
						<view class="songs" @click="addres(items, index)">
							<view class="name">{{ items.name }}</view>
							<view class="ar">{{ items.ar[0].name }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { userplaylist } from '@/network/https/user.js';
import { adminsongs } from '@/network/https/api.js';
const { search_list_all } = require('@/network/https/search.js');
export default {
	data() {
		return {
			userdata: [],
			userplaylist: [],
			songlistid: '',
			keyword: '',
			pagesize: 50,
			currtenpage: 0,
			toalpage: 0,
			result: {}
		};
	},
	onLoad(val) {
		this.userdata = uni.getStorageSync('user');
		console.log(this.userdata);
		this.getuserpalyhistory();
		this.songlistid = val.id;
	},
	onReachBottom() {
		this.currtenpage++;
		if (this.currtenpage >= this.toalpage) return;
		this.searchsong();
	},
	methods: {
		async getuserpalyhistory() {
			const parm = {
				uid: this.userdata.profile.userId,
				type: 0
			};
			const { data: res } = await userplaylist(parm);
			this.userplaylist = res.allData;
			console.log(res);
		},
		async addsong(items, index) {
			const parm = {
				op: 'add',
				pid: this.songlistid,
				tracks: items.song.id
			};
			const { data: res } = await adminsongs(parm);
			console.log('成功添加歌曲', res);
		},
		async searchsong() {
			const parm = {
				keywords: this.keyword,
				limit: this.pagesize,
				offset: this.currtenpage
			};
			const { data: res } = await search_list_all(parm);
			this.result = res.result.songs;
			this.toalpage = Math.ceil(res.songCount / this.pagesize);
			console.log(res);
		},
		async addres(items, index) {
			const parm = {
				op: 'add',
				pid: this.songlistid,
				tracks: items.id
			};
			const { data: res } = await adminsongs(parm);
			console.log('成功添加歌曲', res);
		},
		leaves() {
			console.log('sss');
			uni.navigateBack({
				delta: 1
			});
		}
	}
};
</script>

<style lang="scss">
.mide {
	.search {
		padding-top: 5rpx;
		display: flex;
	}
	&-items {
		padding-left: 20rpx;
		.head {
			font-weight: bold;
			padding-top: 10rpx;
		}
		.song {
			padding-top: 14rpx;
			.name {
				font-size: 30rpx;
			}
			.ar {
				font-size: 20rpx;
			}
		}
	}
	&-res {
		padding-top: 20rpx;
		padding-left: 30rpx;
		.songs {
			padding-top: 10rpx;
			.name {
				font-size: 30rpx;
				width: 500rpx;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			.ar {
				font-size: 24rpx;
				width: 500rpx;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
	}
}
</style>
