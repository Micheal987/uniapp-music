<template>
	<view>
		<!-- 留言 -->
		<view class="head-back">
			<u-icon name="arrow-leftward" color="#000" size="32" @click="levear"></u-icon>
			<view class="comments">评论({{ songs.commentCount }})</view>
			<view class="share"><u-icon name="share" color="#000" size="32"></u-icon></view>
		</view>
		<view class="cover">
			<image class="img" :src="coverimg" mode=""></image>
			<view class="title">{{ songs.name }}</view>
		</view>
		<!-- 	导航 -->
		<view class="nav">
			<view class="nav-1">推荐</view>
			<view class="nav-1">热度</view>
			<view class="nav-1">最新</view>
		</view>
		<!-- 	/内容 -->
		<view class="comments-head">
			<view v-for="(items, index) in commentslist" :key="items.name">
				<view class="media">
					<view class="title-item">
						<image class="img" :src="items.user.avatarUrl" mode=""></image>
						<view class="name">
							<view>{{ items.user.nickname }}</view>
							<view class="time">{{ items.time | dateFormat }}</view>
							<view class="content-item">{{ items.content }}</view>
							<view class="beReplied" v-if="items.beReplied.length != 0" @click="shows">{{ items.beReplied.length }}条回复</view>
						</view>
						<!-- //回复 -->
						<view class="popup">
							<u-popup :show="show" :round="30" @close="close" @open="open" mode="bottom" overlayOpacity="0">
								<view class="popup-item">
									<view v-for="(res, key) in items.beReplied" :key="key">
										<view class="popus-img" @click="Reply(res)">
											<img class="img" :src="res.user.avatarUrl" alt="" />
											<view class="name">
												<view>{{ res.user.nickname }}</view>
												<view class="time">{{ res.time | dateFormat }}</view>
												<view class="content">{{ res.content }}</view>
											</view>
											<view class="like"><u-icon name="thumb-up" color="#000" size="30"></u-icon></view>
										</view>
									</view>
								</view>
								<view class="btn">
									<u--input class="btn-input" placeholder="请输入内容" border="surround" v-model="Replyconm">
										<u--text :text="userReply" slot="prefix" margin="0 3px 0 0" type="tips"></u--text>
									</u--input>
									<u-button class="btn-1" type="primary" text="发送" @click="rescomment"></u-button>
								</view>
							</u-popup>
						</view>
						<!-- 点赞 -->
						<view class="like"><u-icon name="thumb-up" color="#000" size="30"></u-icon></view>
					</view>
				</view>
			</view>
		</view>
		<!-- //评论 -->
		<view class="foot">
			<u--input placeholder="请输入内容" border="surround" v-model="addcomment" clearable suffixIcon="chat"></u--input>
			<u-button class="btn" type="primary" text="发送" @click="add"></u-button>
		</view>
	</view>
</template>
<script>
const { playlist_msg, song_palylist, addcomments } = require('@/network/https/api.js'); //请求
const { dateFormat } = require('@/utils/time.js');
export default {
	data() {
		return {
			commentslist: [], //留言
			coverimg: '', //图
			songs: '', //歌
			id: '', //传过来歌单的id
			totalPage: 1, //有几页
			pageSize: 50, //每页几条
			currentPage: 0, //当前页数
			addcomment: '',
			show: false,
			Replyconm: '',
			userReply: '',
			rescommentid: ''
		};
	},
	onLoad(val) {
		//接收传过来的id
		this.id = val.id;
		//id
		this.Comment(val.id);
		this.playlist(val.id);
	},
	//底部请求
	onReachBottom(val) {
		if (this.currentPage >= this.totalPage) return;
		console.log('进行下一页请求');
		uni.showLoading({
			title: '加载中',
			mask: true
		});
		setTimeout(function() {
			uni.hideLoading();
		}, 1000);
		this.Comment(val.id);
	},
	methods: {
		levear() {
			uni.navigateBack({
				delta: 1
			});
		},
		//留言
		async Comment() {
			const param = {
				id: this.id,
				limit: this.pageSize,
				offset: this.currentPage
			};
			const { data: res } = await playlist_msg(param.id, param.limit, param.offset);
			this.currentPage += 10; //加一页
			this.totalPage = res.total; //有几页
			this.commentslist = [...this.commentslist, ...res.comments];
			console.log(res);
		},
		//歌曲
		async playlist(id) {
			const param = {
				s: 8,
				id: id
			};
			const { data: res } = await song_palylist(param.id, param.s);
			this.coverimg = res.playlist.coverImgUrl;
			this.songs = res.playlist;
			console.log('歌单', res);
		},
		async add() {
			const parm = {
				t: 1,
				type: 2,
				id: this.id,
				content: this.addcomment
			};
			const { data: res } = await addcomments(parm);
			console.log('发送评论', res);
		},
		open() {
			// console.log('open');
		},
		close() {
			this.show = false;
			// console.log('close');
		},
		shows() {
			this.show = true;
		},
		Reply(val) {
			this.userReply = val.user.nickname;
			this.rescommentid = val.beRepliedCommentId;
		},
		async resReply() {
			const parm = {
				t: 2,
				type: 2,
				id: this.id,
				commentId: this.rescommentid,
				content: this.Replyconm
			};
			const { data: res } = await addcomments(parm);
			console.log('回复', res);
		},
		rescomment() {
			this.resReply();
		}
	},
	//时间处理
	filters: {
		dateFormat(value) {
			let date = new Date();
			return dateFormat('YYYY年mm月dd日HH时', date);
		}
	},
	computed: {}
};
</script>

<style lang="scss" scoped>
.head-back {
	width: 700rpx;
	display: flex;
	margin-top: 30rpx;
	margin-left: 30rpx;
	position: relative;
	top: 20rpx;
	.comments {
		margin-left: 30rpx;
		position: relative;
		top: 10rpx;
	}
	.share {
		display: flex;
		flex: 2;
		justify-content: flex-end;
	}
}
.cover {
	display: flex;
	margin-top: 30rpx;
	position: relative;
	top: 50rpx;
	left: 50rpx;
	.img {
		width: 200rpx;
		height: 200rpx;
		border-radius: 20rpx;
	}
	.title {
		margin-left: 39rpx;
		position: relative;
		top: 50rpx;
	}
}
.nav {
	position: relative;
	top: 100rpx;
	left: 150rpx;
	display: flex;
	.nav-1 {
		margin-left: 30rpx;
	}
}
.comments-head {
	margin-top: 130rpx;
	.media {
		margin-top: 20rpx;
	}
	.title-item {
		display: flex;
		width: 100%;
		font-size: 23rpx;
		margin-left: 20rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		.img {
			width: 100rpx;
			height: 100rpx;
			border-radius: 20rpx;
		}
		.name {
			padding-left: 30rpx;
			margin: top;
			padding-top: 10rpx;
			.time {
			}
			.content-item {
				width: 500rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: normal;
				display: -webkit-box;
				-webkit-line-clamp: 3; //2行
				-webkit-box-orient: vertical;
			}
			.beReplied {
				color: cornflowerblue;
				font-size: 28rpx;
			}
		}
		.popup {
			&-item {
				padding-bottom: 200rpx;
				background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
				.popus-img {
					display: flex;
					padding-left: 20rpx;
					margin-top: 20rpx;
					.img {
						width: 150rpx;
						height: 150rpx;
						border-radius: 30rpx;
					}
					.name {
						.time {
						}
						.content {
						}
					}
					.like {
					}
				}
			}
			.btn {
				display: flex;
				&-input {
				}
				&-1 {
					width: 100rpx;
				}
			}
		}
		.like {
			display: flex;
			flex: 1;
			justify-content: flex-end;
			align-items: center;
			padding-right: 30rpx;
		}
	}
}
.foot {
	display: flex;
	width: 100%;
	border-top: 5rpx red solid;
	position: fixed;
	bottom: 1rpx;
	background-color: #c2e9fb;
	.btn {
		width: 120rpx;
	}
}
</style>
