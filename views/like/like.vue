<template>
	<view class="mide">
		<view class="mide-icon">
			<view class="left"><u-icon name="arrow-leftward" color="#000" size="28"></u-icon></view>
			<view class="name">名字</view>
			<view class="right"><u-icon name="share-square" color="#000" size="28"></u-icon></view>
		</view>
		<view class="mide-head">
			<view><img class="img" :src="song.picurL" alt="" /></view>
		</view>
		<view class="mide-item">
			<view v-for="(items, index) in songs" :key="index" @click="getall(items, index)">
				<view class="name">
					<view class="song">
						<view class="song-index">{{ (index += 1) }}</view>
						<view class="song-name">
							{{ items.name }} {{ items.publishTime | showdata }}
							<view class="ar">{{ items.ar[0].name }}</view>
						</view>
						<view class="play" if="items.name.leng>=15"><u-icon name="play-right" color="#000" size="30"></u-icon></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
const { song_detail } = require('@/network/https/api.js');
const { user_like } = require('@/network/https/user.js');
const { userids, songdata } = require('@/utils/like.js');
const { dateFormat } = require('@/utils/time.js');
const { sortdata } = require('@/utils/song.js');
export default {
	data() {
		return {
			userid: '',
			songs: [],
			currtenpage: 1,
			pagesize: 20,
			toalpage: 0,
			song: '',
			arry: ''
		};
	},
	onLoad(val) {
		this.userid = val.id;
		this.likemusic();
	},
	onReachBottom() {
		this.currtenpage++;
		if (this.currtenpage >= this.toalpage) return;
		this.likemusic();
	},
	methods: {
		async likemusic() {
			const { data: res } = await user_like(this.userid);
			console.log(res);
			let user = userids(res);
			this.toalpage = Math.ceil(user.id.length / this.pagesize);
			this.songdata(user);
		},
		async songdata(user) {
			let ids = user.id.slice((this.currtenpage - 1) * this.pagesize, this.currtenpage * this.pagesize);
			const { data: res } = await song_detail(ids);
			console.log(this.toalpage);
			this.songs = [...this.songs, ...res.songs];
			this.songs.sort(sortdata('publishTime'));
			console.log(this.songs);
			this.song = songdata(this.songs);
		},
		getall(items) {
			console.log(formatDate(items.publishTime));
		}
	},
	filters: {
		showdata(val) {
			let data = new Date(val);
			return dateFormat('Y', data);
		}
	}
};
</script>

<style lang="scss">
.mide {
	&-icon {
		padding-top: 20rpx;
		display: flex;
		.left {
			padding-left: 30rpx;
		}
		.name {
			display: flex;
			flex: 1;
			justify-content: center;
		}
		.right {
			padding-right: 30rpx;
		}
	}
	&-head {
		.img {
			width: 200rpx;
			height: 200rpx;
			border-radius: 30rpx;
		}
	}
	&-item {
		margin: auto;
		width: 85%;
		border-radius: 20rpx;
		padding-left: 20rpx;
		padding-top: 10rpx;
		background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);
		box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
		.name {
			padding-top: 20rpx;
			.song {
				display: flex;
				align-items: center;
				&-index {
					padding-right: 20rpx;
				}
				&-name {
					width: 500rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					.ar {
						width: 400rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						font-size: 24rpx;
					}
				}
				.play {
					display: flex;
					flex: 1;
					justify-content: flex-end;
					padding-right: 40rpx;
				}
			}
		}
	}
}
</style>
