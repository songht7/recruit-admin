<template>
	<view class="content">
		<view class="job-new-header">
			<view class="header-top">编辑职位<uni-icons class="share-btn" type="fenxiang" v-if="jobId" :size="24" color="#0a0708"
				 @click="jobShare"></uni-icons>
			</view>
			<view class="job-new-ov">
				职位名称，职位类型和工作城市发布后不可修改
			</view>
		</view>
		<view class="job-new-form">
			<view class="uni-form-item uni-column job-new-row">
				<view class="title">招聘职位</view>
				<input class="uni-input" name="input" :disabled="disabled" placeholder="请填写职位名称" v-model="formData['name']" />
			</view>
			<view class="uni-form-item uni-column job-new-row">
				<view class="title">职位类型</view>
				<picker @change="bindTypeChange" class="select-arr" :disabled="disabled" :value="job_type_index" :range="job_type"
				 range-key="name">
					<view class="uni-input">{{formData['type']}}</view>
				</picker>
				<!-- <input class="uni-input" name="input" :disabled="disabled" placeholder="请填写职位类型" v-model="formData['type']" /> -->
			</view>
			<view class="uni-form-item uni-row  job-new-row">
				<view class="lx-li">
					<view class="lx-name">经验要求</view>
					<picker @change="bindPickerChange" :value="age_min_index" :range="age_min" range-key="name">
						<view class="uni-input">{{formData['age_min']}}</view>
					</picker>
				</view>
				<view class="lx-li">
					<view class="lx-name">学历要求</view>
					<picker @change="bindEnumsChange" :value="education_index" :range="education" range-key="name">
						<view class="uni-input">{{formData['education']}}</view>
					</picker>
				</view>
				<view class="lx-li">
					<view class="lx-name">薪资范围</view>
					<picker @change="bindSalaryChange" :value="salary_index" :range="salary" range-key="name">
						<view class="uni-input">{{formData['salary']}}</view>
					</picker>
				</view>
			</view>
			<view class="uni-form-item uni-column job-new-row">
				<view class="title">职位描述</view>
				<textarea class="uni-input" v-model="formData['overview']" auto-height placeholder="" />
				<!-- <input class="uni-input" name="input" placeholder="职位描述" v-model="formData['overview']" /> -->
			</view>
			<view class="uni-form-item uni-column job-new-row">
				<view class="title">工作地点</view>
				<input class="uni-input select-arr" name="input" :disabled="disabled" v-model="area" placeholder="请选择工作地点" @focus="showMulLinkageTwoPicker" />
			</view>
			<view class="job-save-btn">
				<view :class="['job-btns','job-save']" @click="saveData">
					保存
				</view>
				<view :class="['job-btns','job-save','job-delt']" v-if="jobId" @click="saveData('delete')">
					删除
				</view>
				<!-- 	<view :class="['job-btns','job-save','job-share']" v-if="jobId" @click="jobShare">
					分享
				</view> -->
			</view>
		</view>
		<!--  -->
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
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
		 @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
</template>

<script>
	// https://github.com/zhetengbiji/mpvue-picker
	import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
	// https://github.com/zhetengbiji/mpvue-citypicker
	import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
	import cityData from '@/common/city.data.js';
	var graceChecker = require("@/common/graceChecker.js");
	import uniPopup from '@/components/uni-popup.vue';
	import Share from '@/components/share.vue';
	export default {
		data() {
			return {
				title: '职位',
				jobId: "",
				poptype: "",
				popMask: "",
				newImg: "",
				shareConfig: {},
				UserInfo: {},
				WeChatInfo: {},
				disabled: false,
				job_type: ['不限'],
				job_type_index: 0,
				age_min: ['1年以下'],
				age_min_index: 0,
				education: ['初中及以下', '中专', '高中', '大专', '本科', '硕士及以上'],
				education_index: 0,
				salary: ['面议'],
				salary_index: 0,
				mulLinkageTwoPicker: cityData,
				cityPickerValueDefault: [0, 0, 1],
				themeColor: '#007AFF',
				pickerText: '',
				mode: '',
				deepLength: 1,
				pickerValueDefault: [0],
				pickerValueArray: [],
				area: "",
				formData: {
					"name": "",
					"overview": "",
					"type": "",
					"salary": "3000-5000",
					"education": "初中及以下",
					"province": "310000",
					"city": "310109",
					"district": "",
					"age_min": "1年以下",
					"responsibilities": "",
					"qualifications": ""
				},
				token: "",
				screening: {},
				region: {}
			}
		},
		components: {
			mpvuePicker,
			mpvueCityPicker,
			uniPopup,
			Share
		},
		onLoad(option) {
			var that = this;
			that.jobId = option.id ? option.id : "";
			that.getData("getRegion"); //获取中国地区的接口
			that.getData("screening"); //筛选条件列表
			if (that.jobId) {
				that.shareConfig = {
					...that.shareConfig,
					url: that.$store.state.webDomain + "/#/pages/company/detail?id=" + that.jobId
				}
				that.getData("supportDtl");
			}
			that.token = that.$store.state.UserInfo.token ? that.$store.state.UserInfo.token : "";
			if (!that.$store.state.isWeixin) {
				that.token = that.$store.state.testToken
			}
			uni.getStorage({
				key: 'WeChatInfo',
				success: function(res) {
					that.shareConfig = {
						...that.shareConfig,
						...res.data
					};
					that.WeChatInfo = res.data;
				}
			});
			uni.getStorage({
				key: 'UserInfo',
				success: function(res) {
					that.shareConfig = {
						...that.shareConfig,
						...res.data
					};
					that.UserInfo = res.data;
				}
			});
			console.log("onLoad")
		},
		onShow() {
			var that = this;
			that.$store.dispatch("cheack_user");
			that.$store.dispatch("menu_default");
			that.$store.dispatch("cheack_page", 0);
		},
		onReady() {
			var that = this;
			if (that.jobId) {
				that.$refs.ShareBox.getBase64Image();
				that.$refs.ShareBox.setWebQRcode();
			}
		},
		methods: {
			getData(inter) {
				var that = this;
				var _token = that.UserInfo.token ? that.UserInfo.token : "";
				if (!that.$store.state.isWeixin) {
					_token = that.$store.state.testToken
				}
				var parm = {
					inter: inter,
					parm: `?id=${that.jobId}`,
					header: {
						token: _token
					}
				};
				parm["fun"] = function(res) {
					console.log(res)
					if (res.success) {

						// that.getData("supportDtl");
						// that.getData("screening");
						// that.getData("getRegion");
						switch (inter) {
							case 'supportDtl':
								that.shareConfig = {
									...that.shareConfig,
									...res.data
								};
								that.disabled = true;
								that.formData = res.data;
								that.area = `${res.data.province}-${res.data.city}`;
								break;
							case 'screening':
								let list = res.data.list;
								that.job_type = list[1]['data'];
								that.age_min = list[2]['data'];
								that.salary = list[3]['data'];
								that.formData['type'] = list[1]['data'][0];
								that.formData['age_min'] = list[2]['data'][0];
								that.formData['salary'] = list[3]['data'][0];
								that.screening = res.data.list ? res.data.list : {};
								break;
							case 'region':
								that.region = res.data.list ? res.data.list : {};
								break;
							default:
								break;
						}
					} else {}
				};
				that.$store.dispatch("getData", parm)
			},
			saveData(type = '') {
				var that = this;
				var __rule = [{
						name: "name",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "招聘职位不能为空"
					},
					{
						name: "type",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "职位类型不能为空"
					},
					{
						name: "overview",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "职位描述不能为空"
					},
					{
						name: "overview",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "职位描述不能为空"
					}
				];
				let _formData = that.formData;
				console.log("_formData：", _formData)
				var checkRes = graceChecker.check(_formData, __rule);
				if (checkRes) {
					if (type == 'delete') {
						_formData['delete'] = 1;
					}
					var parm = {
						inter: "supportDtl",
						method: "PUT",
						header: {
							token: that.token
						},
						data: _formData
					};
					if (that.jobId) {
						parm['parm'] = `?id=${that.jobId}`
					}
					console.log(parm)
					parm["fun"] = function(res) {
						console.log(res)
						if (res.success) {
							var _tip = type == 'delete' ? "删除成功" : "发布成功";
							uni.showToast({
								title: _tip,
								icon: "success",
								duration: 2000
							});
							setTimeout(() => {
								uni.navigateBack({});
							}, 2000);
						} else {
							var _tip = type == 'delete' ? "删除失败" : "发布失败";
							uni.showToast({
								title: _tip,
								icon: "none"
							});
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
			bindTypeChange: function(e) {
				//console.log('picker发送选择改变，携带值为：' + e.target.value + this.age_min[e.target.value]["name"])
				this.job_type_index = e.target.value;
				this.formData['type'] = this.job_type[e.target.value];
			},
			bindPickerChange: function(e) {
				//console.log('picker发送选择改变，携带值为：' + e.target.value + this.age_min[e.target.value]["name"])
				this.age_min_index = e.target.value;
				this.formData['age_min'] = this.age_min[e.target.value];
			},
			bindEnumsChange: function(e) {
				//console.log('picker发送选择改变，携带值为：' + e.target.value + this.enums[e.target.value]["name"])
				this.education_index = e.target.value;
				this.formData['education'] = this.education[e.target.value];
			},
			bindSalaryChange: function(e) {
				//console.log('picker发送选择改变，携带值为：' + e.target.value + this.enums[e.target.value]["name"])
				this.salary_index = e.target.value;
				this.formData['salary'] = this.salary[e.target.value];
			},
			showMulLinkageTwoPicker() {
				this.pickerValueArray = this.mulLinkageTwoPicker
				this.mode = 'multiLinkageSelector'
				this.deepLength = 2
				this.pickerValueDefault = [8, 5]
				this.$refs.mpvuePicker.show()
			},
			onCancel(e) {
				console.log(e)
			},
			onConfirm(e) {
				this.pickerText = JSON.stringify(e)
				console.log(e)
				let _area = e.label.split("-");
				this.formData['province'] = e.value[0];
				this.formData['city'] = e.value[1];
				this.formData['district'] = e.value[2] ? e.value[2] : "";
				this.area = e.label;
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

	.job-new-header {
		padding-bottom: 30rpx;
	}

	.header-top {
		font-size: 45rpx;
		color: #000000;
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		align-items: center;
		align-content: center;
	}

	.job-new-row {
		margin-bottom: 10rpx;
		padding-bottom: 10rpx;
		border-bottom: 1px solid #eaeaea;
	}

	.job-new-row .uni-input {
		color: #959393;
	}

	.job-new-ov {
		font-size: 30rpx;
	}

	.lx-li {
		width: 33.3%;
		text-align: center;
	}

	.lx-name {
		color: #000;
		font-size: 32rpx;
	}

	.job-save-btn {
		width: 90%;
		position: fixed;
		left: 5%;
		bottom: 30rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		align-content: center;
	}

	.job-save {
		width: 100%;
		line-height: 2.4;
		border-radius: 10rpx;
		margin-bottom: 10rpx;
		background: #007AFF;
		color: #FFFFFF;
		font-size: 36rpx;
		text-align: center;
	}

	.job-delt {
		background: #ea575a;
	}

	.job-del {
		background: #ea575a;
	}

	.close-btn {
		padding: 0 50rpx;
		color: #666;
	}

	.select-arr {
		display: flex;
		flex-direction: row;
		align-items: center;
		align-content: center;
		justify-content: space-between;
	}

	.select-arr::after {
		content: "\e600";
		font-family: "uniicons" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #AAAAAA;
	}
</style>
