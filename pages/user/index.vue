<template>
	<view class="content">
		<view id="UserHeader">
			<view class="user-build">
				<uni-icons class="build-btn" type="shezhi" :size="32" color="#fff" @click="userBuild"></uni-icons>
			</view>
			<view class="user-info">
				<view class="user-info"  @click="">
					<view class="portrait">
						<image v-if="portrait" class="portrait-img" src="../../static/logo.png" mode="aspectFit"></image>
						<uni-icons v-else class="portrait-img" type="touxiang1" size="75"></uni-icons>
					</view>
					<view class="user-ovs">
						<view class="user-name">用户名</view>
						<view class="user-sub-ov">
							<view class="reume-label">HR</view>
						</view>
					</view>
				</view>
			</view>
			<view class="reume-count">
				<view class="count-block">
					<view class="count-numb">1</view>
					<view class="count-label">简历</view>
				</view>
				<view class="count-block">
					<view class="count-numb">1</view>
					<view class="count-label">今日新增</view>
				</view>
				<view class="count-block">
					<view class="count-numb">1</view>
					<view class="count-label">已导出</view>
				</view>
				<view class="count-block">
					<view class="count-numb">1</view>
					<view class="count-label">未导出</view>
				</view>
			</view>
		</view>
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '我的',
				portrait: !false
			}
		},
		onLoad() {

		},
		onShow() {
			var that = this;
			that.$store.dispatch("cheack_page", 2);
		},
		methods: {
			userBinding() {
				uni.navigateTo({
					url: '/pages/user/login'
				})
			},
			userBuild() {},
			resumeBtn() {}
		}
	}
</script>

<style scoped>
	#UserHeader {
		background: #3a78ea;
		padding: 30rpx;
	}

	.user-build {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
		align-content: center;
	}

	.user-info {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		align-content: center;
		padding: 30rpx 0;
	}

	.user-ovs {
		padding-left: 30rpx;
		font-size: 40rpx;
		color: #FFFFFF;
	}

	.reume-label {
		font-size: 30rpx;
	}

	.portrait {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		overflow: hidden;
	}

	.portrait-img {
		width: 100%;
		height: 100%;
	}

	.reume-count {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		align-content: center;
	}

	.count-block {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		align-content: center;
		color: #FFFFFF;
		font-size: 35rpx;
	}

	.count-numb {
		font-size: 50rpx;
	}
</style>
