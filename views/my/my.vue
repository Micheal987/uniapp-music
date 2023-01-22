<template>
	<view>
		<!-- 	背景 -->
		<view class="user">
			<view class="head-icon">
				<!-- 	<view class="icon-1"><u-icon name="arrow-leftward" color="#fff" size="30" @click="leaver"></u-icon></view>
				<view class="icon-2"><u-icon name="more-dot-fill" color="#fff" size="35"></u-icon></view> -->
			</view>
		</view>
		<!-- 	//user -->
		<view class="user-bg">
			<!-- 	user -->
			<u-action-sheet :actions="userimg" :title="title" :show="usershow" @select="changeuserimg" @close="changeimg"></u-action-sheet>
			<view class="user-img">
				<view class="img-box" @click="changeimg"><image class="img" :src="list.profile.avatarUrl" mode=""></image></view>
				<view class="title-box">
					<view>{{ list.profile.nickname }}</view>
				</view>
				<!-- //msg -->
				<view class="user-follow">
					<view class="user-1">{{ list.profile.follows }}关注</view>
					<view class="user-1">{{ list.profile.followeds }}跟随</view>
					<view class="user-1">Lv.{{ list.profile.djStatus }}</view>
				</view>
			</view>

			<!-- 音乐品味 -->
			<view class="like-music">
				<view @click="likelist">
					<view class="icon"><u-icon name="heart-fill" color="#fff" size="58"></u-icon></view>
				</view>
			</view>
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
				<view class="all">
					查看全部<u-icon name="arrow-right" color="#000" size="28"></u-icon>
				</view>
			</view>
			<view class="input">
				<view @click="shows" class="icon"><u-icon name="plus" color="#2979ff" size="50"></u-icon></view>
				<view class="title">新建歌单</view>
				<u-popup :show="show" @close="close" @open="open" mode="bottom" round="10">
					<view>
						<view>
							<view class="popus">
								<view class="clane">取消</view>
								<view class="done" @click="addlist">完成</view>
							</view>
							<u-tabs :list="addfrom" @click="fromclick"></u-tabs>
							<view class="from" v-if="active == 0">
								<u--input placeholder="输入新建歌单标题" border="surround" v-model="listname"></u--input>
								<u-checkbox-group v-model="checksonglist" placement="column" @change="checkboxChange">
									<u-checkbox :customStyle="{ marginBottom: '8px' }" v-for="(item, index) in addsonglist" :key="index" :label="item.name" :name="item.name"></u-checkbox>
								</u-checkbox-group>
							</view>
							<view class="from" v-if="active == 1">
								<u--input placeholder="输入新建视频歌单标题" border="surround" v-model="videolist"></u--input>
								<u-checkbox-group v-model="checkvideolist" placement="column" @change="checkvideo">
									<u-checkbox :customStyle="{ marginBottom: '8px' }" v-for="(item, index) in addvideolist" :key="index" :label="item.name" :name="item.name"></u-checkbox>
								</u-checkbox-group>
							</view>
						</view>
					</view>
				</u-popup>
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
			</view>
			<view class="foot"></view>
			<!-- 	//底部 -->
		</view>
	</view>
</template>

<script>
import { user_list, user_like, user_data, s_t, user_res, createlist } from '@/network/https/user.js'; //网络请求
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
			listname: '',
			textlist: '',
			show: false,
			active: 0,
			addfrom: [{ name: '音乐歌单', type: 'NORMAL' }, { name: '视频歌单', type: 'VIDEO' }],
			checksonglist: [],
			checkvideolist: [],
			addsonglist: [
				{
					name: '设置为共享歌单(和好友一起管理)',
					disabled: false
				},
				{
					name: '设置为隐私歌单',
					disabled: false
				}
			],
			addvideolist: [
				{
					name: '设置为隐私视频',
					disabled: false
				}
			],
			videolist: '',
			privacysong: '',
			privacyvideo: '',
			usershow: false,
			title: '头像',
			userimg: [
				{
					name: '更换头像',
					subname: '选项一描述',
					color: 'red',
					fontSize: '20'
				}
			]
		};
	},
	onLoad() {},
	created() {
		//缓存
		this.list = uni.getStorageSync('user');
		console.log(this.list);
		//方法
		this.usermsg(), this.userall();
		this.userst();
	},
	methods: {
		changeimg() {
			this.usershow = !this.usershow;
		},
		changeuserimg() {
			uni.chooseImage({
				success: chooseImageRes => {
					const tempFilePaths = chooseImageRes.tempFilePaths;
					uni.uploadFile({
						url: 'https://www.example.com/upload', //仅为示例，非真实的接口地址
						filePath: tempFilePaths[0],
						name: 'file',
						formData: {
							user: 'test'
						},
						success: uploadFileRes => {
							console.log(uploadFileRes.data);
						}
					});
				}
			});
		},
		checkboxChange(val) {
			console.log('change', val);
			// this.privacysong = val;
		},
		checkvideo(val) {
			// this.privacyvideo = val;
			console.log(val);
		},
		fromclick(items) {
			this.active = items.index;
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
				url: `/views/like/like`
			});
		},
		//用户信息
		async usermsg() {
			// console.log(this.list.account.id);
			const param = {
				uid: this.list.account.id,
				limit: this.pageSize,
				offset: this.currentPage
			};
			//暂无分页
			const { data: res } = await user_list(param.uid, param.limit, param.offset);
			this.userd = res.playlist;
			this.collect = this.userd.filter(item => {
				return item.creator.userId != this.list.profile.userId;
			});
			this.userlist = this.userd.filter(item => {
				return item.creator.userId == this.list.profile.userId;
			});
			console.log(this.collect);
			console.log(this.userlist);
			console.log('用户数据', res);
		},
		//收藏数量
		async userall() {
			const { data: res } = await user_data(this.list.account.id);
			// this.collect = res;
			console.log('收藏', res);
		},
		//跳转歌单详情
		usersong(item) {
			uni.navigateTo({
				url: `/views/song/play-list?id=${item.id}`
			});
		},
		async addsongs() {
			let privacy = this.checksonglist.includes(this.addsonglist[1].name) == true ? '10' : '';
			let type = this.checksonglist.includes(this.addsonglist[0].name) == true ? 'SHARED' : this.addfrom[0].type;
			if (this.listname == '' || null) return;
			const parm = {
				name: this.listname,
				privacy: privacy,
				type: type
			};
			const { data: res } = await createlist(parm);
			console.log('成功新增歌单', res);
			uni.navigateTo({
				url: `/views/song/play-list?id=${res.id}`
			});
		},
		async addvideo() {
			if (this.videolist == '' || null) return;
			const parm = {
				name: this.videolist,
				privacy: this.checkvideolist == '' || null ? '' : '10',
				type: 'NORMAL'
			};
			const { data: res } = await createlist(parm);

			console.log('成功新增视频', res);
		},
		addlist() {
			switch (this.active) {
				case 0:
					this.addsongs();
					break;
				case 1:
					this.addvideo();
					break;
			}
		},
		shows() {
			this.show = true;
		},
		open() {
			// console.log('open');
		},
		close() {
			this.show = false;
			// console.log('close');
		}
	}
};
</script>

<style lang="scss" scoped>
.user {
	width: 100%;
	z-index: 1;
	background-color: #f6f6f8;
	padding-top: 50rpx;
	.head-icon {
		display: flex;
		padding-top: 80rpx;
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
	bottom: 40rpx;
	z-index: 2;
	.img-box {
		width: 100%;
		display: flex;
		flex: 1;
		justify-content: center;
	}
	.img {
		position: relative;
		bottom: 50rpx;
		width: 150rpx;
		height: 150rpx;
		border-radius: 50%;
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
	height: 200rpx;
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
		width: 80px;
		height: 80px;
		border-radius: 20rpx;
		background: red;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.icon {
		display: flex;
		justify-content: center;
	}
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
	.all{
		display: flex;
		flex: 1;
		justify-content: center;
		align-items: center;
		font-size: 34rpx;
	}
}
.input {
	width: 670rpx;
	height: 100%;
	border-radius: 20rpx;
	background-color: #ffffff;
	box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	border: 10rpx solid #fefefe;
	margin: auto;
	margin-top: 20rpx;
	display: flex;
	.icon {
		width: 200rpx;
		height: 200rpx;
		border: 2rpx #000 solid;
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
		border-radius: 30rpx;
		display: flex;
		justify-content: center;
	}
	.title {
		display: flex;
		flex: 1;
		align-items: center;
		margin-left: 50rpx;
	}
	.popus {
		display: flex;
		padding-left: 40rpx;
		padding-right: 40rpx;
		padding-bottom: 30rpx;
		.clane {
			font-size: 40rpx;
			padding-top: 20rpx;
		}
		.done {
			padding-top: 20rpx;
			font-size: 40rpx;
			display: flex;
			flex: 1;
			justify-content: flex-end;
		}
	}
}
.from {
	padding-left: 20rpx;
	padding-top: 30rpx;
	padding-bottom: 20rpx;
	.input {
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
	padding-bottom: 20rpx;
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
}
.foot {
	height: 20rpx;
}
</style>
