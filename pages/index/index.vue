<template>
	<view class="content">
		<block>
			<view class="job-main">
				<block v-for="(j,k) in list" :key="k">
					<view class="job-li" @click="jobDetail(j.id)">
						<view>
							<view class="j-title">
								{{j.name}}
							</view>
							<view class="j-ov">
								{{j.district}} {{j.age_min}} {{j.type}}
							</view>
						</view>
						<!-- <view class="j-tag">
							免费试用中
						</view> -->
					</view>
				</block>
			</view>
		</block>
		<view class="job-btns">
			<view class="job-add job-share" @click="jobShare">
				分享职位
			</view>
			<view class="job-add" @click="addJob">
				发布新职位
			</view>
		</view>

		<view class="share-box-hide">
			<share ref="ShareBox" :shareConfig="shareConfig" @getShareImg="getShareImg"></share>
		</view>

		<view class="popMask" v-if="popMask" @click="hideMask"></view>

		<uni-popup :show="poptype === 'showNewImg'" position="full" mode="fixed" width='100' @hidePopup="togglePopup('')">
			<view id="Generated">
				<img class="imgs share-job-imgs" v-if="newImg" :src="newImg" alt="">

				<view class="share-sm">
					<view class="close-btn" @click="togglePopup('')">返回</view>长按图片保存后分享
				</view>
			</view>
		</uni-popup>
		<!-- <tab-bar></tab-bar> -->
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup.vue';
	import Share from '@/components/share.vue';
	export default {
		data() {
			return {
				title: '职位',
				list: [],
				UserInfo: {},
				enterprise_id: "",
				poptype: "",
				popMask: "",
				newImg: "",
				shareConfig: {},
			}
		},
		components: {
			uniPopup,
			Share
		},
		onLoad(option) {
			var that = this;
			that.$store.dispatch("cheack_user");
			if (that.$store.state.isWeixin) {
				that.enterprise_id = that.$store.state.UserInfo.enterprise_id;
			} else {
				that.enterprise_id = 15 //test
			}
			that.shareConfig = {
				...that.shareConfig,
				enterprise_id: that.enterprise_id,
				url: that.$store.state.webDomain + "/#/pages/company/index?enterprise_id=" + that.enterprise_id
			}
		},
		onShow() {
			var that = this;
			that.$store.dispatch("menu_default");
			that.$store.dispatch("cheack_page", 0);
			that.getData();
		},
		onReady() {
			var that = this;
			if (that.enterprise_id) {
				that.$refs.ShareBox.getBase64Image();
				that.$refs.ShareBox.setWebQRcode();
			}
		},
		methods: {
			getData(type) {
				var that = this;
				var parm = {
					inter: "supports",
					parm: `?enterprise_id=${that.enterprise_id}`,
					header: {
						token: that.$store.state.UserInfo.token
					}
				};
				parm["fun"] = function(res) {
					console.log(res)
					if (res.success) {
						that.list = res.data.list;
					} else {}
				};
				that.$store.dispatch("getData", parm)
			},
			jobDetail(id) {
				uni.navigateTo({
					url: `/pages/index/new?id=${id}`
				});
			},
			addJob() {
				uni.navigateTo({
					url: '/pages/index/new'
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
	.content {
		padding: 90rpx 30rpx 30rpx;
	}

	.job-main {
		padding-bottom: 60rpx;
	}

	.job-li {
		display: flex;
		justify-content: space-between;
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

	.job-btns {
		width: 90%;
		position: fixed;
		left: 5%;
		bottom: 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		align-content: center;
	}

	.job-add {
		width: 47%;
		line-height: 2;
		border-radius: 10rpx;
		background: #007AFF;
		color: #FFFFFF;
		font-size: 36rpx;
		text-align: center;
		border: 4rpx solid #007AFF
	}

	.job-share {
		background: none;
		color: #007AFF;
	}
</style>
