<template>
	<view>
		<view class="container">
			<view v-for="(items, index) in singerlist" :key="index" @click="go(items, index)">
				<view class="singer">
					<view class="singer-items">
						<view class="name">{{ items.name }}</view>
						<view class="icon">
							<u-icon name="play-circle" color="#000" size="28"></u-icon>
							<u-icon name="download" color="#000" size="28"></u-icon>
						</view>
					</view>
					<view class="ar">{{ items.ar[0].name }}</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
const { songurl } = require('@/network/https/api.js'); //请求
const { playaudio } = require('@/utils/player.js');
export default {
	props: ['singerlist'],
	data() {
		return {};
	},
	methods: {
		async go(items, index) {
			const { data: res } = await songurl(items.id);
			playaudio(res.data[0]);
			uni.setStorage({
				key: 'currentmusic',
				data: items,
				success: () => {
					console.log('成功');
				}
			}),
				uni.setStorage({
					key: 'currentindex',
					data: index,
					success: () => {
						console.log('index');
					}
				});
			uni.navigateTo({
				url: `/views/song/index?id=items.id`
			});
		}
	}
};
</script>
<style lang="scss" scoped>
.container {
	width: 700rpx;
	background-color: #ffffff;
	border-radius: 10rpx;
	margin: 30rpx auto;
	box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	padding-bottom: 40rpx;
	.singer {
		&-items {
			display: flex;
			margin-left: 30rpx;
			padding-top: 20rpx;
			.name {
				width: 500rpx;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				font-size: 28rpx;
			}
			.icon {
				display: flex;
				flex: 1;
				justify-content: flex-end;
			}
		}
		.ar {
			margin-left: 30rpx;
			font-size: 23rpx;
			color: #dd524d;
		}
	}
}
</style>
