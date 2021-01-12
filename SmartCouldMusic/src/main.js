// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './axios'
import Vant from 'vant'
import 'vant/lib/index.css'
import * as echarts from 'echarts'; // 改用此种方法解决“export ‘default‘ (imported as ‘echarts‘) was not found in ‘echarts‘问题
Vue.use(Vant)
Vue.config.productionTip = false
    // 引入axios,替换本来的Http模块-

Vue.prototype.$http = axios
    // 引入echarts
Vue.prototype.$echarts = echarts // version:4.2.1
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})