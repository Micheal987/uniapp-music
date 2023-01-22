<template>
	<view>
		<view class="play-container" @click="detail">
			<view :style="{}"></view>
			<view class="play-img">
				<img class="img" :src="ablumlist.picUrl" alt="" />
				<view class="play-name">{{ ablumlist.name }}</view>
			</view>
			<view class="play-icon" @click="onclik">
				<u-icon v-if="code" name="play-circle" color="#000" size="28"></u-icon>
				<u-icon v-else name="pause" color="#000" size="28"></u-icon>
			</view>
			<view class="play-icon-1"><u-icon name="grid-fill" color="#000" size="28"></u-icon></view>
		</view>
	</view>
</template>
<script>
import { mapState, mapMutations } from 'vuex'; //vuex
export default {
	data() {
		return {
			ablumlist: {
				name: '',
				picUrl: ''
			},
			songlist: {
				name: '',
				picUrl: ''
			}
		};
	},
	onLoad() {},
	mounted() {
		uni.$on('ablum', res => {
			this.ablumlist = {
				name: res.list.name,
				picUrl: res.list.album.blurPicUrl
			};
		});
		uni.setStorage({
			key:'songimg',
			data:this.ablumlist
		})
	},
	methods: {
		onclik() {},
		detail() {
			uni.setStorage({
				key: 'currentmusic',
				data: this.msg,
				success: () => {
					console.log('成功');
				}
			}),
				uni.navigateTo({
					url: `/views/song/index`
				});
		}
	},
	updated() {},
	computed: {
		...mapState({
			code: state => state.songs.player
		})
	}
};
</script>
<style lang="scss">
.play-container {
	z-index: 10;
	width: 750rpx;
	height: 100rpx;
	border-radius: 10rpx;
	background: linear-gradient(220deg, #909193, #9acafc);
	display: flex;
	align-items: center;
	position: fixed;
	bottom: 80rpx;
	.play-img {
		display: flex;
		.img {
			width: 110rpx;
			height: 110rpx;
			border-radius: 10rpx;
			margin-left: 20rpx;
		}
		.play-name {
			display: flex;
			align-items: center;
			margin-left: 30rpx;
		}
	}
	.play-icon {
		display: flex;
		flex: 1;
		justify-content: flex-end;
		align-items: flex-end;
	}
	.play-icon-1 {
		justify-content: flex-end;
		align-items: flex-end;
	}
}
</style>
