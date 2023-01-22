<template>
	<view>
		<view class="mide">
			<view class="mide-head">
				<view class="name">{{ mvlist.name }}</view>
				<view><video class="video" :src="mvdata.url" :title="mvlist.name"></video></view>
			</view>
			<view class="mide-comments">
				<view class="mide-comments-items">
					<view v-for="(items, index) in commentlist" :key="index">
						<view class="layout">
							<view><img class="img" :src="items.user.avatarUrl" alt="" /></view>
							<view class="comments">
								<view class="time">{{ items.time | showdata }}</view>
								<view class="content">{{ items.content }}</view>
								<view class="beReplied" v-if="items.beReplied.length != 0">{{ items.beReplied.length }}回复</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
const { palymv, mvdata, mvcomments } = require('@/network/https/api.js');
const { dateFormat } = require('@/utils/time.js');
export default {
	data() {
		return {
			mvid: '',
			mvlist: [],
			mvdata: [],
			commentlist: [],
			pagsize: 20,
			currentpage: 1,
			toalpage: ''
		};
	},
	onReachBottom() {
		if (this.currentpage >= this.toalpage) return;
		this.currentpage++;
		this.mvcomment();
	},
	onLoad(val) {
		this.mvid = val.vid;
		this.palymvlist();
		this.getmvdate();
		this.mvcomment();
		// console.log(val);
	},
	methods: {
		async getmvdate() {
			const { data: res } = await mvdata(this.mvid);
			this.mvlist = res.data;
			console.log(this.mvlist.cover);
		},
		async palymvlist() {
			const parm = {
				id: this.mvid,
				r: 1080
			};
			const { data: res } = await palymv(parm.id, parm.r);
			this.mvdata = res.data;
			console.log(res);
		},
		async mvcomment() {
			const parm = {
				id: this.mvid,
				limit: this.pagsize,
				offset: this.currentpage
			};
			const { data: res } = await mvcomments(parm);
			this.commentlist = [...this.commentlist, ...res.comments];
			// this.commentlist = res.comments;
			// this.commentlist.push(...res.comments);
			// this.commentlist.push.apply(this.commentlist,res.comments)
			// this.commentlist = this.commentlist.concat(res.comments);
			this.toalpage = res.total;
			console.log('sss', this.commentlist);
		}
	},
	filters: {
		showdata(val) {
			let date = new Date();
			return dateFormat('YYYY年mm月dd日HH时', date);
		}
	},
	computed: {}
};
</script>

<style lang="scss">
.mide {
	&-head {
		.name {
			text-align: center;
			font-size: 30rpx;
			line-height: 50rpx;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		.video {
			width: 100%;
			height: 400rpx;
			border-radius: 20rpx;
		}
	}
	.mide-comments {
		display: flex;
		flex-direction: column;
		&-items {
			.layout {
				display: flex;
				margin-top: 20rpx;
				padding-left: 20rpx;
				.img {
					width: 150rpx;
					height: 150rpx;
					border-radius: 20rpx;
				}
				.comments {
					padding-left: 40rpx;
					.time {
						font-size: 25rpx;
					}
					.content {
						display: flex;
						font-size: 25rpx;
						width: 500rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 3; //2行
						-webkit-box-orient: vertical;
					}
					.beReplied {
					}
				}
			}
		}
	}
}
</style>
