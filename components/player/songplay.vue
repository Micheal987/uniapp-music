<template>
	<view>
		{{ songlist }}
		<view class="play-container">
			<view class="play-img" @click="detail">
				<view><image class="img" :src="songlist.picurl" mode=""></image></view>
				<view class="play-name">{{ songlist.name }}</view>
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
			songlist: {
				name: '',
				picurl: ''
			}
		};
	},
	onLoad() {},
	created() {
		uni.$on('song', res => {
			this.songlist = {
				name: res.list.name,
				picurl: res.list.al.picUrl
			};
		});
	},
	methods: {
		onclik() {},
		detail() {
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
<style lang="scss" scoped>
.play-container {
	width: 750rpx;
	height: 120rpx;
	border-radius: 10rpx;
	background: linear-gradient(220deg, #909193, #9acafc);
	display: flex;
	align-items: center;
	position: fixed;
	bottom: 6rpx;
	.play-img {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		.img {
			width: 100rpx;
			height: 100rpx;
			border-radius: 10rpx;
			margin-left: 20rpx;
		}
		.play-name {
			width: 250rpx;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			font-size: 33rpx;
			margin-left: 30rpx;
		}
	}
	.play-icon {
		position: fixed;
		right: 100rpx;
		justify-content: flex-end;
		align-items: flex-end;
	}
	.play-icon-1 {
		position: fixed;
		right: 20rpx;
		justify-content: flex-end;
		align-items: flex-end;
	}
}
</style>
