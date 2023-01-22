<template>
	<view>
		<scroll-view scroll-x>
			<view class="head">
				<view class="head-icon">
					<view v-for="(items, today) in icons.slice(0, 1)" :key="items.id">
						<view class="card" @click="iocn_name(items)">
							<view :style="{ maskImage: `url(${items.iconUrl})` }" class="img-icon">
								<view class="day_iocn">{{ nowday }}</view>
							</view>
						</view>
						<view class="iocn-title">{{ items.name }}</view>
					</view>
					<view v-for="(items, iocn) in icons.slice(1)" :key="iocn">
						<view class="card" @click="iocn_name(items)"><view :style="{ maskImage: `url(${items.iconUrl})` }" class="img-icon"></view></view>
						<view class="iocn-title">{{ items.name }}</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	//props
	props: {
		icons: {
			type: Array
		}
	},
	data() {
		return {};
	},
	onLoad() {
		this.iocn_name();
	},
	computed: {
		//nowday
		//当前天
		nowday() {
			let date = new Date();
			return date.getDate();
		}
	},
	methods: {
		//跳转
		iocn_name(items) {
			console.log(items);
			switch(items.id){
				case -1:
				uni.navigateTo({
					url:`/views/daymusic/music`
				})
				break
			}
		}
	}
};
</script>

<style lang="scss">
.head {
	.head-icon {
		display: flex;
		margin-top: 20rpx;
		margin-left: 10rpx;
		.card {
			display: flex;
			justify-content: center;
			position: relative;
			margin-right: 16rpx;
			top: 10rpx;
			left: 20rpx;
			width: 100rpx;
			height: 100rpx;
			border-radius: 90rpx;
			background: linear-gradient(0deg, #f08080, #ffc0cb 30%, #fef0f0);
		}
		.img-icon {
			background: linear-gradient(180deg, #d4f2e7, #fa3533 40%, #dc143c);
			width: 300rpx;
			height: 100rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 50rpx;
			mask-size: 100%;
			box-shadow: 30rpx;
			transition-duration: 3s;
		}
		.img-icon:hover {
			transform: scale(1.2);
		}
		.iocn-title {
			font-size: 22rpx;
			margin-top: 20rpx;
			margin-left: 20rpx;
			font-weight: bold;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
}
.day_iocn {
	color: #ffffff;
	font-size: 25rpx;
	font-weight: bold;
	position: relative;
	top: 2rpx;
}
</style>
