<template>
	<view class="content">
		<block>
			<view class="job-main">
				<view class="job-li">
					<view>
						<view class="j-title">
							aaaaaa
						</view>
						<view class="j-ov">
							上海 南京西路 学历不限 应届生
						</view>
					</view>
					<view class="j-tag">
						免费试用中
					</view>
				</view>
			</view>
		</block>
		<view class="job-add" @click="addJob">
			发布新职位
		</view>
		<!-- <tab-bar></tab-bar> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '职位',
				jobList: []
			}
		},
		components: {},
		onLoad(option) {
			var that = this;
			console.log("onLoad")
		},
		onShow() {
			var that = this;
			that.$store.dispatch("cheack_user");
			that.$store.dispatch("menu_default");
			that.$store.dispatch("cheack_page", 0);
		},
		methods: {
			getData(type) {
				var that = this;
			}
		}
	}
</script>

<style scoped>
	.content {
		padding: 30rpx;
	}

	.job-main {
		padding-bottom: 60rpx;
	}

	.job-li {
		display: flex;
		justify-content: space-around;
		align-items: center;
		align-content: center;
		flex-direction: row;
		border-bottom: 1px solid #eaeaea;
		margin-bottom: 20rpx;
		padding-bottom: 20rpx;
	}

	.job-li::after {
		content: ">";
		color: #AAAAAA;
	}

	.j-title {
		font-size: 36rpx;
		color: #000000;
	}

	.j-ov {
		font-size: 30rpx;
		color: #aaaaaa;
	}

	.j-tag {
		color: #007AFF;
		padding-right: 10rpx;
	}

	.job-add {
		width: 90%;
		position: fixed;
		left: 5%;
		bottom: 30rpx;
		line-height: 2;
		border-radius: 10rpx;
		background: #007AFF;
		color: #FFFFFF;
		font-size: 36rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		align-content: center;
	}
</style>
