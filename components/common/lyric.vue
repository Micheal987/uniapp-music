<template>
	<view>
		<view class="lyc-card">
			<scroll-view scroll-y @scroll="scroll" :show-scrollbar="true" :scroll-top="scrolltop">
				<view class="lyc">
					<view v-for="(items, index) in lyric" :style="{ color: lyricIndex === index ? 'skyblue' : '#ded9d9', transform: 'translateY(' + height + 'px)' }" :key="index">
						{{ items.lyric }}
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>
<script>
export default {
	props: {
		lyric: {
			type: Array,
		},
		lyricIndex:{
			type:[Number,String],
			default:0
		},
		height:{
			type:[Number,String],
			default:0
		}
	},
	data() {
		return {
			scrolltop: 10,
		};
	},
	onLoad() {
	},
	methods: {
		scroll(e) {
			this.scrolltop = e.detail.scrollTop;
			console.log(this.scrolltop);
		}
	}
};
</script>
<style lang="scss" scoped>
.lyc-card {
	margin-top: 80rpx;
	color: #c0c4cc;
	.lyc {
		text-align: center;
		margin: 100rpx auto;
		height: 130vw;
	}
}
</style>
