<template>
	<view class="job-list">
		<block v-for="(obj,k) in list" :key="k">
			<view class="job-block">
				<view class="job-main" @click="onClick(obj.id)">
					<view class="job-top">
						<view class="job-name">{{obj.name}}</view>
						<view class="job-price">{{obj.price}}</view>
					</view>
					<view class="job-middle">
						<view class="job-overview">{{obj.overview}}</view>
						<view class="job-tags">
							<view class="tag">{{obj.city}}</view>
							<view class="tag">{{obj.years}}</view>
							<view class="tag">{{obj.edu}}</view>
						</view>
					</view>
					<view class="job-bottom">
						<view class="job-comany-name">{{obj.comany_name}}</view>
					</view>
				</view>
			</view>
		</block>
	</view>
</template>


<script>
	export default {
		name: 'JobList',
		props: {
			data: {
				type: Object,
				default: function(e) {
					return {}
				}
			},
			list: {
				type: Array,
				default () {
					return []
				}
			}
		},
		data() {
			return {};
		},
		computed: {},
		methods: {
			onClick(id){
				uni.navigateTo({
				    url: `/pages/company/detail?id=${id}`
				});
			}
		}
	}
</script>

<style>
	.job-block {
		border-bottom: 20rpx solid #eeeeee;
	}

	/* .job-block:last-child {
		border-bottom: none;
	} */

	.job-main {
		padding: 30rpx;
		line-height: 1.4;
	}

	.job-top {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		align-content: center;
	}

	.job-name {
		font-size: 50rpx;
		color: #000;
	}

	.job-price {
		font-size: 42rpx;
		color: #3b78ea;
	}

	.job-overview {
		font-size: 38rpx;
	}

	.job-tags {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		align-content: center;
	}

	.tag {
		background: #f7f7f7;
		font-size: 35rpx;
		padding: 2rpx 10rpx;
		margin-right: 20rpx;
	}

	.job-comany-name {
		font-size: 38rpx;
		color: #3b78ea;
	}
</style>
