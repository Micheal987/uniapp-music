<template>
	<view>
		<view>
			<view class="head">
				<view class="head-icon">
					<view class="left" @click="leave">
						<u-icon class="icon" name="arrow-left" color="#000" size="28"></u-icon>
						<view class="radios">{{ radios.name }}</view>
					</view>
					<view class="right">
						<u-icon class="icon" name="share" color="#000" size="28"></u-icon>
						<u-icon class="icon" name="more-dot-fill" color="#000" size="28"></u-icon>
					</view>
				</view>
			</view>
			<view class="bg" :style="{ backgroundImage: 'url(' + radios.picUrl + ')' }"></view>
			<view class="mide">
				<view class="mide-img"><img class="img" :src="radios.picUrl" alt="" /></view>
				<view class="mide-name">{{ radios.name }}</view>
			</view>
			<view>
				<view class="layout">
					<view v-for="(items, index) in showDoc" :key="index">
						<view>
							<view class="layout-mide">
								<img @click="getall(items, index)" class="img" :src="items.coverUrl" alt="" />
								<view class="name">
									<view class="title">
										<view class="title-item">{{ items.name }}</view>
										<view>{{ items.createTime | showdata }}</view>
									</view>
									<view class="description">{{ items.description }}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="foot"></view>
	</view>
</template>
<script>
const { Radio_data, program, songurl } = require('@/network/https/api.js');
const { obj_radios, radiourl } = require('@/utils/radio.js');
const { dateFormat } = require('@/utils/time.js');
const { playaudio } = require('@/utils/player.js');
export default {
	data() {
		return {
			id: '',
			radios: [],
			pagesize: 20,
			currtenpage: 1,
			radioasc: false,
			showDoc: [],
			toalpage: 0
		};
	},
	onLoad(val) {
		(this.id = val.id), this.radiolist();
		this.getprogram();
	},
	onReachBottom() {
		this.currtenpage++;
		if (this.currtenpage >= this.toalpage) return;
		this.getprogram();
	},
	filters: {
		showdata(val) {
			let date = new Date();
			return dateFormat('YYYY-mm-dd-HH:MM', date);
		}
	},
	methods: {
		leave() {
			uni.navigateBack({
				delta: 1
			});
		},
		async radiolist() {
			const { data: res } = await Radio_data(this.id);
			this.radios = obj_radios(res);
			// console.log(res);
		},
		async getprogram() {
			const parm = {
				rid: this.id,
				limit: this.pagesize,
				offset: this.currtenpage,
				asc: this.radioasc
			};
			const { data: res } = await program(parm);
			this.toalpage = Math.ceil(res.count / parm.limit);
			console.log(this.toalpage);
			this.showDoc = [...this.showDoc, ...res.programs];
			uni.setStorage({
				key: 'radiolist',
				data: this.showDoc,
				success: () => {}
			});
			// console.log('详情', this.showDoc);
		},
		// async	getall(items,index){
		// 	console.log(items.mainSong.id);
		// 	const {data:res} = await songurl(items.mainSong.id)
		// 	console.log("音频",res);
		// }
		getall(items, index) {
			let url = radiourl(items);
			console.log(url);
			playaudio(url);
			uni.setStorage({
				key: 'radioindex',
				data: index,
				success: () => {}
			});
			uni.setStorage({
				key: 'radios',
				data: items,
				success: () => {}
			});
			uni.navigateTo({
				url: `/views/Radio/playradio?id=${items.id}`
			});
		}
	}
};
</script>

<style lang="scss">
.head {
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
}
.bg {
	height: 400rpx;
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
}
.mide {
	display: flex;
	padding-top: 80rpx;
	padding-left: 30rpx;
	padding-bottom: 30rpx;
	position: absolute;
	top: 100rpx;
	&-img {
		.img {
			width: 250rpx;
			height: 250rpx;
			border-radius: 30rpx;
		}
	}
	&-name {
		padding-top: 50rpx;
		width: 400rpx;
		overflow: hidden;
		white-space: normal;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3; //2行
		-webkit-box-orient: vertical;
		font-size: 34rpx;
		padding-left: 30rpx;
	}
}
.layout {
	padding-left: 20rpx;
	padding-right: 20rpx;
	padding-bottom: 50rpx;
	width: 90%;
	margin: auto;
	border-radius: 30rpx;
	background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
	box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
	&-mide {
		display: flex;
		align-items: center;
		padding-left: 10rpx;
		padding-top: 30rpx;
		.img {
			width: 150rpx;
			height: 150rpx;
			border-radius: 30rpx;
		}
		.name {
			padding-left: 30rpx;
			.title {
				&-item {
					width: 400rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
			.description {
				width: 400rpx;
				overflow: hidden;
				white-space: normal;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2; //2行
				-webkit-box-orient: vertical;
			}
		}
	}
}
.foot {
	height: 100rpx;
	padding-top: 30rpx;
	padding-bottom: 30rpx;
}
</style>
