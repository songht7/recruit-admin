<script>
	var isWeixin = () => {
		return !!/micromessenger/i.test(navigator.userAgent.toLowerCase())
	}
	export default {
		onLaunch: function() {
			console.log('App Launch')
			this.$store.dispatch("getSystemInfo")
		},
		onShow: function() {
			console.log('App Show')
			var that = this;
			that.$store.dispatch("isWeixin");
			if (isWeixin()) {
				uni.getStorage({
					key: 'WeChatInfo',
					success(res) {
						let _deathline = res.data.deathline;
						let timestamp = Math.round(new Date().getTime() / 1000);
						if (!_deathline || timestamp >= _deathline) {
							that.$store.dispatch("logout")
							//that.$store.dispatch("wxXCXAuth")
						} else {
							that.$store.state.WeChatInfo = res.data;
						}
					},
					fail() {
						//that.$store.dispatch("logout")
						//that.$store.dispatch("wxXCXAuth")
					}
				})
			}
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*https://www.iconfont.cn
	*login weibo
	*/
	@import "./common/fonts/iconfont.css";
	/*每个页面公共css */
	@import "./common/uni.css";
</style>
