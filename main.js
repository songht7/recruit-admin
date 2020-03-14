import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
// 引入vuex 状态库
import store from "./store";
Vue.prototype.$store = store;
/*全局组件引用*/
import uniIcons from "./components/uni-icons/uni-icons.vue"
Vue.component("uni-icons", uniIcons)
import tabBar from "./components/tab-bar.vue"
Vue.component("tab-bar", tabBar)

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
