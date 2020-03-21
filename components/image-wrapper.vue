<template>
	<view id="CanvaBox">
		<view id="ImageWrapper" class="imageWrapper">
			<img :src="QRCodeImg" class="QRCodeImg" alt="">
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
	}
	.QRCodeImg{
		width: 100upx;
		height: 100upx;
	}
</style>
