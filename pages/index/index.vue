<template>
	<view>
		<view>
			<!-- 搜索 -->
			<search></search>
			<!-- 轮播 -->
			<headbanners :banners="bannersimg" ref="banners"></headbanners>
			<!-- 图标 -->
			<headicon :icons="icons"></headicon>
			<!-- 推荐歌单 -->
			<pushtolist :songlist="songs"></pushtolist>
			<!-- -->
			<!-- 数字专辑 -->
			<listmusic :newmusic="newmusic" :numlist="numlist" :newablum="newsablum"></listmusic>
			<RadioStation :RadioStation="RadioStation" ></RadioStation>
			<!-- 播放控件 -->
			<palyers></palyers>
		</view>
	</view>
</template>
<script>
import search from '@/components/head/search.vue'; //搜索
import headbanners from '@/components/common/banner.vue'; //轮播图
import headicon from '@/components/head/icon'; //iocn图标
import pushtolist from '@/components/common/song-list.vue'; //推荐歌单
import listmusic from '@/components/common/album-list.vue'; //
import palyers from '@/components/common/palyer.vue'; //
import RadioStation from '@/components/common/RadioStation.vue';
import { get_banners, get_icon, push_list, new_music, new_est, num_list, song_category } from '@/network/https/api.js'; //网咯请求
export default {
	data() {
		return {
			bannersimg: [], //轮播图
			icons: [], //图标
			songs: [], //推荐歌单
			newmusic: '', //新歌曲
			newsablum: [], //新碟
			numlist: '', //数字专辑
			RadioStation: [],
		};
	},
	onLoad() {
		this.banners(); //轮播
		this.iocn(); //图标
		this.getpush(); //推荐歌单
		this.newmusics();
		this.album();
		this.num();
		this.hostcarg();
	},
	created() {},
	components: {
		search, //搜索栏目
		headicon, //图标
		headbanners, //轮播
		pushtolist, //推荐歌单
		listmusic, //新歌//新碟//数字专辑
		RadioStation,
		palyers //播放控件
	},
	methods: {
		tab(val) {
			console.log('sdss', val);
		},
		//轮播
		async banners() {
			const { data: res } = await get_banners();
			this.bannersimg = res.banners;
			// forEach方法
			this.bannersimg.forEach(item => (item.image = item.imageUrl));
			console.log(this.bannersimg);
		},
		//图标
		async iocn() {
			const { data: res } = await get_icon();
			this.icons = res.data;
			console.log(res.data);
		},
		//推荐歌单
		async getpush() {
			const limit = 40;
			const { data: res } = await push_list(limit);
			this.songs = res.result;
			console.log(this.songs);
		},
		//新歌
		async newmusics() {
			const { data: res } = await new_music();
			this.newmusic = res.data.slice(0, 20);
			console.log('新歌', res);
		},
		//新碟
		async album() {
			// limit,offset,area,type
			const param = {
				limit: 30,
				offset: 1,
				area: 'ZH',
				type: 'hot'
			};
			const { data: res } = await new_est(param.limit, param.offset, param.area, param.type);
			this.newsablum = res.albums;
			console.log('新碟', res);
		},
		//数字专辑
		async num() {
			const numlist = {
				limit: 30,
				offset: 30
			};
			const { data: res } = await num_list(numlist.limit, numlist.offset);
			this.numlist = res.products;
			console.log('数字', res);
		},
		//推荐电台
		async hostcarg() {
			const { data: res } = await song_category();
			this.RadioStation = res.result;
			console.log('电台', res);
		}
	}
};
</script>
