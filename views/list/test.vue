<template>
	<view>
		<!-- <view>这是列表页</view>
		<view class="box-item" v-for="item in list">{{ item }}</view>
		<button @click="pullDown">下拉刷新</button> -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: ['前端', 'php', 'UI', '测试', '大数据', '前端', 'php', 'UI', '测试', '大数据']
		};
	},
	onReachBottom() {
		console.log('页面触底了');
		this.list = [...this.list, ...['增加设计师', '增加UI', '增加前端', '增加增加测试', '增加大数据']];
	}
};
</script>

<style>
	.box-item {
		height: 100px;
		line-height: 100px;
	}
</style>
