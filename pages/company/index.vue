<template>
	<view class="content">
		<block>
			<view id="Header">
				<view class="title">{{title}}</view>
				<view class="search-box">
					<input class="search-input" v-show="searchShow" :focus="focus" @blur="getData('keyword')" type="text" v-model="keyword"
					 placeholder="输入搜索关键词" placeholder-style="color:#fff;font-size:32rpx" confirm-type="search" />
					<uni-icons type="fangdajing1" :size="32" color="#fff" @click="searchBtn"></uni-icons>
				</view>
			</view>
		</block>
		<block>
			<filter-box></filter-box>
		</block>
		<block>
			<job-list :list="jobList"></job-list>
		</block>
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	import JobList from '@/components/job-list.vue'
	import FilterBox from '@/components/filter-box.vue'
	export default {
		data() {
			return {
				title: '职位',
				pageType: '',
				keyword: '',
				searchShow: false,
				focus: false,
				jobList: [{
					id: 1,
					name: "市场专员",
					price: "8-13K",
					overview: "上海XXX事务所",
					city: "上海",
					years: "1-3年",
					edu: "学历不限",
					comany_name: "上海XX中介公司"
				}]
			}
		},
		components: {
			JobList,
			FilterBox
		},
		onLoad(option) {
			var that = this;
			console.log("onLoad")
		},
		onShow() {
			var that = this;
			that.$store.dispatch("menu_default");
			//that.$store.dispatch("menu_type_1");
			that.$store.commit("set_company_name", "A公司");
			that.$store.dispatch("cheack_page", 1);
			that.title = "人力资源公司";
		},
		methods: {
			getData(type) {
				var that = this;
				console.log(that.keyword);
				if (type == 'keyword' && that.keyword == "") {
					that.searchShow = false;
					that.focus = false;
				}
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
