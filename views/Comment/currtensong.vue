<template>
	<view>
		<view class="head">
			<view class="iocn-l" @click="leves"><u-icon name="arrow-leftward" color="#000" size="35"></u-icon></view>
		</view>
		<view class="comments">
			<view v-for="(items, index) in Commentlist" :key="index">
				<view class="comments-item">
					<view class="user">
						<view class="user-img"><img class="img" :src="items.user.avatarUrl" alt="" /></view>
						<view class="user-con">
							<view class="content">{{ items.content }}</view>
							<view class="time">{{ items.time | showdata }}</view>
							<view v-if="items.beReplied.length != 0">{{ items.beReplied.length }}条回复</view>
						</view>
						<view class="user-like">
							<view v-if="items.likedCount != 0">{{ items.likedCount }}</view>
							<view><u-icon name="thumb-up" color="#000" size="28"></u-icon></view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
import { musicon } from '@/network/https/api.js';
import { dateFormat } from '@/utils/time.js';
export default {
	data() {
		return {
			id: '',
			pagesize: 30,
			currtenpage: 0,
			toalpage: 0,
			pagebefore: '',
			Commentlist: []
		};
	},
	onLoad(val) {
		this.id = val.id;
		this.getComment();
	},
	onReachBottom() {
		this.currtenpage++;
		if (this.currtenpage > this.toalpage) return;
		this.getComment();
	},
	methods: {
		async getComment() {
			const parm = {
				id: this.id,
				limit: this.pagesize,
				offset: this.currtenpage,
				before: this.pagebefore
			};
			const { data: res } = await musicon(parm);
			this.toalpage = Math.ceil(res.toal);
			this.Commentlist.push(...res.comments);
			// this.Commentlist = Object.assign(this.Commentlist,res.comments)
		},
		leves(){
			uni.navigateBack({
				delta:1
			})
		}
	},
	filters: {
		showdata(val) {
			let date = new Date();
			return dateFormat('Y-m-d-H:M', date);
		}
	}
};
</script>

<style lang="scss">
	.head{
		display: flex;
		.iocn-l{
			padding-left: 60rpx;
		}
	}
.comments {
	padding-top: 20rpx;
	padding-left: 20rpx;
	&-item {
		padding-top: 10rpx;
		.user {
			display: flex;
			align-items: flex-start;
			&-img {
				.img {
					width: 120rpx;
					height: 120rpx;
					border-radius: 30rpx;
				}
			}
			&-con {
				padding-left: 30rpx;
				.content {
					font-size: 25rpx;
					display: flex;
					align-items: center;
					width: 400rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: normal;
					display: -webkit-box;
					-webkit-line-clamp: 2; //2行
					-webkit-box-orient: vertical;
				}
				.time {
					font-size: 20rpx;
				}
			}
			&-like {
				display: flex;
				flex: 1;
				justify-content: flex-end;
				align-items: center;
				padding-right: 40rpx;
			}
		}
	}
}
</style>
