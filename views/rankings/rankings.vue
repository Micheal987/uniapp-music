<template>
	<view>
		<view class="card-layout">
			<scroll-view scroll-y class="card-layout-height">
				<view class="card-layout-item">
					<view v-for="(items, index) in toplist" :key="index" @click="go(items,index)">
						<view class="card-layout-img">
							<img class="img" :src="items.coverImgUrl" alt="" />
							<view class="title">{{ items.name }}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
const { top_list } = require('@/network/https/api.js');
export default {
	data() {
		return {
			toplist: []
		};
	},
	onLoad() {
		this.topdata();
	},
	methods: {
		async topdata() {
			const { data: res } = await top_list();
			this.toplist = res.list;
			console.log('排行榜', res);
		},
		go(items,index){
			uni.navigateTo({
				url:`/views/song/play-list?id=${items.id}`
			})
		}
	}
};
</script>

<style lang="scss">
.card-layout {
	&-height {
	}
	&-item {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
	}
	&-img {
		padding-top: 30rpx;
		margin-left: 30rpx;
		.img {
			width: 200rpx;
			height: 200rpx;
			border-radius: 20rpx;
		}
		.title {
			display: flex;
			justify-content: center;
			width: 200rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
}
</style>
