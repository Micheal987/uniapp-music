<template>
	<view>
		<view class="playlist">
			<view class="playlist-items">
				<view v-for="(items, play) in playlist" :key="play" @click="go(items, play)">
					<view class="playlist-items-1">
						<view><image class="img" :src="items.coverImgUrl" mode=""></image></view>
						<view class="nickname">
							<view class="title">{{ items.name }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	props: ['playlist'],
	data() {
		return {};
	},
	methods: {
		go(items, play) {
			uni.navigateTo({
				url: `/views/song/play-list?id=${items.id}`
			});
		}
	}
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
					font-size: 30rpx;
					.title {
						width: 400rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
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
