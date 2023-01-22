<template>
	<view>
		<!-- 	背景 -->
		<view class="user" :style="{ backgroundImage: 'url(' + list.backgroundUrl + ')', backgroundSize: '20em' }">
			<view class="head-icon">
				<view class="icon-1"><u-icon name="arrow-leftward" color="#fff" size="30" @click="leaver"></u-icon></view>
				<view class="icon-2"><u-icon name="more-dot-fill" color="#fff" size="35"></u-icon></view>
			</view>
		</view>
		<!-- 	//user -->
		<view class="user-bg">
			<!-- 	user -->
			<view class="user-img">
				<view class="img-box"><image class="img" :src="list.avatarUrl" mode=""></image></view>
				<view class="title-box">
					<view>{{ list.nickname }}</view>
				</view>
				<!-- //msg -->
				<view class="user-follow">
					<view class="user-1">{{ list.follows }}关注</view>
					<view class="user-1">{{ list.followeds }}跟随</view>
					<view class="user-1">Lv.{{ list.djStatus }}</view>
				</view>
				<view class="user-city"><view>广东省</view></view>
				<view class="edit"><u-button class="btn" type="primary" shape="circle" size="small" :plain="true" text="编辑资料"></u-button></view>
			</view>
			<!-- 	//基本信息 -->
			<view class="user-msg">
				<p>基本信息</p>
				<view class="time">注册时间:{{ list.createTime | showdata }}</view>
				<view class="city">地区:未做</view>
			</view>

			<!-- 音乐品味 -->
			<view class="like-music">
				<view @click="likelist">
					<view class="icon"><u-icon name="heart-fill" color="#fff" size="40"></u-icon></view>
				</view>
			</view>
			<view class="box"></view>
			<!-- //创建歌单 -->
			<view class="user-list">
				<p>创建的歌单 ({{ userlist.length }})</p>
				<view v-for="(item, index) in userlist" :key="index" @click="usersong(item)">
					<view class="list">
						<view class="list-layout">
							<view><image class="img" :src="item.coverImgUrl" mode=""></image></view>
							<view class="title">{{ item.name }}</view>
						</view>
					</view>
				</view>
				<view class="all" @click="goall" v-if="userlist.length > 10">
					查看全部
					<u-icon name="arrow-right" color="#000" size="28"></u-icon>
				</view>
			</view>
			<!-- //收藏歌单 -->
			<view class="collect">
				<p>收藏歌单 ({{ collect.length }})</p>
				<view v-for="(item, index) in collect" :key="index" @click="usersong(item)">
					<view class="collect-item">
						<view>
							<view>
								<image class="collect-img" :src="item.coverImgUrl" mode=""></image>
								<view>{{ item.name }}</view>
							</view>
						</view>
					</view>
				</view>
				<view class="all" @click="goall" v-if="collect.length >= 10">
					查看全部
					<u-icon name="arrow-right" color="#000" size="28"></u-icon>
				</view>
			</view>
			<view class="foot"></view>
			<!-- 	//底部 -->
		</view>
	</view>
</template>

<script>
import { user_list, user_like, user_data, s_t, user_res, userdata } from '@/network/https/user.js'; //网络请求
const { formatDate } = require('@/utils/time.js');
import { userdatas } from '@/utils/user.js';
export default {
	data() {
		return {
			collect: [], //收藏
			list: [], //用户
			bg: '', //背景
			userd: '', //user
			userlist: [], //user
			totalPage: 1, //有几页
			pageSize: 20, //每页几条
			currentPage: 1, //当前页数
			userid: '',
			myid: ''
		};
	},
	onLoad(val) {
		this.myid = uni.getStorageSync('user');
		(this.userid = val.id), this.getuser();
	},
	created() {
		//缓存
		// this.list = uni.getStorageSync('user');
		// console.log('sss', this.list);
		//方法
		this.usermsg(), this.userall();
		this.userst();
	},
	//时间
	filters: {
		showdata(val) {
			return formatDate(val);
		}
	},
	methods: {
		leaver() {
			uni.navigateBack({
				delta: 1
			});
		},
		async getuser() {
			const { data: res } = await userdata(this.userid);
			this.list = userdatas(res);
			console.log('sss', res);
		},
		//登录状态
		async userst() {
			const { data } = await s_t();
			console.log('状态', data);
			const { data: res } = await user_res();
			console.log('刷新', res);
		},
		//喜欢的音乐
		async likelist() {
			uni.navigateTo({
				url: `/views/like/like?id=${this.userid}`
			});
		},
		//用户信息
		async usermsg() {
			// console.log(this.list.account.id);
			const param = {
				uid: this.userid,
				limit: this.pageSize,
				offset: this.currentPage
			};
			//暂无分页
			const { data: res } = await user_list(param.uid, param.limit, param.offset);
			this.userd = res.playlist;
			this.collect = this.userd.filter(item => {
				return item.creator.userId != this.userid;
			});
			this.userlist = this.userd.filter(item => {
				return item.creator.userId == this.userid;
			});
			console.log(this.collect);
			console.log(this.userlist);
			console.log('用户数据', res);
		},
		//收藏数量
		async userall() {
			const { data: res } = await user_data(this.userid);
			// this.collect = res;
			console.log('收藏', res);
		},
		//跳转歌单详情
		usersong(item) {
			uni.navigateTo({
				url: `/views/song/play-list?id=${item.id}`
			});
		},
		goall() {
			//userid
			uni.navigateTo({
				url: `/views/user/userallsong?id=${this.userid}`
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.user {
	width: 100%;
	height: 500rpx;
	z-index: 1;
	.head-icon {
		display: flex;
		.icon-1 {
			margin-left: 30rpx;
			margin-top: 30rpx;
		}
		.icon-2 {
			margin-top: 30rpx;
			margin-right: 50rpx;
			display: flex;
			flex: 2;
			justify-content: flex-end;
		}
	}
}
.user-bg {
	background-color: #f6f6f8;
}
.user-img {
	margin: auto;
	width: 670rpx;
	background-color: #fefefe;
	border-radius: 20rpx;
	border: 10rpx #fefefe solid;
	box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	position: relative;
	bottom: 80rpx;
	z-index: 2;
	.img-box {
		width: 100%;
		display: flex;
		flex: 1;
		justify-content: center;
	}
	.img {
		width: 150rpx;
		height: 150rpx;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		position: relative;
		bottom: 60rpx;
	}
}
.title-box {
	width: 100%;
	display: flex;
	flex: 1;
	justify-content: center;
	position: relative;
	bottom: 30rpx;
}
.user-follow {
	width: 100%;
	display: flex;
	justify-content: center;
	position: relative;
	bottom: 30rpx;
	.user-1 {
		margin-left: 20rpx;
	}
}
.user-city {
	position: relative;
	bottom: 30rpx;
	width: 100%;
	display: flex;
	justify-content: center;
}
.edit {
	width: 100%;
	display: flex;
	justify-content: center;
	.btn {
		width: 150rpx;
		position: relative;
		bottom: 20rpx;
	}
}
.user-msg {
	width: 670rpx;
	border-radius: 20rpx;
	background-color: #ffffff;
	box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	border: 10rpx solid #fefefe;
	margin: auto;
	p {
		font-size: 30rpx;
		font-weight: bold;
		margin-left: 20rpx;
		margin-top: 20rpx;
	}
	.time {
		margin-top: 20rpx;
		margin-left: 20rpx;
	}
	.city {
		margin-top: 20rpx;
		margin-left: 20rpx;
	}
}
.like-music {
	width: 670rpx;
	border-radius: 20rpx;
	background-color: #ffffff;
	box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	border: 10rpx solid #ffffff;
	margin: auto;
	margin-top: 30rpx;
	margin-bottom: 30rpx;
	display: flex;
	align-items: center;
	view:nth-child(1) {
		width: 60px;
		height: 60px;
		border-radius: 20rpx;
		background: red;
		display: flex;
		justify-content: center;
	}
	.icon {
		display: flex;
		justify-content: center;
	}
}
.box {
	height: 30rpx;
}
.user-list {
	width: 670rpx;
	height: 100%;
	border-radius: 20rpx;
	background-color: #ffffff;
	box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	border: 10rpx solid #fefefe;
	margin-top: 20rpx;
	margin: auto;
	padding-bottom: 20rpx;
	p {
		font-size: 30rpx;
		font-weight: bold;
		margin-top: 20rpx;
	}
	.list {
		margin-top: 30rpx;
		margin-left: 10rpx;
		.list-layout {
			display: flex;
			align-items: center;
		}
		.img {
			width: 200rpx;
			height: 200rpx;
			border-radius: 20rpx;
		}
		.title {
			width: 100%;
			margin-left: 40rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			font-size: 28rpx;
		}
	}
	.all {
		display: flex;
		flex: 1;
		justify-content: center;
		align-items: center;
		font-size: 34rpx;
	}
}
.collect {
	width: 680rpx;
	height: 100%;
	border-radius: 20rpx;
	background-color: #ffffff;
	box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	border: 10rpx solid #fefefe;
	margin-top: 100rpx;
	margin: auto;
	// border: 10rpx solid red;
	margin-top: 20px;
	padding-bottom: 30rpx;
	margin-bottom: 20rpx;
	p {
		font-size: 30rpx;
		font-weight: bold;
		margin-top: 20rpx;
		margin-left: 20rpx;
	}
	&-item {
		view:nth-child(1) {
			display: flex;
			align-items: center;
			margin-left: 10rpx;
			margin-top: 20rpx;
		}
		view:nth-child(2) {
			width: 400rpx;
			font-size: 26rpx;
			margin-left: 20rpx;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
	}
	&-img {
		width: 200rpx;
		height: 200rpx;
		border-radius: 23rpx;
	}
	.all {
		display: flex;
		flex: 1;
		justify-content: center;
		align-items: center;
		font-size: 34rpx;
	}
}
.foot {
	height: 20rpx;
}
</style>
