<template>
	<view>
		<view class="mide">
			<view class="mide-icon">
				<view class="left" @click="leave">
					<u-icon class="icon" name="arrow-left" color="#000" size="28"></u-icon>
					<view class="radios">{{ currten.name }}</view>
				</view>
				<view class="right">
					<u-icon class="icon" name="share" color="#000" size="28"></u-icon>
					<u-icon class="icon" name="more-dot-fill" color="#000" size="28"></u-icon>
				</view>
			</view>
			<view class="bg" :style="{ backgroundImage: 'url(' + currten.blurCoverUrl + ')' }"></view>
		</view>
		<view></view>
		<view>
			<u-slider :value="currtentime" min="0" step="60" @input="changtime" :max="maxtime" @change="changes"></u-slider>
			{{ (maxtime / 60).toFixed(2) }}
		</view>
	</view>
</template>
<script>
import { mapState } from 'vuex';
const { playerAudio, playaudio } = require('@/utils/player.js');
export default {
	data() {
		return {
			currten: {}
		};
	},
	onLoad() {
		this.currten = uni.getStorageSync('radios');
	},
	methods: {
		leave() {
			uni.navigateBack({
				delta: 1
			});
		},
		changes(val) {
			playerAudio.seek(val);
		},
		changtime(val) {
			playerAudio.seek(val);
		}
	},
	computed: {
		...mapState({
			currtentime: state => state.songs.currentimer,
			maxtime: state => state.songs.maxtimer
		})
	},
	watch: {
		time() {
			console.log('sss');
		}
	}
};
</script>

<style lang="scss">
.mide {
	&-icon {
		z-index: 1;
		display: flex;
		justify-content: center;
		padding-top: 30rpx;
		.left {
			display: flex;
			.icon {
				padding-left: 30rpx;
			}
			.radios {
				width: 300rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				padding-left: 40rpx;
			}
		}
		.right {
			display: flex;
			flex: 1;
			justify-content: flex-end;
			.icon {
				padding-left: 30rpx;
				padding-right: 30rpx;
			}
		}
	}
	.bg {
		height: 90vh;
		background-size: cover;
		background-repeat: no-repeat;
		transform: scaleX(1);
		background-position: 50%;
		filter: opacity(40%);
		filter: blur(80px);
		z-index: -1;
		position: relative;
		top: 20rpx;
		border-radius: 0 0 20% 20%;
		z-index: 0;
	}
}
</style>
