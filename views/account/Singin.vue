<template>
	<view>
		<view class="bg">
			<view class="status_bar"></view>
			<view><image class="img" src="../../static/images/logo.png" mode=""></image></view>
			<view class="list">
				<!-- 按钮 -->
				<view @click="tips">
					<u-button @click="go" :disabled="!disabled" class="btn-1" type="info" shape="circle" text="立即体验"></u-button>
					<u-button @click="iphoe" :disabled="!disabled" class="btn-1" type="info" shape="circle" text="手机登录"></u-button>
					<u-button @click="email" :disabled="!disabled" class="btn-1" type="info" shape="circle" text="邮箱登录"></u-button>
				</view>
				<!-- 协议 -->
				<view class="agreement">
					<label><radio @click="check" :checked="agreements" class="radios" value="" /></label>
					<text>
						<text style="color: #F67972;">同意</text>
						《用户协议》《隐私协议》《儿童隐私政策》
					</text>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			disabled: false, //按钮
			agreements: false //协议
		};
	},
	updated() {
		//判断
		if (this.agreements) {
			this.disabled = true;
		} else {
			this.disabled = false;
			uni.showToast({
				title: '需要同意并勾选'
			});
		}
	},
	created() {
		//清缓存
		uni.clearStorage();
	},
	methods: {
		//协议
		tips() {
			if (this.agreements != true) {
				uni.showToast({
					title: '先同意并勾选协议'
				});
			}
		},
		//
		check() {
			this.agreements = !this.agreements;
		},
		//立即体验
		go() {
			uni.switchTab({
				url: `/pages/index/index`
			});
		},
		//手机登录
		iphoe() {
			uni.navigateTo({
				url: `/views/account/phonesingup`
			});
		},
		//邮箱登录
		email() {
			uni.navigateTo({
				url: `/views/account/emailsingup`
			});
		}
	}
};
</script>
<style lang="scss" scoped>
.bg {
	background: #dc2c1f;
	height: 100vh;
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}
	.img {
		width: 200rpx;
		height: 200rpx;
		position: relative;
		top: 600rpx;
		left: 280rpx;
	}
}
.list {
	position: relative;
	top: 900rpx;
	.btn-1 {
		width: 90%;
		margin-top: 20rpx;
	}
	.agreement {
		margin-top: 20rpx;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 25rpx;
		color: #f8d6d4;
	}
}
</style>
