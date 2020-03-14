<template>
	<view class="search-header" id="Header">
		<view class="title">{{title}}</view>
		<view class="search-box">
			<input class="search-input" v-show="searchShow" :focus="focus" @blur="onBlur" type="text" v-model="keyword"
			 placeholder="输入搜索关键词" placeholder-style="color:#fff;font-size:32rpx" confirm-type="search" />
			<uni-icons type="fangdajing1" :size="32" color="#fff" @click="searchBtn"></uni-icons>
		</view>
	</view>
</template>


<script>
	export default {
		name: 'JobList',
		props: {
			title: {
				type: String,
				default: ""
			},
			keyword: {
				type: String,
				default: ""
			}
		},
		data() {
			return {
				searchShow: false,
				focus: false
			};
		},
		computed: {},
		methods: {
			onBlur() {
				this.$emit("getData")
			},
			searchBtn() {
				var that = this;
				that.searchShow = !that.searchShow;
				that.focus = that.searchShow;
			}
		}
	}
</script>

<style scoped>
	#Header {
		background: #3a78ea;
		padding: 30rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		align-content: center;
		line-height: 2;
	}

	.title {
		font-size: 50rpx;
		color: #FFFFFF;
		width: 50%;
	}

	.search-box {
		flex: 1;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		align-content: center;
		flex-direction: row;
	}

	.search-input {
		line-height: 2;
		width: 100%;
		padding: 10rpx;
		border-radius: 5rpx;
		border-bottom: 2rpx solid #FFFFFF;
		color: #FFFFFF;
	}
</style>
