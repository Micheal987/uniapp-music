<template>
	<view>
		<view class="day">
			<view v-for="(items, index) in musiclist" :key="index">
				<view class="day-items">
					<view class="user">
						<view class="user-img"><img class="img" :src="items.al.picUrl" alt="" /></view>
						<view class="name">
							<view>{{ items.name }}</view>
							<view>{{ items.ar[0].name }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
import { daymusic } from '@/network/https/api.js';
export default {
	data() {
		return {
			musiclist: {}
		};
	},
	onLoad() {
		this.music();
	},
	methods: {
		async music() {
			const { data: res } = await daymusic();
			this.musiclist = res.data.dailySongs;
			console.log(this.musiclist);
		}
	}
};
</script>

<style lang="scss">
.day {
	&-items {
		padding-left: 20rpx;
		.user {
			display: flex;
			align-items: center;
			padding-top: 30rpx;
			&-img {
				.img {
					width: 100rpx;
					height: 100rpx;
					border-radius: 30rpx;
				}
			}
			.name{
				padding-left: 30rpx;
			}
		}
	}
}
</style>
