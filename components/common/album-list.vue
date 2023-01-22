<template>
	<view>
		<view>
			<view class="title">
				<view v-for="(items, index) in list" :key="index" :class="{ active: active == index ? 'active' : '' }" @click="select(items, index)">
					<view class="title-list">{{ items.name }}</view>
				</view>
			</view>
		</view>
		<swiper class="swiper" :current="active" @change="changer">
			<swiper-item>
				<view class="swiper-item" v-show="active == 0">
					<scroll-view scroll-x>
						<view class="swiper-item-card">
							<view v-for="(items, index) in newmusic" :key="items.id" @click="getdata(items)">
								<image class="img" :src="items.album.blurPicUrl" mode=""></image>
								<view class="title">{{ items.name }}</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item" v-show="active == 1">
					<scroll-view scroll-x>
						<view class="swiper-item-card">
							<view v-for="(items, index) in numlist" :key="items.id" @click="albumid(items, index)">
								<image class="img" :src="items.coverUrl" mode=""></image>
								<view class="title">{{ items.albumName }}</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item" v-show="active == 2">
					<scroll-view scroll-x>
						<view class="swiper-item-card">
							<view v-for="(items, index) in newablum" :key="items.id" @click="albumid(items, index)">
								<image class="img" :src="items.picUrl" mode=""></image>
								<view class="title">{{ items.name }}</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</swiper-item>
		</swiper>
		<view class="foot">
			
		</view>
	</view>
</template>
<script>
import { songurl } from '@/network/https/api.js';
import { albumSong } from '@/utils/song.js';
import { playaudio } from '@/utils/player.js';
export default {
	props: ['newmusic', 'numlist', 'newablum'],
	data() {
		return {
			list: [{ name: `新歌上架` }, { name: `数字专辑` }, { name: '最新专辑' }],
			active: 0
		};
	},
	methods: {
		async getdata(items) {
			const { data: res } = await songurl(items.id);
			console.log("新帖",items);
			albumSong(items);
			let app = albumSong(items);
			playaudio(app);
			uni.$emit('ablum',{list:items})
		},
		albumid(items, index) {
			console.log(items);
			albumSong(items);
			let app = albumSong(items);
			console.log(app);
		},
		select(items, index) {
			this.active = index;
		},
		changer(e) {
			this.active = e.detail.current;
			console.log('触发');
		}
	}
};
</script>
<style lang="scss">
.title {
	display: flex;
	padding-top: 40rpx;
	&-list {
		font-size: 30rpx;
		line-height: 2em;
		text-indent: 20rpx;
		letter-spacing: 5rpx;
	}
}
.active {
	border-bottom: 10rpx red solid;
	border-radius: 100%;
}
.swiper {
	margin-left: 5rpx;
	margin-top: 20rpx;
	&-item {
		display: flex;
		&-card {
			display: flex;
			.img {
				width: 150rpx;
				height: 150rpx;
				border-radius: 20rpx;
				margin-left: 5rpx;
				box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px 0px;
			}
			.title {
				width: 150rpx;
				margin-left: 20rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}
}
.foot{
	padding-bottom: 10rpx;
}
</style>
