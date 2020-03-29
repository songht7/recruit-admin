<template>
	<view id="CanvaBox">
		<view id="ImageWrapper" class="imageWrapper">
			<view class="share-job-info">
				<view class="jobview jobUser">
					<view class="portrait">
						<image v-if="shareConfig.userError" class="portrait-img" :src="shareConfig.userError.headimgurl" mode="aspectFit"></image>
						<uni-icons v-else class="portrait-img" type="touxiang1" size="60" color="#fff"></uni-icons>
					</view>
					<view class="ju-name">{{shareConfig.userError?shareConfig.userError.nickname:"招聘专员"}}</view>
				</view>
				<view class="jobview">
					<view class="j-t">
						正在直聘
					</view>
					<view class="j-n">{{shareConfig.name}}/{{shareConfig.type}}</view>
				</view>
				<view class="jobcomp">
					<view class="c-n">
						{{shareConfig.enterprise?shareConfig.enterprise.name:""}} 期待你的加入
					</view>
					<view class="c-t">{{time}}</view>
				</view>
			</view>
			<view class="share-bottom">
				<img :src="QRCodeImg" class="QRCodeImg" alt="">
				<view class="share-ovs">
					<view class="cp-ov">ZHIZHAO</view>
					<view class="qr-ov">长按识别二维码</view>
					<view class="sh-ov">进入职照查看职位详情</view>
				</view>
				<view class="share-company">职照</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'imageWrapper',
		props: {
			shareConfig: {
				type: Object,
				default: () => {}
			},
			maskImg: Array,
			slots: {
				type: String,
				default: ''
			},
			QRCodeImg: {
				type: String,
				default: ''
			},
			data: {
				type: Object,
				default () {
					return {};
				}
			}
		},
		data() {
			return {};
		},
		onShow() {},
		computed: {
			time: () => {
				return new Date().toLocaleDateString();
			}
		},
		methods: {
			touch(k) {
				console.log(k)
				var that = this;
			}
		}
	}
</script>


<style>
	#CanvaBox {
		height: 1200upx;
		width: 600upx;
		border: 1px solid #eee;
	}

	#ImageWrapper {
		height: 100%;
		width: 100%;
		background: url(../static/share-bg.jpg) 50% 50% no-repeat #000;
		background-size: cover;
		display: flex;
		justify-content: flex-start;
		flex-direction: column;
		align-items: center;
		align-content: center;
		position: relative;
	}

	.share-bottom {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 90%;
		height: 20%;
		background: #FFFFFF;
		padding: 30rpx 5%;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
		align-content: center;
	}

	.QRCodeImg {
		width: 140upx;
		height: 140upx;
	}

	.share-ovs {
		padding-left: 20rpx;
	}

	.cp-ov,
	.qr-ov {
		color: #007AFF;
		font-size: 26rpx;
	}

	.qr-ov {
		border: 1px solid #007AFF;
		display: inline;
	}

	.sh-ov {
		font-size: 24rpx;
	}

	.share-company {
		width: 100%;
		padding: 10rpx 0;
		text-align: center;
		color: #007AFF;
	}

	.share-job-info {
		width: 90%;
		padding: 5%;
		color: #FFFFFF;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		align-content: space-around;
		flex-direction: column;
		height: 65%;
	}

	.jobUser {
		display: flex;
		justify-content: flex-start;
		flex-direction: row;
		align-items: center;
		align-content: center;
	}

	.ju-name {
		font-size: 32rpx;
		padding-left: 20rpx;
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

	.jobview {
		padding: 30rpx 0;
	}

	.j-t {
		font-size: 32rpx;
	}

	.j-n {
		font-size: 45rpx;
	}
</style>
