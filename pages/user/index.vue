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
						<image v-else class="portrait-img" src="/static/logo.png" mode="aspectFit"></image>
						<!-- <uni-icons v-else class="portrait-img" type="touxiang1" size="75" color="#fff"></uni-icons> -->
					</view>
					<view class="user-ovs">
						<view class="user-name">{{UserInfo.enterprise?UserInfo.enterprise.username:"游客"}}</view>
						<view class="user-sub-ov">
							<view class="reume-label">{{UserInfo.enterprise?UserInfo.enterprise.name:""}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="reume-count">
				<view class="count-block">
					<view class="count-numb">0</view>
					<view class="count-label">简历</view>
				</view>
				<view class="count-block">
					<view class="count-numb">0</view>
					<view class="count-label">今日新增</view>
				</view>
				<view class="count-block">
					<view class="count-numb">0</view>
					<view class="count-label">已导出</view>
				</view>
				<view class="count-block">
					<view class="count-numb">0</view>
					<view class="count-label">未导出</view>
				</view>
			</view>
		</view>
		<view class="job-box">
			<view class="j-left"><text class="j-total">{{jobTotal}}</text>个在线职位</view>
			<view class="j-right" @click="jobAction">职位管理</view>
		</view>
		<view class="job-block-row">
			<view class="j-block" @click="jobShare">职位分享<uni-icons type="fenxiang1" :size="18" color="#595656"></uni-icons>
			</view>
		</view>
		<!-- 	<tab-bar></tab-bar> -->
		<view class="share-box-hide">
			<share ref="ShareBox" :shareConfig="shareConfig" @getShareImg="getShareImg"></share>
		</view>

		<view class="popMask" v-if="popMask" @click="hideMask"></view>

		<uni-popup :show="poptype === 'showNewImg'" position="full" mode="fixed" width='100' @hidePopup="togglePopup('')">
			<view id="Generated">
				<img class="imgs share-job-imgs" v-if="newImg" :src="newImg" alt="">

				<view class="share-sm">
					<view class="close-btn" @click="togglePopup('')">返回</view> 长按图片保存后分享
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup.vue';
	import Share from '@/components/share.vue';
	export default {
		data() {
			return {
				title: '我的',
				enterprise_id: "",
				portrait: "",
				poptype: "",
				popMask: "",
				newImg: "",
				shareConfig: {},
				WeChatInfo: {},
				UserInfo: {},
				jobTotal: 0
			}
		},
		components: {
			uniPopup,
			Share
		},
		onLoad() {
			var that = this;
			that.getData('supports');
		},
		onShow() {
			var that = this;
			//that.$store.dispatch("cheack_user");
			//that.$store.dispatch("cheack_page", 2);
			uni.getStorage({
				key: "WeChatInfo",
				success: function(res) {
					console.log(res.data)
				},
				fail() {}
			})
			uni.getStorage({
				key: "UserInfo",
				success: function(res) {
					that.UserInfo = res.data;
					that.WeChatInfo = res.data.wechat;
					that.portrait = res.data.wechat.headimgurl;
					that.shareConfig = {
						...that.shareConfig,
						...res.data
					};
				},
				fail() {
					that.UserInfo = that.$store.state.UserInfo;
				}
			})
			if (that.$store.state.isWeixin) {
				that.enterprise_id = that.$store.state.UserInfo.enterprise_id;
			} else {
				that.enterprise_id = 15 //test
			}
			that.shareConfig = {
				...that.shareConfig,
				enterprise_id: "",
				url: that.$store.state.webDomain + "/#/pages/company/index?enterprise_id=" + that.enterprise_id
			}
		},
		onReady() {
			var that = this;
			if (that.enterprise_id) {
				that.$refs.ShareBox.getBase64Image();
				that.$refs.ShareBox.setWebQRcode();
			}
		},
		methods: {
			getData(inter, type) {
				var that = this;
				var _token = that.$store.state.UserInfo.token;
				if (!that.$store.state.isWeixin) {
					_token = that.$store.state.testToken
				}
				var parm = {
					inter: inter,
					parm: `?enterprise_id=${that.enterprise_id}`,
					header: {
						token: _token
					}
				};
				parm["fun"] = function(res) {
					console.log(res)
					if (res.success) {
						that.jobTotal = res.data.total;
					} else {
						that.jobTotal = 0;
					}
				};
				that.$store.dispatch("getData", parm)
			},
			userBinding() {
				uni.navigateTo({
					url: '/pages/user/login'
				})
			},
			jobAction() {
				uni.navigateTo({
					url: '/pages/index/index'
				});
			},
			togglePopup(type) {
				var that = this;
				that.poptype = type;
			},
			jobShare() {
				var that = this;
				uni.showLoading({
					title: '加载中'
				})
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 0
				})
				setTimeout(() => {
					uni.hideLoading()
					this.$refs.ShareBox.toImage()
				}, 1000)
			},
			hideMask() {
				this.popMask = ''
			},
			getShareImg(img) {
				var that = this;
				that.poptype = "showNewImg";
				//that.popMask = "popMask";//分享提示
				that.newImg = img;
			}
		}
	}
</script>

<style scoped>
	@import "../../common/share.css";

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

	.user-name {
		font-size: 36rpx;
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
		font-size: 32rpx;
	}

	.count-label {
		font-size: 30rpx;
	}

	.job-box {
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		align-items: center;
		align-content: center;
		padding: 30rpx 30rpx 15px;
		border-bottom: 1px solid #f3f3f1;
		line-height: 2;
	}

	.j-left {
		color: #595757;
		font-size: 30rpx;
	}

	.j-right {
		color: #aaaaaa;
		font-size: 28rpx;
	}

	.j-right::after {
		content: "\e600";
		font-family: "uniicons" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #AAAAAA;
	}

	.job-block-row {
		padding: 15px 30rpx 30rpx;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
	}

	.j-block {
		font-size: 30rpx;
		color: #595757;
		display: flex;
		justify-content: center;
		align-content: center;
		flex-direction: row;
		align-items: center;
	}

	.close-btn {
		padding: 0 50rpx;
		color: #666;
	}
	.j-total{
		font-size: 38rpx;
	}
</style>
