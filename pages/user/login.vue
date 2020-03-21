<template>
	<view class="user-login">
		<block>
			<view class="login-block">
				<view class="login-label"><text class="label">管理员登录</text></view>

				<view :class="['login-input',phoneErr?'phone-err':'']">
					<input class="user-input" type="number" maxlength="11" @focus="onFocus" @blur="checkPhone" placeholder="手机号"
					 v-model="formData['phone']" />
				</view>
				<view class="login-input">
					<input class="user-input" type="text" maxlength="6" v-model="formData['code']" placeholder="验证码" />
					<view :class="['get-code',disbale?'disbale-btn':'',loading?'loading':'']" @click="getCode">获取验证码</view>
				</view>
				<view class="login-btns">
					<view class="login-btn" @click="login">登录</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	var graceChecker = require("@/common/graceChecker.js");
	export default {
		data() {
			return {
				title: '登录',
				pageIs: 'phone',
				disbale: true,
				phoneErr: false,
				loading: false,
				formData: {
					phone: '',
					code: ''
				}
			}
		},
		onLoad() {

		},
		onShow() {
			var that = this;
		},
		methods: {
			login(val) {
				var that = this;
				console.log(that.formData)
			},
			checkPhone() {
				var that = this;
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 0
				})
				var rule = [{
					name: "phone",
					checkType: "phoneno",
					checkRule: "",
					errorMsg: "请填写正确的手机号"
				}, {
					name: "code",
					checkType: "notnull",
					checkRule: "",
					errorMsg: "验证码不能为空"
				}];
				let _formData = that.formData;
				var checkRes = graceChecker.check(_formData, rule);
				if (checkRes) {
					that.disbale = false;
					uni.navigateTo({
						url: '/pages/user/index'
					});
				} else {
					that.phoneErr = true;
					that.disbale = true;
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
				if (!that.disbale) {
					that.loading = true;
					console.log(that.formData)
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
		font-size: 70rpx;
		color: #000;
	}

	.sub-label {
		font-size: 42rpx;
		color: #848383;
	}

	.login-input {
		padding: 10rpx;
		border: 2rpx solid #eee;
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		align-items: center;
		align-content: center;
		margin-bottom: 30rpx;
		border-radius: 10rpx;
	}

	.phone-err {
		border-color: #FF3333
	}

	.user-input {
		line-height: 2;
		font-size: 40rpx;
		color: #666;
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
		font-size: 50rpx;
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
