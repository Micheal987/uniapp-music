<template>
	<view class="head"><u-swiper class="banners-head" 
	:list="banners" keyName="image"
	indicator
	indicatorMode="dot"></u-swiper></view>
</template>
<script>
export default {
	props: {
		banners: {
			type: Array
		}
	}
};
</script>

<style lang="scss" scoped>
	.head{
		margin-top: 20rpx;
		.banners-head {
			margin-left: 20rpx;
			margin-right: 20rpx;
			border-radius: 200rpx;
		}
	}

</style>
