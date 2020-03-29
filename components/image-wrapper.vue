<template>
	<view id="CanvaBox">
		<view id="ImageWrapper" class="imageWrapper">
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
		computed: {},
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
	.qr-ov{
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
</style>
