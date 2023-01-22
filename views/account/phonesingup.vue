<template>
	<view>
		<view class="icon"><image class="img" src="../../static/images/logo.png" mode=""></image></view>
		<view class="form">
			<u--form labelPosition="left" :model="user" :rules="rules" ref="form">
				<u-form-item label="手机号码" prop="iphoe" borderBottom ref="item1"><u--input v-model="user.iphoe" border="none"></u--input></u-form-item>
				<u-form-item label="密码" prop="pwd" borderBottom ref="item2"><u--input v-model="user.pwd" border="none" type="password"></u--input></u-form-item>
			</u--form>
		</view>
		<u-button @click="login" type="primary" text="登录"></u-button>
	</view>
</template>
<script>
const { iphoe_user } = require('@/network/https/user.js');
export default {
	data() {
		return {
			user: {
				iphoe: '13169196820',
				pwd: '193302wei'
			},
			from: {
				iphoe: '',
				pwd: ''
			},
			rules: {
				iphoe: [
					{
						type: 'number',
						required: true,
						message: '输入正确的手机号码',
						trigger: ['blur', 'change']
					},
					{
						pattern: /^[0-9a-zA-Z]*$/g,
						// 正则检验前先将值转为字符串
						transform(value) {
							return String(value);
						},
						message: '只能包含字母或数字'
					},
					// 11个字符之间的判断
					{
						min: 11,
						message: '长度在11个字符之间'
					}
				],
				pwd: [
					// 必填规则
					{
						required: true,
						message: '此为必填字段',
						// blur和change事件触发检验
						trigger: ['blur', 'change']
					},
					// 正则判断为字母或数字
					{
						pattern: /^[0-9a-zA-Z]*$/g,
						// 正则检验前先将值转为字符串
						transform(value) {
							return String(value);
						},
						message: '只能包含字母或数字'
					}
				]
			}
		};
	},
	methods: {
		//登录
		async login() {
			const param = {
				iphoe: this.user.iphoe,
				password: this.user.pwd
			};
			const { data: res } = await iphoe_user(param.iphoe, param.password);
			console.log(res);
			if (res.code == 200) {
				uni.switchTab({
					url: `/pages/index/index`
				});
				//获取缓存数据
				uni.setStorage({
					key: 'user_token',
					data: res.token,
					success: function(res) {
						console.log('token', res);
					}
				});
				//获取缓存数据
				uni.setStorage({
					key: 'user',
					data: res,
					success: function() {
						console.log('成功保存手机用户数据');
					}
				});
			}
			if (res.code == 502) {
				uni.showToast({
					title: '密码错误'
				});
			}
			if (res.code == 509) {
				uni.showToast({
					title: '输入密码错误次数达到上限'
				});
			}
		}
	}
};
</script>
<style lang="scss" scoped>
.icon {
	display: flex;
	justify-content: center;
	margin-top: 450rpx;
	.img {
		width: 200rpx;
		height: 200rpx;
		display: flex;
		justify-content: center;
	}
}
.form {
	margin-left: 60rpx;
	margin-top: 100rpx;
}
</style>
