// 配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入路由配置
import routes from './routes'
// 使用路由插件
Vue.use(VueRouter)
// 引入store
import store from '@/store'

// 解决：编程式路由跳转到当前路由（参数不变），多次执行会抛出警告错误
// this.$router.push()|this.$router.replace
// this: 当前组件实例
// this.$router: VueRouter类的一个实例，当在入口文件注册路由时，就给实例添加了$router和$route属性
// push | replace: VueRouter实例上的一个方法
// console.log(VueRouter.prototype)
// call | apply 异同
// 相同点： 都可以调用函数一次，并且篡改函数上下文一次
// 不同的： call传递参数用 , 隔开  apply传递参数用数组

// 1. 先将VueRouter对象上的push | replace方法保存一份，我们只是加工push | replace方法而不是替换
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

// 2.重写push | replace 方法
VueRouter.prototype.push = function (location, onComplete, onAbort) {
    if (onComplete && onAbort) { // 第一个参数： 告诉push与replace方法，往哪里跳转（传递什么参数）
        originPush.call(this, location, onComplete, onAbort)
    } else { // 后面两个参数分别是成功与失败的回调
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, onComplete, onAbort) {
    if (onComplete && onAbort) {
        originReplace.call(this, location, onComplete, onAbort)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}

// 创建一个路由器
const router = new VueRouter({
    routes,
    // 路由进阶：滚动行为
    scrollBehavior() {
        // 始终滚动到顶部
        return { y: 0 }
    }
})
// 前置路由守卫
router.beforeEach(async (to, from, next) => {
    // to：可以获取跳转到那个路由信息，from：可以获取从那个路由跳转路由信息，next()：放行
    let token = store.state.user.token
    let name = store.state.user.userInfo.name
    // 如果存在token说明已经登录
    if (token) {
        // 如果已经登录还想去login是不可以的，直接留在主页
        if (to.path === '/login' || to.path === '/register') {
            next('/')
        } else {
            // 已经登录，去的不是login
            // 判断有没有用户信息（不能直接写userInfo（用户信息）这个对象，空对象的Boolean恒为true）
            if (name) {
                next()
            } else {
                // 没有用户信息，派发action，获取用户信息
                try {
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    // 用户token失效
                    await store.dispatch('userLoginOut')
                    next('/login')
                }
            }
        }
    } else {
        // 未登录:不能去交易相关、支付相关、个人中心
        let toPath = to.path
        if (toPath.indexOf('/trade') !== -1 || toPath.indexOf('/pay') !== -1 || toPath.indexOf('/center') !== -1) {
            next('/login?path=' + toPath)
        } else {
            // 去其他路由放行
            next()
        }
    }
})
// 暴露路由器
export default router