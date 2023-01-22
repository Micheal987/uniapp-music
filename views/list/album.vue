<template>
	<view>
		<view class="playlist">
			<view class="playlist-items">
				<view v-for="(items, play) in abumlist" :key="play">
					<view class="playlist-items-1">
						<view><image class="img" :src="items.picUrl" mode=""></image></view>
						<view class="nickname">
							<view>{{ items.name }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	props: ['abumlist'],
	data() {
		return {};
	},
	methods: {}
};
</script>
<style lang="scss" scoped>
.playlist {
	background-color: #ffffff;
	width: 700rpx;
	box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	margin: 30rpx auto;
	border-radius: 10rpx;
	.playlist-items {
		margin-left: 20rpx;
		padding-top: 20rpx;
		&-1 {
			display: flex;
			align-items: center;
			margin-top: 20rpx;
			.img {
				width: 130rpx;
				height: 130rpx;
				border-radius: 20rpx;
			}
			.nickname {
				margin-left: 30rpx;
				view:nth-child(1) {
					font-size: 34rpx;
				}
				view:nth-child(2) {
					font-size: 27rpx;
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
}
</style>
