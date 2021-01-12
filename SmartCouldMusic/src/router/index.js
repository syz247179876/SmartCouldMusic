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
const Details = () =>
    import ('@/components/learn_vue/Details')
const Recommand = () =>
    import ('@/components/recommands/Recommand')
const Search = () =>
    import ('@/components/search/Search')
const Heat = () =>
    import ('@/components/heat/Heat')
const Index = () =>
    import ('@/components/common/Index')
Vue.use(Router)

// 路由就是路径和组件的对应关系
export default new Router({
    routes: [
        // 进入界面
        {
            path: '/',
            // 重定向
            redirect: '/recommand'
        },
        {
            path: '/details/:name',
            name: 'Details',
            component: Details
        },
        {
            path: "/",
            component: Index,
            children: [
                { path: 'recommand', component: Recommand },
                { path: 'heat-song', component: Heat },
                { path: 'search', component: Search }
            ]
        },
        {
            path: '/recommand',
            name: 'Recommand',
            component: Recommand, // 默认显示Recommand组件
        },
        {
            path: '/heat-song',
            name: 'Heat',
            component: Heat,
        },
        {
            path: '/search',
            name: 'Search',
            component: Search
        },
        {
            path: '/detail',
            name: 'Detail',
            component: Detail
        },

        // 匹配一切非正确页面,例如404页面
        {
            path: '*',
            component: NoFound
        }
    ]
})