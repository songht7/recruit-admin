<template>
	<view class="content">
		<view class="job-new-header">
			编辑职位
			<view class="job-new-ov">
				职位名称，职位类型和工作城市发布后不可修改
			</view>
		</view>
		<view class="job-new-form">
			<view class="uni-form-item uni-column job-new-row">
				<view class="title">招聘职位</view>
				<input class="uni-input" name="input" placeholder="请填写职位名称" v-model="formData['name']" />
			</view>
			<view class="uni-form-item uni-column job-new-row">
				<view class="title">职位类型</view>
				<input class="uni-input" name="input" placeholder="请填写职位类型" v-model="formData['type']" />
			</view>
			<view class="uni-form-item uni-row  job-new-row">
				<view class="lx-li">
					<view class="lx-name">经验要求</view>
					<picker @change="bindPickerChange" :value="age_min_index" :range="age_min" range-key="name">
						<view class="uni-input">{{age_min[age_min_index].name}}</view>
					</picker>
				</view>
				<view class="lx-li">
					<view class="lx-name">学历要求</view>
					<picker @change="bindEnumsChange" :value="enums_index" :range="enums" range-key="name">
						<view class="uni-input">{{enums[enums_index].name}}</view>
					</picker>
				</view>
				<view class="lx-li">
					<view class="lx-name">薪资范围</view>
					<picker @change="bindSalaryChange" :value="salary_index" :range="salary" range-key="name">
						<view class="uni-input">{{salary[salary_index].name}}</view>
					</picker>
				</view>
			</view>
			<view class="uni-form-item uni-column job-new-row">
				<view class="title">职位描述</view>
				<input class="uni-input" name="input" placeholder="职位描述" v-model="formData['overview']" />
			</view>
			<view class="uni-form-item uni-column job-new-row">
				<view class="title">工作地点</view>
				<input class="uni-input" name="input" v-model="area" placeholder="请选择工作地点" @focus="showMulLinkageTwoPicker" />
			</view>
			<view class="job-save-btn">
				<view :class="['job-save','job-share']" v-if="jobId" @click="jobShare">
					分享
				</view>
				<view :class="['job-save']" v-else @click="saveData">
					保存
				</view>
			</view>
		</view>
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
	export default {
		data() {
			return {
				title: '职位',
				jobId: "",
				age_min: [{
					name: '1年以下'
				}, {
					name: '1年'
				}, {
					name: '1-3年'
				}, {
					name: '3-5年'
				}, {
					name: '5年以上'
				}],
				age_min_index: 0,
				enums: [{
					name: '初中及以下'
				}, {
					name: '中专'
				}, {
					name: '高中'
				}, {
					name: '大专'
				}, {
					name: '本科'
				}, {
					name: '硕士及以上'
				}],
				enums_index: 0,
				salary: [{
					name: '初中及以下'
				}, {
					name: '中专'
				}, {
					name: '高中'
				}, {
					name: '大专'
				}, {
					name: '本科'
				}, {
					name: '硕士及以上'
				}],
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
					"salary": "",
					"enums": "",
					"province": "",
					"city": "",
					"district": "",
					"age_min": "",
					"responsibilities": "",
					"qualifications": ""
				},
				token: ""
			}
		},
		components: {
			mpvuePicker,
			mpvueCityPicker
		},
		onLoad(option) {
			var that = this;
			that.jobId = option.id ? option.id : "";
			if (that.jobId) {
				that.getData();
			}
			that.token = that.$store.state.UserInfo.token ? that.$store.state.UserInfo.token : "";
			console.log("onLoad")
		},
		onShow() {
			var that = this;
			that.$store.dispatch("cheack_user");
			that.$store.dispatch("menu_default");
			that.$store.dispatch("cheack_page", 0);
		},
		methods: {
			getData(type) {
				var that = this;
				var parm = {
					inter: "supportDtl",
					parm: `?id=${that.jobId}`
				};
				parm["fun"] = function(res) {
					console.log(res)
					if (res.success) {
						that.formData = res.data;
					} else {}
				};
				that.$store.dispatch("getData", parm)
			},
			saveData() {
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
					}
				];
				let _formData = that.formData;
				var checkRes = graceChecker.check(_formData, __rule);
				if (checkRes) {
					var parm = {
						inter: "supportDtl",
						method: "PUT",
						header: {
							token: that.token
						},
						data: _formData
					};
					parm["fun"] = function(res) {
						console.log(res)
						if (res.success) {
							uni.showToast({
								title: "发布成功",
								icon: "success",
								duration: 2000
							});
							setTimeout(() => {
								uni.navigateBack({});
							}, 2000);
						} else {
							uni.showToast({
								title: "发布失败",
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
			bindPickerChange: function(e) {
				//console.log('picker发送选择改变，携带值为：' + e.target.value + this.age_min[e.target.value]["name"])
				this.age_min_index = e.target.value;
				this.formData['age_min'] = this.age_min[e.target.value]["name"];
			},
			bindEnumsChange: function(e) {
				//console.log('picker发送选择改变，携带值为：' + e.target.value + this.enums[e.target.value]["name"])
				this.enums_index = e.target.value;
				this.formData['enums'] = this.enums[e.target.value]["name"];
			},
			bindSalaryChange: function(e) {
				//console.log('picker发送选择改变，携带值为：' + e.target.value + this.enums[e.target.value]["name"])
				this.salary_index = e.target.value;
				this.formData['salary'] = this.salary[e.target.value]["name"];
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
				this.formData['province'] = e.value[0];
				this.formData['city'] = e.value[1];
				this.area = e.label;
			}
		}
	}
</script>

<style scoped>
	.content {
		padding: 90rpx 30rpx 30rpx;
	}

	.job-new-header {
		font-size: 45rpx;
		color: #000000;
		padding-bottom: 30rpx;
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
		justify-content: space-between;
		align-items: center;
		align-content: center;
	}

	.job-save {
		width: 100%;
		line-height: 2.4;
		border-radius: 10rpx;
		background: #007AFF;
		color: #FFFFFF;
		font-size: 36rpx;
		text-align: center;
	}

	.job-del {
		background: #ea575a;
	}
</style>
