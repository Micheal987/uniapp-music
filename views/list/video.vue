<template>
	<view>
		<view class="video-list">
			<view class="video-items">
				<view v-for="(items, index) in videoslist" :key="index" @click="gomv(items,index)">
					<view class="video-items-1">
						<view><image class="img" :src="items.coverUrl" mode=""></image></view>
						<view class="title">{{ items.title }}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	props: ['videoslist'],
	data() {
		return {};
	},
	methods: {
		gomv(items,index) {
			uni.navigateTo({
				url:`/views/video/playmv?vid=${items.vid}`
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.video-list {
	background-color: #ffffff;
	width: 700rpx;
	box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	margin: 30rpx auto;
	border-radius: 10rpx;
	padding-bottom: 30rpx;
	.video-items {
		margin-left: 20rpx;
		padding-top: 20rpx;
		&-1 {
			display: flex;
			align-items: center;
			margin-top: 30rpx;
			.img {
				width: 250rpx;
				height: 150rpx;
				border-radius: 23rpx;
			}
			.title {
				margin-left: 30rpx;
				width: 300rpx;
				white-space: normal;
				overflow: hidden;
				display: -webkit-box; //将元素设为盒子伸缩模型显示
				-webkit-box-orient: vertical; //伸缩方向设为垂直方向
				-webkit-line-clamp: 2; //超出3行隐藏，并显示省略号
			}
		}
	}
}
</style>
