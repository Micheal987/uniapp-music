<template>
	<view>
		<view class="head">
			<view @click="back"><u-icon name="arrow-leftward" color="#000" size="30"></u-icon></view>
			<view class="name">用户名</view>
		</view>
		<view><u-tabs :list="list" lineWidth="30" @click="tab"></u-tabs></view>
		<view v-if="active == 0">
			<view class="user-list">
				<p>创建的歌单 ({{ mylist.length }})</p>
				<view v-for="(item, index) in mylist" :key="index" @click="usersong(item)">
					<view class="list">
						<view class="list-layout">
							<view><image class="img" :src="item.coverImgUrl" mode=""></image></view>
							<view class="title">{{ item.name }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="active == 1">
			<view class="user-list">
				<p>创建的歌单 ({{ collect.length }})</p>
				<view v-for="(item, index) in collect" :key="index" @click="usersong(item)">
					<view class="list">
						<view class="list-layout">
							<view><image class="img" :src="item.coverImgUrl" mode=""></image></view>
							<view class="title">{{ item.name }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
import { user_list } from '@/network/https/user.js';
export default {
	data() {
		return {
			userid: '',
			list: [
				{
					name: '创建歌单'
				},
				{ name: '收藏歌单' }
			],
			active: 0,
			pagesize: 20,
			currtenpage: 0,
			toalpage: 0,
			userlist: [],
			collect: [],
			mylist: []
		};
	},
	onLoad(val) {
		this.userid = val.id;
		this.userpalist();
	},
	onReachBottom() {
		this.currtenpage++;
		if (this.currtenpage > this.toalpage) return;
		this.userpalist();
	},
	methods: {
		back() {
			uni.navigateBack({
				delta: 1
			});
		},
		async userpalist() {
			const { data: res } = await user_list(this.userid, this.pagesize, this.currtenpage);
			this.userlist = res.playlist;
			this.toalpage = Math.ceil(this.userlist.length / this.pagesize);
			this.mylist = this.userlist.filter((items, index) => {
				return items.creator.userId == this.userid;
			});
			this.collect = this.userlist.filter((items, index) => {
				return items.creator.userId != this.userid;
			});
		},
		tab(item) {
			this.active = item.index;
		},
		usersong(items) {
			console.log(items.name);
		}
	}
};
</script>

<style lang="scss">
.head {
	display: flex;
	align-items: center;
	padding-left: 20rpx;
	padding-top: 30rpx;
	.name {
		padding-left: 40rpx;
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
}
</style>
