<template>
	<view class="share-img-wrapper">
		<view class="uni-padding-wrap">
			<view class="portrait-box">
				<imageWrapper ref="imageWrapper" :data="data" :QRCodeImg="QRCodeImg" :shareConfig="shareConfig"></imageWrapper>
			</view>
			<view class="portrait-main">
				<view class="imgSelect">
					<!-- <img :src="QRCodeImg" class="ctgImg" alt=""> -->
					<view class="webQRCode">
						<canvas class="tki-qrcode-canvas" canvas-id="tki-qrcode-canvas" :style="{width:QRSize+'px',height:QRSize+'px'}" />
					</view>
					<!-- 	<view class="editBtns">
						<view class="editBtn" @click="toImage">完成</view>
					</view> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var html2canvas = require("@/common/html2canvas.min.js");
	import QRCode from "@/common/qrcode.js";
	var cQRcode;
	import imageWrapper from '@/components/image-wrapper.vue';
	import uniPopup from '@/components/uni-popup.vue';
	export default {
		props: {
			shareConfig: {
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {
				data: {},
				poptype: "",
				newImg: "",
				company: "", //公司
				watermark: "", //站点水印二维码、logo
				waterState: false, //是否有水印
				QRCodeImg: "", //
				QROpacity: 1, //水印透明度
				QRSize: 200, //水印大小
				wmSize: "1", //水印缩放大小
				QRColor: 0, //水印前景色
				qrtst: false, //水印测试
				base64Img: "",
				tempFilePath: "",
				cropFixed: true, //true false,
				cropWidth: 250,
				cropHeight: 250,
				imgBg: "/static/default.jpg",
			}
		},
		onLoad(option) {
			var that = this;
			// that.setWebQRcode();
		},
		onShow() {
			var that = this;
			// that.getBase64Image();
			// that.$store.dispatch("cheack_user");
		},
		onReady() {
			var that = this;
		},
		components: {
			imageWrapper,
			uniPopup
		},
		methods: {
			setWebQRcode() { //生成QR
				var that = this;
				// /pages/company/detail?id=54
				var webUrl = that.shareConfig.url;
				if (cQRcode) {
					cQRcode.clear()
				}
				cQRcode = new QRCode({
					context: that, // 上下文环境
					canvasId: "tki-qrcode-canvas", // canvas-id
					text: webUrl, // 生成内容
					correctLevel: 0, // 容错级别0、1、2、3，数字越大说明所需纠错级别越大
					background: `rgba(255, 255, 255,1)`, //背景色
					foreground: `rgba(0,0,0,1)`, //前景色
					size: that.QRSize, // 二维码大小
					cbResult: function(res) { // 生成二维码的回调
						that.QRCodeImg = res;
						that.data["QRCodeImg"] = res;
					},
				});
			},
			async toImage() {
				var that = this;
				if (that.loading) {
					return false
				};
				var obj = document.getElementById("ImageWrapper");
				var width = obj.offsetWidth;
				var height = obj.offsetHeight;
				that.loading = true;
				uni.showLoading({
					title: "正在生成..."
				})
				html2canvas(obj, {
					backgroundColor: "transparent",
					useCORS: true, //网络图片
					allowTaint: true,
					tainttest: true,
					width: width,
					height: height
				}).then((canvas) => {
					that.loading = false;
					uni.hideLoading()
					let dataURL = canvas.toDataURL("image/png");
					that.poptype = "showNewImg";
					that.$store.state.portrait = [{
						"path": dataURL,
						"imgType": 'base64Img',
						"upload_percent": 0
					}];
					that.$emit("getShareImg", dataURL)
					that.newImg = dataURL;
				});
			},
			getBase64Image(type, dataURL) {
				var that = this;
				uni.showToast({
					title: '',
					icon: 'loading',
					duration: 1500
				});
				var img = new Image();
				img.crossOrigin = 'Anonymous'; // 重点！设置image对象可跨域请求
				img.setAttribute('crossorigin', ' *');
				img.src = dataURL + "?t=" + new Date().getTime();
				img.onload = function() {
					var canvas = document.createElement("canvas");
					canvas.width = img.width;
					canvas.height = img.height;
					var ctx = canvas.getContext("2d");
					// ctx.setFillStyle('transparent');
					// ctx.fillRect(0, 0, img.width, img.height);
					// ctx.save()
					ctx.drawImage(img, 0, 0, img.width, img.height);
					var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
					var dataURL = canvas.toDataURL("image/" + ext);
					that.base64Img = dataURL;
					uni.hideToast();
					return dataURL;
				}

			},
			togglePopup(type) {
				var that = this;
				that.poptype = type;
			}
		}
	}
</script>

<style scoped>
	.webQRCode {
		position: absolute;
		width: 100upx;
		height: 100upx;
		opacity: 0;
		left: -10000px;
	}

	.content {
		height: 100%;
	}

	.uni-padding-wrap {
		height: 100%;
		padding: 0;
	}

	.portrait-box {
		display: flex;
		justify-content: center;
		flex-direction: row;
		align-content: center;
		align-items: center;
	}

	.imgs {
		width: 100%;
	}

	.imgSelect {
		width: 90%;
		padding: 10upx 5%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		flex-wrap: wrap;
		align-content: center;
		align-items: center;
	}

	.editBtns {
		width: 50%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-content: center;
		align-items: center;
	}

	.selBtn {
		font-size: 28upx;
		padding: 20upx;
		flex: 1;
		position: relative;
	}

	.selBtn::after {
		content: "";
		height: 50%;
		width: 1px;
		background: #e7e7e7;
		overflow: hidden;
		position: absolute;
		right: -1px;
	}

	.selBtnOn {
		background: #151c26;
		color: #f17f5a;
	}

	.selBtn:last-child()::after {
		width: 0;
		background: none;
	}

	.ctgBox {
		padding: 10upx 10upx 100upx;
		height: 400upx;
		overflow-y: auto;
	}

	.ctgCont {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		flex-wrap: wrap;
		align-content: center;
		align-items: center;
		padding-bottom: 10upx;
	}

	.ctgImgBlock {
		width: 20%;
		height: 100upx;
		display: flex;
		justify-content: center;
		align-content: center;
		align-items: center;
		padding-bottom: 10upx;
		position: relative;
	}



	.ctgImg {
		max-width: 70%;
		max-height: 100%;
	}

	.editBtn,
	.selPor {
		font-size: 28upx;
		display: flex;
		justify-content: center;
		flex-direction: row;
		align-content: center;
		align-items: center;
		color: #f17f5a;
		line-height: 1;
		border-radius: 10upx;
		padding: 15upx 0;
	}

	.editBtn {
		width: 48%;
		color: #FFFFFF;
		border-radius: 20upx;
		background-image: linear-gradient(to right, #E5A590, #f17f5a);
		background: #f17f5a;
	}
</style>
