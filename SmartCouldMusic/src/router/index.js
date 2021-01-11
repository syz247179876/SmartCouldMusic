// 引入依赖
import Vue from 'vue'
import Router from 'vue-router'


// 引入组件
import HelloWorld from '@/components/HelloWorld'
// import Detail from '@/components/music/Detail'
// import NoFound from '@/components/common/NoFound'

// 路由懒加载
const NoFound = () =>
    import ('@/components/common/NoFound')
const Detail = () =>
    import ('@/components/music/Detail')
const Index = () =>
    import ('@/components/common/Index')
const Details = () =>
    import ('@/components/learn_vue/Details')
const List = () =>
    import ('@/components/learn_vue/List')


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
            path: '/list',
            name: 'List',
            component: List
        },
        {
            path: '/details',
            name: 'List',
            component: List
        },
        // 动态路由, 可以用于获取详情页
        {
            path: '/details/:name',
            name: 'Details',
            component: Details
        }, {
            path: '/index',
            name: 'Index',
            component: Index,
            // 子路由
            children: [
                { path: 'detail', component: Detail },
                { path: '*', component: NoFound }
            ]
        },
        // 匹配一切非正确页面,例如404页面
        {
            path: '*',
            component: NoFound
        }
    ]
})