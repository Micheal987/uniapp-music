<template>
	<view>
		<!-- 搜索 -->
		<view class="search">
			<keep-alive>
				<!-- <cool></cool> -->
				<u-search placeholder="搜索" shape="square" :animation="true" :clearabled="true" v-model="name" @focus="shows" @change="variation" @search="setsearch"></u-search>
			</keep-alive>
		</view>
		<!-- 搜索歌曲的名字 -->
		<view class="song" v-if="name != ''">
			<view v-for="(items, songs) in searchsong" :key="songs" @click="gosong(items)">
				<view class="song-name">{{ items.name }}</view>
			</view>
		</view>
		<view v-if="name == ''">
			<!-- 搜索历史 -->
			<view class="history">
				<view class="history-layout" v-if="searchlist">
					<view v-for="(item, i) in searchlist" :key="i">
						<p>
							{{ item }}
							<u-icon name="close-circle" color="#000" size="20" @click="del(i)"></u-icon>
						</p>
					</view>
					<view v-if="searchlist != ''"><u-icon name="trash-fill" color="#000" size="20" @click="clear"></u-icon></view>
				</view>
			</view>
			<!-- 热门搜索关键字 -->
			<view class="hotseach">
				<view class="hotseach-items">
					<view v-for="(items, index) in firstname" :key="index">
						<view class="hotseach-title" @click="hostname(items)">
							<view class="hotseach-index">{{ index + 1 }}</view>
							<view class="hotseach-name">{{ items.first }}</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 	歌单分类 -->
			<view class="tags">
				<view class="tags-title">
					<view v-for="(items, tags) in categorys" :key="items.name" @click="gocategory(items)">
						<view class="tags-name">
							<p>{{ items.createTime | showdata }}{{ items.name }}</p>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
import { search_host_list, search_list_all } from '@/network/https/search.js'; //网络请求
import { cat_egory } from '@/network/https/api.js'; //请求
import { debounce, throttle } from '../../utils/search.js'; //防抖节流
import { formatDate, dateFormat } from '../../utils/time.js'; //时间格式化
export default {
	data() {
		return {
			name: '', //歌曲名称
			firstname: '', //热门关键字
			categorys: '', //歌单分类
			searchlist: [], //搜索历史
			searchsong: '', //搜素歌曲的名字
			show: false //未知
		};
	},
	onBackPress(event) {},
	components: {},
	onLoad(val) {
		this.hostlist();
		this.songhost();
	},
	methods: {
		getname() {},
		//热门关键字
		async hostlist() {
			const { data: res } = await search_host_list();
			this.firstname = res.result.hots;
			this.searchsong = res.result.songs;
			console.log(res);
		},
		//歌单分离
		async songhost() {
			const { data: res } = await cat_egory();
			this.categorys = res.tags;
			console.log(res);
		},
		//搜素歌曲的名字
		async songlist() {
			if (this.name == '') {
				console.log('空值');
			} else {
				const parm = {
					keywords: this.name,
					limit: 10,
					offset: 0,
					type: 1
				};
				const { data: res } = await search_list_all(parm);
				this.searchsong = res.result.songs
				// console.log(res);
				// this.searchsong = res.result.songs.filter((items, index) => {
				// 	return items.name == this.name[0];
				// });
			}
		},
		shows() {
			this.gethostlist();
			this.songlist();
		},
		gosong(items) {
			this.name = items.name;
			uni.navigateTo({
				url: `/views/Search/searchresults?name=${items.name}`
			});
		},
		gocategory(items) {
			console.log(items.name, items.id);
		},
		hostname(items) {
			this.variation();
			this.name = items.first;
			uni.navigateTo({
				url: `/views/Search/searchresults?name=${items.first}`
			});
		},
		//节流函数
		variation: throttle(function() {
			this.songlist();
		}, 1000),
		//搜素历史
		gethostlist() {
			if (this.name == '') {
				uni.showToast({
					title: '值不能为空'
				});
			} else {
				if (!this.searchlist.includes(this.name)) {
					this.searchlist.unshift(this.name);
				} else {
					let index = this.searchlist.indexOf(this.name);
					this.searchlist.splice(index, 1);
				}
			}
		},
		setsearch() {
			if (this.name == '') {
				uni.showToast({
					title: '值不能为空'
				});
			} else {
				if (!this.searchlist.includes(this.name)) {
					this.searchlist.unshift(this.name);
					//clog
					uni.navigateTo({
						url: `/views/Search/searchresults?name=${this.name}`
					});
				} else {
					let index = this.searchlist.indexOf(this.name);
					this.searchlist.splice(index, 1);
				}
			}
			if (this.name != '') {
				uni.navigateTo({
					url: `/views/Search/searchresults?name=${this.name}`
				});
			}
		},
		//清除搜素历史字
		clear() {
			uni.removeStorage({
				key: 'historyname'
			}),
				(this.searchlist = []),
				uni.showToast({
					title: '清除'
				});
		},
		//删除单个搜索字
		del(i) {
			this.searchlist.splice(i, 1);
		}
	},
	//过滤时间格式
	filters: {
		showdata(val) {
			let date = new Date();
			return dateFormat('YYYY年-mm月', date);
			// return formatDate(val);
		}
	},
	computed: {},
	watch: {
		name() {}
	}
};
</script>

<style lang="scss" scoped>
.search {
}
.song {
	border-top: 9rpx #272822 solid;
	&-name {
		font-size: 27rpx;
		margin-left: 30rpx;
		margin-top: 20rpx;
	}
}
.history {
	&-layout {
		display: flex;
		overflow-x: scroll;
		p:nth-child(1) {
			font-size: 30rpx;
			display: flex;
			margin-left: 30rpx;
		}
	}
}
.hotseach {
	display: flex;
	justify-content: space-evenly;
	margin-top: 20rpx;
	&-items {
		display: flex;
		flex-wrap: wrap;
		width: 600rpx;
	}
	&-title {
		display: flex;
		align-items: center;
		margin-top: 20rpx;
		width: 300rpx;
	}
	&-index {
		font-weight: bold;
		margin-left: 20rpx;
		margin-right: 20rpx;
	}
	&-name {
		font-size: 30rpx;
	}
}
.tags {
	display: flex;
	justify-content: center;
	margin-top: 40rpx;
	margin-left: 5rpx;
	margin-right: 5rpx;
	&-title {
		display: flex;
		flex-wrap: wrap;
		flex: 1;
		justify-content: flex-start;
		align-items: center;
	}
	&-name {
		margin-left: 20rpx;
		display: flex;
		width: 350rpx;
		height: 120rpx;
		margin-top: 30rpx;
		align-items: center;
		color: #ffffff;
		background-image: -moz-linear-gradient(180deg, rgb(199, 255, 184), rgb(184, 255, 193));
		background-image: -webkit-linear-gradient(180deg, rgb(199, 255, 184), rgb(184, 255, 193));
		background-image: linear-gradient(180deg, rgb(199, 255, 184), rgb(184, 255, 193));
		border-radius: 20rpx;
		p:nth-child(1) {
			margin-left: 20rpx;
			font-weight: bold;
		}
	}
}
</style>
