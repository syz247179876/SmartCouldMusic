// 引入依赖
import Vue from 'vue'
import Router from 'vue-router'


// 引入组件
import HelloWorld from '@/components/HelloWorld'
import Detail from '@/components/music/Detail'
import NoFound from '@/components/common/NoFound'
Vue.use(Router)

// 路由就是路径和组件的对应关系
export default new Router({
    routes: [{
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld
        },
        {
            path: '/detail',
            name: 'Detail',
            component: Detail
        },
        {
            path: '/detail',
            components: {
                HelloWorld
            }
        },
        // 匹配一切非正确页面
        {
            path: '*',
            component: NoFound
        }
    ]
})