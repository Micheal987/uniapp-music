<template>
	<view class="input-head">
		<!-- 弹出层 -->
		<view><u-icon class="iocn-list" name="list" color="#000" size="28" @click="show = true"></u-icon></view>
		<!-- 弹出层 -->
		<view>
			<u-popup mode="left" :show="show" @close="close" @open="open">
				<view class="user" v-if="user != ''" @click="userpage">
					<image class="user-img" :src="user.profile.avatarUrl" mode=""></image>
					<view></view>
				</view>
				<!-- 登陆状态 -->
				<view v-if="user != ''"><u-button type="success" text="已登录"></u-button></view>
				<view v-if="user != ''">
					<!-- 退出登录 -->
					<!-- 	模态框 -->
					<view>
						<u-modal
							@confirm="confirm"
							@cancel="cancel"
							:showCancelButton="true"
							:showConfirmButton="true"
							:show="cl"
							:title="title"
							:content="content"
							:cancelText="cancelText"
							ref="uModal"
						></u-modal>
						<!-- 登出 -->
						<u-button type="error" @click="cle" text="登出"></u-button>
					</view>
				</view>
				<!-- 未登录 -->
				<view v-else><u-button type="error" @click="letgo" text="未登录"></u-button></view>
			</u-popup>
		</view>
		<!-- 	//搜索 -->
		<u-search @focus="golist" :show-action="true" placeholder="搜索" searchIconColor="red" v-model="songname"></u-search>
	</view>
</template>
<script>
export default {
	data() {
		return {
			songname: '', //搜索绑定的值
			show: false, //弹出层
			user: '',
			cl: false, //模态框
			title: '提示', //提示//模态框
			content: '是否退出登录状态?', ////模态框
			cancelText: '取消' //模态框
		};
	},
	onLoad() {},
	updated() {},
	beforeUpdate() {},
	created() {
		this.user = uni.getStorageSync('user'); //取得缓存
	},
	methods: {
		//弹出层
		open() {
			// console.log('open');
		},
		//弹出层
		close() {
			this.show = false;
			// console.log('close');
		},
		//模态框
		cle() {
			this.cl = true;
		},
		//模态框
		//确定
		confirm() {
			//清除缓存
			uni.clearStorage();
			this.cl = false;
			//强制刷新当前页面
			setTimeout(() => {
				this.$router.go(0);
			}, 500);
		},
		//取消
		cancel() {
			this.cl = false;
		},
		//跳转
		userpage() {
			uni.navigateTo({
				url: `/views/user/home?id=${this.user.account.id}`
			});
		},
		//跳转登录
		letgo() {
			uni.navigateTo({
				url: `/views/account/Singin`
			});
		},
		//搜索传值
		golist() {
			let name = this.songname;
			uni.navigateTo({
				url: `/views/Search/search`
			});
		}
	}
};
</script>

<style scoped lang="scss">
.input-head {
	display: flex;
	margin-top: 20rpx;
	.iocn-list {
		align-items: center;
		justify-content: center;
		margin-right: 20rpx;
	}
}
.user {
	&-img {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
	}
}
</style>
