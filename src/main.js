import Vue from 'vue'
import './plugins/fontawesome'
import App from './App.vue'
import store from './store'
import router from './router'
import './plugins/element.js'
import './plugins/vuescroll.js'
import axios from 'axios'
import util from './util/util.js'
import filters from './filter'

Object.keys(filters).map(key => {
    Vue.use(key, filters[key])
})

Vue.config.productionTip = false

//router拦截
router.beforeEach((to, from, next) => {
    if (['/logout'].indexOf(to.path) > -1) {
        next();
    } else if (validateToken()) {
        next();
    } else {
        next({
            path: '/logout'
        })
    }
})

function validateToken() {
    var token = util.getToken();
    var expireTime = util.getExTime();
    if (!token || !expireTime) {
        Vue.prototype.$message.error('您还未登录，请先登录');
        return false;
    }
    if (expireTime < new Date().getTime()) {
        Vue.prototype.$message.error('登录已超时，请重新登录');
        return false;
    }
    return true;
}

//axios全局配置
axios.defaults.timeout = 5000
if (process.env.VUE_APP_MODE == 'development') {
    axios.defaults.baseURL = '/api/'
}
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

var ajaxElVm = null;
var ajaxTimeout = null;
//输入拦截
axios.interceptors.request.use(function(config) {
    //登录页不校验token
    if (['/getToken', '/deviceAndWeChatList'].indexOf(config.url) > -1) {
        return config;
    }

    if (!validateToken())
        return Promise.reject('登录校验未通过');

    config.headers.common['Authorization'] = 'Bearer:' + util.getToken();
    
    // if(config.url.includes('other')) {
    //     config.url = config.url.replace(/\/?other/,'');
    //     axios.defaults.baseURL = config.baseURL = '/other/';
    // } else {    
    //     axios.defaults.baseURL = '/api/'
    // }
    
    if (ajaxElVm) {
        ajaxElVm.close();
        clearTimeout(ajaxTimeout)
    }
    ajaxElVm = Vue.prototype.$notify({
        iconClass: 'el-icon-loading',
        customClass: 'el-notify--ajax',
        duration: 0,
        message: '数据请求中...',
        position: 'bottom-right',
        showClose: false
    });

    return config;
});

//输出拦截
axios.interceptors.response.use(function(response) {
    if (ajaxElVm) {
        ajaxTimeout = setTimeout(() => ajaxElVm.close(), 1000);
    }
    
    if (response.status != 200) {
        Vue.prototype.$message.error('服务器请求错误');
        console.error(response);
    } else {
        var data = response.data;
        if (data.errcode != 0) {
            Vue.prototype.$message.error(data.errmsg);
            return response.data;
        } else {
            return response.data.data;
        }
    }
    return Promise.reject(data.errmsg)
}, function(response) {
    Vue.prototype.$message.error('服务器请求错误');
    console.error(response)
    return Promise.reject(response)
});
Vue.prototype.$axios = axios

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')
