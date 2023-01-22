<template>
	<view>
		<view class="icon"><image class="img" src="../../static/images/logo.png" mode=""></image></view>
		<view class="form">
			<u--form labelPosition="left" :model="user" :rules="rules" ref="form">
				<u-form-item label="邮箱" prop="email" borderBottom ref="item1"><u--input v-model="user.email" border="none"></u--input></u-form-item>
				<u-form-item label="密码" prop="pwd" borderBottom ref="item2"><u--input v-model="user.pwd" border="none" type="password"></u--input></u-form-item>
			</u--form>
		</view>
		<u-button @click="login" type="primary" text="登录"></u-button>
	</view>
</template>
<script>
const { email_user } = require('@/network/https/user.js') ; //网络请求
export default {
	data() {
		return {
			user: {
				email: 'ting145459@yeah.net',
				pwd: '193302Wei'
			},
			from: {
				email: ''
			},
			rules: {
				email: [
					{
						type: 'email',
						required: true,
						message: '输入正确的邮箱',
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
					// 6-8个字符之间的判断
					{
						min: 6,
						max: 8,
						message: '长度在6-8个字符之间'
					},
					// 自定义规则判断是否包含字母"A"
					{
						validator: (rule, value, callback) => {
							return uni.$u.test.contains(value, '@');
						},
						message: '必须包含"@"'
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
	onLoad() {
		uni.clearStorage();
	},
	methods: {
		//登录
		async login() {
			const param = {
				email: this.user.email,
				password: this.user.pwd
			};
			const { data: res } = await email_user(param.email, param.password);
			console.log(res);
			if (res.code == 200) {
				uni.switchTab({
					url: `/pages/index/index`
				});
				//存缓存和token
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
						console.log('成功保存邮箱用户数据');
					}
				});
			}
			//502
			if (res.code == 502) {
				uni.showToast({
					title: '密码错误'
				});
			}
			//509
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
