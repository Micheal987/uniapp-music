<template>
	<view>
		<view class="media">
			<view class="head-title">推荐歌单</view>
			<view class="head-layout">
				<scroll-view scroll-x>
					<view class="card-layout">
						<view v-for="(items, index) in songlist" :key="index" @click="songlistpages(items)">
							<view class="card-bg"></view>
							<view><image class="card-img" :src="items.picUrl" mode=""></image></view>
							<view class="paly-count">
								<u-icon name="play-right" color="#fff" size="18" style="margin-right: 10rpx;"></u-icon>
								{{ items.playCount % 10000 }}万
							</view>
							<view class="title-item">{{ items.name }}</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	//props
	//songlist
	props: {
		songlist: {
			type: Array
		}
	},
	data() {
		return {
			scrollTop: 0
		};
	},
	methods: {
		//items
		//传id过去接收
		//再发起请求
		songlistpages(items) {
			uni.navigateTo({
				url: `/views/song/play-list?id=` + items.id
			});
		}
	}
};
</script>

<style lang="less" scoped>
.media {
	.head-title {
		padding-top: 20rpx;
		margin-top: 20rpx;
		margin-left: 20rpx;
	}
	.head-layout {
	}
}
.card-layout {
	display: flex;
	padding-top: 30rpx;
	padding-bottom: 10rpx;
	.card-bg {
		width: 100rpx;
		height: 100rpx;
		display: flex;
		justify-content: center;
		width: 210rpx;
		height: 210rpx;
		border-radius: 25rpx;
		margin-left: 2rpx;
		position: absolute;
		top: 20rpx;
		z-index: 1;
		background-color: #f5f5f5;
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	}
	.card-img {
		display: flex;
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
		width: 210rpx;
		height: 210rpx;
		border-radius: 25rpx;
		margin-left: 20rpx;
		z-index: 2;
	}
	.paly-count {
		display: flex;
		font-size: 25rpx;
		width: 150rpx;
		background: linear-gradient(to top #696969);
		overflow: hidden;
		text-overflow: ellipsis;
		position: relative;
		bottom: 200rpx;
		left: 80rpx;
		color: #ffffff;
		z-index: 15;
	}
	.title-item {
		text-align: center;
		width: 200rpx;
		font-size: 23rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2; //2行
		-webkit-box-orient: vertical;
	}
}
</style>
