<template>
	<view class="content">
		<block>
			<view class="r-main">
				<block v-for="(j,k) in list" :key="k">
					<!-- 	<view class="r-tag">
						运营职位专员
					</view> -->
					<view class="r-li" @click="rDetail(j.user_id)">
						<view class="r-box">
							<view class="r-val">
								<view class="r-top">
									<view class="portrait">
										<image v-if="j.photo" class="portrait-img" :src="j.photo" mode="aspectFit"></image>
										<image v-else class="portrait-img" src="/static/logo.png" mode="aspectFit"></image>
										<view :class="['sex',j.sex==0?'sex-male':'sex-female']" v-if="j.sex"></view>
									</view>
									<view class="">
										<view class="j-title">
											{{j.name}} {{j.education?j.education:''}}
										</view>
										<view class="j-title">
											{{j.aName}}
										</view>
									</view>
								</view>
								<view class="j-ov">
									{{j.district}} {{j.age_min}} {{j.type}}
								</view>
								<view class="j-time">
									{{j.add_time.split(' ')[0]}}
								</view>
							</view>
						</view>
					</view>
				</block>
			</view>
		</block>
		<!-- <tab-bar></tab-bar> -->
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup.vue';
	export default {
		data() {
			return {
				title: '职位',
				list: [],
				UserInfo: {},
				user_id: "",
				portrait: "",
				enterprise_id: "",
				resumedTotal: 0,
			}
		},
		components: {
			uniPopup
		},
		onLoad(option) {
			var that = this;
			if (that.$store.state.isWeixin) {
				that.$store.dispatch("cheack_user");
				that.enterprise_id = that.$store.state.UserInfo.enterprise_id;
			} else {
				that.enterprise_id = 15 //test
			}
			uni.getStorage({
				key: "UserInfo",
				success: function(res) {},
				fail() {
					that.UserInfo = that.$store.state.UserInfo;
				}
			})
			that.getData('resumeds');
		},
		onShow() {
			var that = this;
			that.$store.dispatch("menu_default");
			that.$store.dispatch("cheack_page", 0);
			that.getData();
		},
		onReady() {
			var that = this;
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
					header: {
						token: _token
					}
				};
				switch (inter) {
					case 'supports':
						parm["parm"] = `?enterprise_id=${that.enterprise_id}`;
						parm["fun"] = function(res) {
							console.log(res)
							if (res.success) {
								that.jobTotal = res.data.total;
							} else {
								that.jobTotal = 0;
							}
						};
						break;
					case 'resumeds':
						parm["fun"] = function(res) {
							console.log(res)
							if (res.success) {
								that.list = res.data.list;
								that.resumedTotal = res.data.total;
							} else {
								that.resumedTotal = 0;
							}
						};
						break;
					default:
						break;
				}
				that.$store.dispatch("getData", parm)
			},
			rDetail(id) {
				uni.navigateTo({
					url: `/pages/resumeds/detail?user_id=${id}`
				});
			}
		}
	}
</script>

<style scoped>
	.r-main {}

	.r-tag {
		background-color: #007AFF;
		color: #FFFFFF;
		line-height: 2;
		font-size: 36upx;
		text-indent: 10%;
		width: 50%;
		border-radius: 0 50upx 50upx 0;
		margin: 20upx 0;
	}

	.r-li {
		background-color: #FFFFFF;
		border-bottom: 20upx solid #f5f5f6;
	}

	.r-box {
		margin: 0 5%;
		padding: 10upx 0;
		width: 90%;
	}

	.r-top {
		display: flex;
		justify-content: flex-start;
		flex-direction: row;
		align-items: center;
		align-content: center;
	}

	.portrait {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		position: relative;
		margin-right: 25upx;
	}

	.portrait-img {
		width: 100%;
		height: 100%;
	}

	.sex {
		position: absolute;
		z-index: 1;
		width: 40upx;
		height: 40upx;
		border-radius: 50%;
		background-color: #1677f2;
		top: 0;
		right: 0;
	}

	.sex::before {
		font-family: "uniicons" !important;
		content: "\e641";
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		align-content: center;
		color: #FFFFFF;
		font-size: 20upx;
	}

	.sex-female {
		background-color: #ea575a;
	}

	.sex-female::before {
		content: "\e633";
	}

	.j-ov {
		padding: 20upx 0;
		margin-bottom: 10upx;
		border-bottom: 2upx solid #eaeaea;
	}
</style>
