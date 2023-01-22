<template>
	<view class="container">
		<scroll-view scroll-y class="foot">
			<view>
				<view class="foot-item" @click="palycur">
					<view><u-icon name="play-circle" color="#000" size="30"></u-icon></view>
					<view class="names">播放当前歌曲</view>
				</view>
				<view class="foot-item">
					<view><u-icon name="rewind-right" color="#000" size="30"></u-icon></view>
					<view class="names">下一首</view>
				</view>
				<view class="foot-item">
					<view><u-icon name="photo" color="#000" size="30"></u-icon></view>
					<view class="names" @click="go">歌曲评论({{ Commentlist.total }})</view>
				</view>
				<view class="foot-item">
					<view><u-icon name="file-text" color="#000" size="30"></u-icon></view>
					<view class="names">收藏歌曲</view>
				</view>
				<view class="foot-item">
					<view><u-icon name="eye-off" color="#000" size="30"></u-icon></view>
					<view class="names">屏蔽歌手</view>
				</view>
				<view class="foot-item">
					<view>
						<u-popup :show="show" @close="close" @open="open" mode="bottom" round="20">
							<view class="share">
								<view @click="wecaht"><u-icon name="photo" color="#000" size="40"></u-icon></view>
							</view>
						</u-popup>
					</view>
					<view><u-icon name="share-square" color="#000" size="30"></u-icon></view>
					<view class="names" @click="share">分享歌曲</view>
				</view>
				<view class="foot-item">
					<view><u-icon name="account" color="#000" size="30"></u-icon></view>
					<view class="names">歌手{{ ar }}</view>
				</view>
				<view class="foot-item">
					<view><u-icon name="account" color="#000" size="30"></u-icon></view>
					<view class="names">创建者</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>
<script>
import { songurl, musicon } from '@/network/https/api.js';
const { playaudio, playerAudio } = require('@/utils/player.js');
export default {
	props: {
		songid: {
			type: Number
		},
		ar: {
			type: String
		}
	},
	data() {
		return {
			currtensong: {},
			pagesize: 20,
			currtenpage: 0,
			Commentlist: {},
			show: false
		};
	},
	created() {
		this.songs();
	},
	methods: {
		async palycur() {
			const { data: res } = await songurl(this.songid);
			playaudio(res.data[0]);
			console.log(res);
		},
		async songs() {
			const parm = {
				id: this.songid,
				limit: this.pagesize,
				offset: this.currtenpage
			};
			const { data: res } = await musicon(parm);
			this.Commentlist = res;
		},
		share() {
			this.show = true;
		},
		open() {
			// console.log('open');
		},
		close() {
			this.show = false;
			// console.log('close');
		},
		wecaht(){
			
		},
		go() {
			uni.navigateTo({
				url: `/views/Comment/currtensong?id=${this.songid}`
			});
		}
	}
};
</script>

<style lang="scss">
.container {
	.foot {
		height: 420rpx;
		padding-top: 10rpx;
		padding-left: 5rpx;
		&-item {
			display: flex;
			align-items: center;
			padding-top: 30rpx;
			padding-left: 30rpx;
			.share {
				display: flex;
				align-items: center;
				align-content: center;
				padding-left: 30rpx;
				height: 200rpx;
			}
			.names {
				padding-left: 30rpx;
				width: 600rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}
}
</style>
