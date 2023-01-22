<template>
	<view>
		<view class="media">
			<view class="head-title">推荐电台</view>
			<view class="head-layout">
				<scroll-view scroll-y class="head-layout">
					<view class="card-layout">
						<view v-for="(items, index) in RadioStation" :key="index" @click="goRadio(items,index)">
							<view class="card-item">
								<image class="card-img" :src="items.picUrl" mode=""></image>
								<view class="title-item">{{ items.name }}</view>
							</view>
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
		RadioStation: {
			type: Array
		}
	},
	data() {
		return {
			scrollTop: 0
		};
	},
	methods: {
		goRadio(items,index){
			console.log(items);
			uni.navigateTo({
				url:`/views/Radio/Radio?id=${items.program.radio.id}`
			})
		}
	}
};
</script>

<style lang="less" scoped>
.media {
	padding-bottom: 50rpx;
	.head-title {
		padding-left: 20rpx;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
	}
	.head-layout {
		height: 510rpx;
	}
}
.card-layout {
	display: flex;
	flex-wrap: wrap;
	.card-item {
		margin-left: 40rpx;
		.card-img {
			display: flex;
			box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
			width: 200rpx;
			height: 200rpx;
			border-radius: 25rpx;
			z-index: 2;
		}
		.title-item {
			width: 200rpx;
			font-size: 25rpx;
			text-align: center;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			padding-top: 20rpx;
			padding-bottom: 10rpx;
		}
	}
}
</style>
