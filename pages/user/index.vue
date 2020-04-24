<template>
	<view class="content">
		<view id="UserHeader">
			<view class="user-build">
				<uni-icons class="build-btn" type="tuichu" :size="24" color="#fff" @click="$store.dispatch('logout')"></uni-icons>
				<!-- <uni-icons class="build-btn" type="shezhi" :size="32" color="#fff" @click="userBuild"></uni-icons> -->
			</view>
			<view class="user-info">
				<view class="user-info">
					<view class="portrait">
						<image v-if="portrait" class="portrait-img" :src="portrait" mode="aspectFit"></image>
						<uni-icons v-else class="portrait-img" type="touxiang1" size="75" color="#fff"></uni-icons>
					</view>
					<view class="user-ovs">
						<view class="user-name">{{UserInfo.enterprise?UserInfo.enterprise.username:"游客"}}</view>
						<view class="user-sub-ov">
							<view class="reume-label">{{UserInfo.enterprise?UserInfo.enterprise.name:""}}</view>
						</view>
					</view>
				</view>
			</view>
			<!-- <view class="reume-count">
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
			</view> -->
		</view>
		<view class="job-box">
			<view class="j-left">在线职位</view>
			<view class="j-right" @click="jobAction">职位管理</view>
		</view>
		<!-- 	<tab-bar></tab-bar> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '我的',
				portrait: "",
				WeChatInfo: {},
				UserInfo: {}
			}
		},
		onLoad() {

		},
		onShow() {
			var that = this;
			//that.$store.dispatch("cheack_user");
			//that.$store.dispatch("cheack_page", 2);
			uni.getStorage({
				key: "WeChatInfo",
				success: function(res) {
					console.log(res.data)
					that.WeChatInfo = res.data.wechat;
					that.portrait = res.data.wechat.headimgurl;
				},
				fail() {}
			})
			uni.getStorage({
				key: "UserInfo",
				success: function(res) {
					that.UserInfo = res.data;
				},
				fail() {
					that.UserInfo = that.$store.state.UserInfo;
				}
			})
		},
		methods: {
			userBinding() {
				uni.navigateTo({
					url: '/pages/user/login'
				})
			},
			jobAction() {
				uni.navigateTo({
					url: '/pages/index/index'
				});
			}
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

	.job-box {
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		align-items: center;
		align-content: center;
		padding: 30rpx;
		line-height: 2;
	}

	.j-left {
		color: #595757;
		font-size: 36rpx;
	}

	.j-right {
		color: #aaaaaa;
		font-size: 30rpx;
	}
</style>
