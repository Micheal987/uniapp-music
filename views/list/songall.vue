<template>
	<view>
		<view class="container">
			<view class="singer">
				<p>单曲</p>
				<view v-for="(items, index) in albums" :key="index">
					<view class="singer-card">
						<view class="singer-name">
							<view>{{ items.name }}</view>
							<view class="singer-icon">
								<u-icon name="play-circle" color="#000" size="28"></u-icon>
								<u-icon name="download" color="#000" size="28"></u-icon>
							</view>
						</view>
						<view class="singer-ar">{{ items.ar[0].name }}</view>
					</view>
				</view>
				<view class="singer-count">查看{{ singercount }}首单曲</view>
			</view>
			<view class="playlist">
				<view class="title">歌单</view>
				<view class="playlist-items">
					<view v-for="(items, play) in playlist" :key="play">
						<view class="playlist-items-1">
							<view><image class="img" :src="items.backgroundUrl" mode=""></image></view>
							<view class="nickname">
								<view>{{ items.nickname }}</view>
								<view>{{ items.signature }}</view>
							</view>
						</view>
					</view>
					<view class="foot">查看</view>
				</view>
			</view>
			<view class="video-list">
				<view class="h1">视频</view>
				<view class="video-items">
					<view v-for="(items, index) in video" :key="index">
						<view class="video-items-1">
							<view><image class="img" :src="items.coverUrl" mode=""></image></view>
							<view class="title">{{ items.title }}</view>
						</view>
					</view>
					<view class="foot">查看</view>
				</view>
			</view>
			<view class="al-list">
				<view class="h1">艺人</view>
				<view class="al-items">
					<view v-for="(items, index) in artists" :key="index">
						<view class="al-items-1">
							<view><image class="img" :src="items.picUrl" mode=""></image></view>
							<view class="name">{{ items.name }}</view>
						</view>
					</view>
					<view class="foot">查看</view>
				</view>
			</view>
			<view class="al-list">
				<view class="h1">用户</view>
				<view class="al-items">
					<view v-for="(items, index) in users" :key="index">
						<view class="al-items-1">
							<view><image class="img" :src="items.avatarUrl" mode=""></image></view>
							<view class="name">{{ items.nickname }}</view>
						</view>
					</view>
					<view class="foot">查看</view>
				</view>
			</view>
		</view>
		<view class="foot"></view>
	</view>
</template>
<script>
import { search_list_all, search_list } from '@/network/https/search.js';
import { mapState, mapMutations } from 'vuex';
export default {
	props: ['name'],
	data() {
		return {
			albums: '', //单曲
			playlist: '', //
			artists: '', //
			users: '', //
			video: '', //
			singercount: '',
			pageSize: 10,
			currentPage: 0
		};
	},
	mounted() {
		this.single();
		this.singlelist();
		this.singlervideo();
		this.user();
		this.al();
	},
	methods: {
		async single() {
			const parm = {
				keywords: this.name,
				limit: this.pageSize,
				offset: this.currentPage,
				type: 1
			};
			const { data: res } = await search_list_all(parm);
			this.albums = res.result.songs.slice(0, 10);
			console.log(res);
		},
		async singlelist() {
			const parm = {
				keywords: this.name,
				limit: this.pageSize,
				offset: this.currentPage,
				type: 1002
			};
			const { data: res } = await search_list_all(parm);
			this.totalPage = res.userprofileCount;
			this.playlist = res.result.userprofiles.slice(0, 4);
			console.log('歌单', res);
		},
		async singlervideo() {
			const parm = {
				keywords: this.name,
				limit: this.pageSize,
				offset: this.currentPage,
				type: 1014
			};
			const { data: res } = await search_list_all(parm);
			this.video = res.result.videos.slice(0, 5);
			console.log('mv', res);
		},
		async al() {
			const parm = {
				keywords: this.name,
				limit: this.pageSize,
				offset: this.currentPage,
				type: 100
			};
			const { data: res } = await search_list_all(parm);
			this.artists = res.result.artists.slice(0, 5);
			console.log('al', res);
		},
		async user() {
			const parm = {
				keywords: this.name,
				limit: this.pageSize,
				offset: this.currentPage,
				type: 1002
			};
			const { data: res } = await search_list_all(parm);
			this.totalPage = res.result.userprofileCount;
			this.users = res.result.userprofiles.slice(0, 3);
			console.log('user', res);
		}
	}
};
</script>
<style lang="scss" scoped>
.container {
	background-color: #f1f3f4;
	padding-top: 20rpx;
	.singer {
		width: 670rpx;
		padding-top: 20rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
		padding-bottom: 20rpx;
		background-color: #ffffff;
		border-radius: 10rpx;
		margin: 20rpx auto;
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
		p {
			font-size: 40rpx;
			border-bottom: 2rpx solid;
			margin-bottom: 20rpx;
		}
		&-crad {
			display: flex;
		}
		&-name {
			display: flex;
			justify-content: space-between;
		}
		&-icon {
			display: flex;
		}
		&-ar {
			font-size: 27rpx;
		}
		&-count {
			display: flex;
			flex: 1;
			justify-content: center;
			font-size: 30rpx;
			line-height: 50rpx;
		}
	}
	.playlist {
		background-color: #ffffff;
		width: 700rpx;
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
		margin: 30rpx auto;
		border-radius: 10rpx;
		.title {
			font-size: 40rpx;
			margin-left: 30rpx;
			padding-top: 30rpx;
			padding-bottom: 10rpx;
		}
		.playlist-items {
			margin-left: 20rpx;
			margin-top: 30rpx;
			&-1 {
				display: flex;
				align-items: center;
				margin-top: 20rpx;
				.img {
					width: 130rpx;
					height: 130rpx;
					border-radius: 20rpx;
				}
				.nickname {
					margin-left: 30rpx;
					view:nth-child(1) {
						font-size: 34rpx;
					}
					view:nth-child(2) {
						font-size: 27rpx;
						width: 300rpx;
						white-space: normal;
						overflow: hidden;
						display: -webkit-box; //将元素设为盒子伸缩模型显示
						-webkit-box-orient: vertical; //伸缩方向设为垂直方向
						-webkit-line-clamp: 2; //超出3行隐藏，并显示省略号
					}
				}
			}
			.foot {
				display: flex;
				flex: 1;
				padding: 20rpx;
				justify-content: center;
			}
		}
	}
	.video-list {
		background-color: #ffffff;
		width: 700rpx;
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
		margin: 30rpx auto;
		border-radius: 10rpx;
		padding-bottom: 30rpx;
		.h1 {
			font-weight: bold;
			font-size: 37rpx;
			margin-left: 20rpx;
			padding-top: 20rpx;
			padding-bottom: 20rpx;
		}
		.video-items {
			margin-left: 20rpx;
			&-1 {
				display: flex;
				align-items: center;
				margin-top: 30rpx;
				.img {
					width: 250rpx;
					height: 150rpx;
					border-radius: 23rpx;
				}
				.title {
					margin-left: 30rpx;
					width: 300rpx;
					white-space: normal;
					overflow: hidden;
					display: -webkit-box; //将元素设为盒子伸缩模型显示
					-webkit-box-orient: vertical; //伸缩方向设为垂直方向
					-webkit-line-clamp: 2; //超出3行隐藏，并显示省略号
				}
			}
			.foot {
				display: flex;
				flex: 1;
				padding: 20rpx;
				justify-content: center;
			}
		}
	}
	.al-list {
		background-color: #ffffff;
		width: 700rpx;
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
		margin: 30rpx auto;
		border-radius: 10rpx;
		padding-bottom: 30rpx;
		.h1 {
			font-weight: bold;
			margin-left: 20rpx;
			padding-top: 20rpx;
		}
		.al-items {
			&-1 {
				display: flex;
				align-items: center;
				margin-top: 20rpx;
				margin-left: 20rpx;
				.img {
					width: 130rpx;
					height: 130rpx;
					border-radius: 50%;
				}
				.name {
					margin-left: 30rpx;
				}
			}
			.foot {
				display: flex;
				flex: 1;
				padding: 20rpx;
				justify-content: center;
			}
		}
	}
	.foot {
		height: 30rpx;
	}
}
</style>
