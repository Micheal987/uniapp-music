<template>
	<view>
		<view>
			<view class="head">
				<view @click="back"><u-icon name="arrow-leftward" color="#000" size="30"></u-icon></view>
				<view class="title">收藏者</view>
			</view>
			<view class="mide">
				<view v-for="(items, index) in userlist" :key="index">
					<view class="mide-item" @click="go(items, index)">
						<view class="mide-img"><img class="img" :src="items.avatarUrl" alt="" /></view>
						<view class="mide-title">
							<view class="nickname">{{ items.nickname }}</view>
							<view class="signature">{{ items.signature }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
const { subscribers } = require('@/network/https/api.js'); //请求
export default {
	data() {
		return {
			userlist: [],
			songid: '',
			pagesize: 50,
			currtenpage: 1,
			toalpage: 0
		};
	},
	onLoad(val) {
		this.songid = val.id;
		this.getdata();
	},
	onReachBottom() {
		this.currtenpage++;
		if (this.currtenpage >= this.toalpage) return;
		this.getdata();
	},
	methods: {
		async getdata() {
			const parm = {
				id: this.songid,
				limit: this.pagesize,
				offset: this.currtenpage
			};
			const { data: res } = await subscribers(parm);
			this.toalpage = res.total;
			this.userlist = [...this.userlist, ...res.subscribers];
			console.log(res);
		},
		go(items, index) {
			console.log(items.userId);
			uni.navigateTo({
				url:`/views/user/home?id=${items.userId}`
			})
		},
		back() {
			uni.navigateBack({
				delta: 1
			});
		}
	}
};
</script>

<style lang="scss">
.head {
	display: flex;
	align-items: center;
	padding-bottom: 30rpx;
	height: 80rpx;
	.title {
		padding-left: 50rpx;
	}
}
.mide {
	border-radius: 30rpx;
	width: 95%;
	margin: auto;
	background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
	box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
	&-item {
		display: flex;
		align-items: center;
		padding-left: 30rpx;
		padding-top: 30rpx;
	}
	&-img {
		.img {
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
		}
	}
	&-title {
		padding-left: 30rpx;
		.nickname {
		}
		.signature {
			font-size: 23rpx;
		}
	}
}
</style>
