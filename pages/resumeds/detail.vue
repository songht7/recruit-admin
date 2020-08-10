<template>
	<view class="content">
		<view class="job-header">
			<view class="job-val">
				<view class="job-title">{{detail.name}}</view>
				<view class="job-price">{{detail.salary}}</view>
			</view>
			<view class="job-tags">
				<!-- <view class="tag email">{{detail.email}}</view> -->
				<view class="tag boshimao1" v-if="detail.education">{{detail.education}}</view>
				<view class="tag shengri">{{detail.brithday}}</view>
			</view>
		</view>
		<view class="manager">
			<view class="portrait">
				<image class="portrait-img" :src="portrait?portrait:'../../static/logo.png'" mode="aspectFit"></image>
			</view>
			<view class="manager-info">
				<view class="manager-name">{{detail.eName}}</view>
				<!-- <view class="manager-post">SIXECO HR</view> -->
			</view>
		</view>
		<view class="detail">
			<rich-text class="job-detail" :nodes="detail.about_self?detail.about_self:''"></rich-text>
		</view>
		<view class="dtl-block" v-if="detail.company">
			<view class="dtl-title">工作经历</view>
			<block v-for="(comp,k) in detail.company" v-if="comp.company" :key="k">
				<view class="dtl-list">
					<view class="dtl-tl">
						<view class="name">{{comp.company}}</view>
						<view class="time">
							{{comp.start_time?comp.start_time.split(' ')[0]:''}} ~ {{comp.edit_time?comp.edit_time.split(' ')[0]:''}}
						</view>
					</view>
					<view class="dtl-ov">
						{{comp.job}}
					</view>
					<view class="dtl-mi">
						{{comp.infomation}}
					</view>
				</view>
			</block>
		</view>
		<view class="dtl-block" v-if="detail.project">
			<view class="dtl-title">项目经历</view>
			<block v-for="(pro,k) in detail.project" v-if="pro.name" :key="k">
				<view class="dtl-list">
					<view class="dtl-tl">
						<view class="name">{{pro.name}}</view>
						<view class="time">
							{{pro.start_time?pro.start_time.split(' ')[0]:''}} ~ {{pro.edit_time?pro.edit_time.split(' ')[0]:''}}
						</view>
					</view>
					<!-- <view class="dtl-ov">
						{{pro.job}}
					</view> -->
					<view class="dtl-mi">
						{{pro.overview}}
					</view>
				</view>
			</block>
		</view>
		<view class="dtl-block" v-if="detail.school">
			<view class="dtl-title">教育经历</view>
			<block v-for="(sch,k) in detail.school" v-if="sch.school" :key="k">
				<view class="dtl-list">
					<view class="dtl-tl">
						<view class="name">{{sch.school}}</view>
						<view class="time">
							{{sch.start_time?sch.start_time.split(' ')[0]:''}} ~ {{sch.edit_time?sch.edit_time.split(' ')[0]:''}}
						</view>
					</view>
					<view class="dtl-ov">
						{{sch.education}}
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '策划',
				user_id: "",
				detail: [],
				portrait: false,
				data: "<p>detail</p>",
				reumeIsSend: false
			}
		},
		components: {},
		onLoad(option) {
			var that = this;
			that.user_id = option.user_id ? option.user_id : "";
			if (that.user_id) {
				that.getData();
			}
		},
		onShow() {},
		methods: {
			getData() {
				var that = this;
				var _token = that.$store.state.testToken;
				if (that.$store.state.isWeixin) {
					_token = that.$store.state.weChatAuthInfo.token;
				}
				var parm = {
					inter: "resumedDtl",
					parm: `?user_id=${that.user_id}`,
					header: {
						token: _token
					}
				};
				parm["fun"] = function(res) {
					console.log(res)
					if (res.success) {
						that.detail = res.data;
						that.reumeIsSend = res.data.resume_article ? true : false;
					}
				};
				that.$store.dispatch("getData", parm)
			},
			reumeSend() {
				var that = this;
				if (that.reumeIsSend) {
					return
				}
				that.loading = true;
				var _token = that.$store.state.testToken;
				if (that.$store.state.isWeixin) {
					_token = that.$store.state.weChatAuthInfo.token;
				}
				var parm = {
					inter: "resume",
					method: "POST",
					data: {
						article_id: that.id
					},
					header: {
						token: _token
					}
				};
				console.log("login:", parm)
				parm["fun"] = function(res) {
					console.log(res)
					that.loading = false;
					if (res.success) {
						uni.showToast({
							title: "简历已投递",
							icon: "none"
						});
						that.reumeIsSend = true;
					} else {
						that.reumeIsSend = false;
						uni.showToast({
							title: res.msg,
							icon: "none"
						});
					}
				};
				that.$store.dispatch("getData", parm)
			}
		}
	}
</script>

<style scoped>
	.content {
		padding: 30rpx;
	}

	.job-header {
		width: 100%;
		padding: 20rpx 0 30rpx;
		border-bottom: 2rpx solid #e2e2e2;
		margin-bottom: 30rpx;
	}

	.job-val {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		align-content: center;
		line-height: 2;
	}

	.job-title {
		font-size: 50rpx;
		color: #000;
	}

	.job-price {
		font-size: 32rpx;
		color: #3b78ea;
	}

	.job-tags {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-content: center;
		align-items: center;
	}

	.tag {
		padding: 2rpx;
		margin-right: 20rpx;
		font-size: 32rpx;
		color: #000000;
	}

	.tag:before {
		font-family: "uniicons" !important;
		content: "\e6bd";
		padding-right: 4rpx;
		font-size: inherit;
		color: inherit;
	}

	.years:before {
		content: "\e702";
	}

	.shengri:before {
		content: "\e622";
	}

	.edu:before {
		content: "\e6bd";
	}

	.email:before {
		content: "\e61f";
	}

	.manager {
		padding: 0 0 30rpx;
		border-bottom: 2rpx solid #e2e2e2;
		margin-bottom: 30rpx;
		display: flex;
		flex-direction: row;
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

	.manager-info {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		align-content: center;
		line-height: 1.4;
		padding-left: 40rpx;
	}

	.manager-name {
		font-size: 34rpx;
		color: #000;
	}

	.manager-post {
		font-size: 40rpx;
	}

	.detail {
		padding-bottom: 50rpx;
	}

	.reume-send {
		background-color: #727272;
		border-color: #727272;
		color: #fff;
	}

	.dtl-block {
		border-bottom: 2upx solid #e8e6e2;
		padding: 20upx 0;
	}

	.dtl-block:last-child {
		border-bottom: none;
	}

	.dtl-list {
		border-bottom: 2upx dashed #e8e6e2;
	}

	.dtl-list:last-child {
		border-bottom: none;
	}

	.dtl-title {
		font-size: 48upx;
		color: #1677f2;
	}

	.dtl-tl {
		display: flex;
		justify-content: space-between;
		flex-direction: row;
	}

	.dtl-tl .name {
		font-size: 36upx;
		color: #000000;
	}

	.dtl-tl .time {
		font-size: 28upx;
		color: #aaaaaa;
	}
</style>
