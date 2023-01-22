<template>
	<view>
		<view class="al-list">
			<view class="al-items">
				<view v-for="(items, index) in userlist" :key="index">
					<view class="al-items-1">
						<view><image class="img" :src="items.avatarUrl" mode=""></image></view>
						<view class="name">{{ items.nickname }}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	props: ['userlist'],
	data() {
		return {};
	},
	methods: {}
};
</script>

<style lang="scss" scoped>
.al-list {
	background-color: #ffffff;
	width: 700rpx;
	box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	margin: 30rpx auto;
	border-radius: 10rpx;
	padding-bottom: 30rpx;
	.al-items {
		&-1 {
			display: flex;
			align-items: center;
			margin-left: 20rpx;
			padding-top: 20rpx;
			.img {
				width: 130rpx;
				height: 130rpx;
				border-radius: 50%;
			}
			.name {
				margin-left: 30rpx;
			}
		}
	}
}
</style>
