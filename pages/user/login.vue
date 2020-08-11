<template>
	<view class="user-login">
		<block>
			<view class="login-block">
				<view class="login-label"><text class="label">管理员登录</text></view>

				<view :class="['login-input',phoneErr?'phone-err':'']">
					<view class="input-left">
						<uni-icons type="p-shouji" size="18" color="#999"></uni-icons>
						<input class="user-input " type="number" maxlength="11" @focus="onFocus" placeholder="手机号" v-model="formData['phone']" />
					</view>
				</view>
				<view class="login-input">
					<view class="input-left">
						<uni-icons type="yanzhengma" size="18" color="#999"></uni-icons>
						<input class="user-input" type="text" maxlength="6" v-model="formData['code']" placeholder="验证码" />
					</view>
					<view :class="['get-code',seandCode?'loading':'']" @click="getCode">{{seandCode?count+'s 重新获取':'获取验证码'}}</view>
				</view>
				<view class="login-btns">
					<view class="login-btn" @click="login">登录</view>
				</view>
				<view class="" @click="$store.dispatch('logout')" style="padding: 30rpx;">清除缓存</view>
			</view>
		</block>
	</view>
</template>

<script>
	var graceChecker = require("@/common/graceChecker.js");
	const rule = [{
		name: "phone",
		checkType: "phoneno",
		checkRule: "",
		errorMsg: "请填写正确的手机号"
	}]
	export default {
		data() {
			return {
				title: '登录',
				pageIs: 'phone',
				disbale: true,
				phoneErr: false,
				loading: false,
				seandCode: false,
				count: 60,
				formData: {
					phone: '',
					code: ''
				},
				token: "",
				WeChatInfo: {},
				openid: ''
			}
		},
		onLoad() {
			var that = this;
		},
		onShow() {
			var that = this;
		},
		onReady() {
			var that = this;
			uni.getStorage({
				key: 'WeChatInfo',
				success: function(res) {
					console.log("onShow:", res.data)
					that.WeChatInfo = res.data;
					that.openid = res.data.wechat ? res.data.wechat.openid : res.data.userError.openid;
					if (that.$store.state.UserInfo.id && that.WeChatInfo.wechat.openid) {
						uni.redirectTo({
							url: "/pages/user/index"
						})
					}
				},
				fail() {
					if (that.$store.state.isWeixin) {
						that.$store.dispatch("wxXCXAuth")
					} else {
						that.WeChatInfo['token'] = that.$store.state.testToken;
						that.WeChatInfo['wechat'] = {
							'openid': that.$store.state.testOpenid
						};
					}
				}
			});
			that.$store.dispatch("cheack_user");
			uni.getStorage({
				key: 'UserInfo',
				success: function(res) {
					if (res.data.token) {
						that.token = res.data.token;
						that.login();
					}
				}
			});
		},
		methods: {
			login(val) {
				var that = this;
				var __rule = [...rule,
					{
						name: "code",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "验证码不能为空"
					}
				];
				let _formData = that.formData;
				var checkRes = graceChecker.check(_formData, __rule);
				//console.log(that.formData, checkRes, that.token);
				if (checkRes || that.token) {
					var _openid = that.openid;
					if (!that.$store.state.isWeixin) {
						_openid = that.$store.state.testOpenid;
					}
					var parm = {
						inter: "weChatAuth",
						parm: `?phone=${that.formData.phone}&phoneCode=${that.formData.code}&openid=${_openid}`
					};
					if (that.token) {
						parm['parm'] = '';
						parm['header'] = {
							token: that.token
						}
					}
					parm["fun"] = function(res) {
						if (res.success) {
							if (res.data.userError == false) {
								uni.showToast({
									title: "该账户未注册管理员",
									icon: "none"
								});
							} else if (res.data == "") {
								uni.showToast({
									title: "获取用户信息失败",
									icon: "none"
								});
							} else {
								that.$store.state.UserInfo = res.data;
								uni.setStorage({
									key: 'UserInfo',
									data: res.data,
									success: function() {
										uni.navigateTo({
											url: '/pages/user/index'
										});
									},
									fail: function(err) {
										uni.showToast({
											title: "获取用户信息失败",
											icon: "none"
										});
									}
								});
							}
						} else {
							if (res.data.userError == "errorSms") {
								uni.showToast({
									title: "验证码错误",
									icon: "none"
								});
							}
						}
					};
					that.$store.dispatch("getData", parm)
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			},
			onFocus() {
				var that = this;
				that.phoneErr = false;
				that.disbale = true;
			},
			getCode() {
				var that = this;
				if (that.seandCode) {
					return
				}
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 0
				})
				var __rule = rule;
				let _formData = that.formData;
				var checkRes = graceChecker.check(_formData, __rule);
				if (checkRes) {
					that.seandCode = true;
					that.countDown();
					console.log(that.formData)
					var parm = {
						inter: "sendSms",
						parm: `?phone=${that.formData.phone}`
					};
					parm["fun"] = function(res) {
						console.log(res)
						if (res.success) {

						}
					};
					that.$store.dispatch("getData", parm)
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			},
			countDown() {
				var that = this;
				const TIME_COUNT = 60;
				if (!this.timer) {
					this.count = TIME_COUNT;
					this.timer = setInterval(() => {
						if (this.count > 0 && this.count <= TIME_COUNT) {
							this.count--;
						} else {
							that.seandCode = false;
							clearInterval(this.timer);
							this.timer = null;
						}
					}, 1000);
				}
			}
		}
	}
</script>

<style scoped>
	.user-login {
		padding: 100rpx 30rpx 30rpx;
	}

	.login-block {
		display: flex;
		flex-direction: column;
	}

	.login-label {
		line-height: 1.6;
		padding-bottom: 20rpx;
		display: flex;
		flex-direction: column;
	}

	.label {
		font-size: 45rpx;
		color: #000;
	}

	.sub-label {
		font-size: 35rpx;
		color: #848383;
	}

	.login-input {
		padding: 10rpx;
		border-bottom: 2rpx solid #eee;
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		align-items: center;
		align-content: center;
		margin-bottom: 30rpx;
	}

	.input-left {
		display: flex;
		justify-content: flex-start;
		flex-direction: row;
		align-items: center;
		align-content: center;
	}

	.phone-err {
		border-color: #FF3333
	}

	.user-input {
		line-height: 2;
		font-size: 34rpx;
		color: #666;
		padding: 0 10rpx;
	}

	.login-btns {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.login-btn {
		width: 100%;
		background: #3a78ea;
		border-radius: 10rpx;
		line-height: 2;
		border: 2rpx solid #3a78ea;
		color: #FFFFFF;
		font-size: 40rpx;
		display: flex;
		align-items: center;
		align-content: center;
		justify-content: center;
	}

	.get-code {
		color: #007AFF;
	}

	.disbale-btn,
	.loading {
		color: #666;
	}
</style>
