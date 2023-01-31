import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from '@/router'
// 引入仓库
import store from '@/store'

// 引入vue-lazyload(图片懒加载)
import VueLazyload from 'vue-lazyload'
import sdz from '@/assets/1.gif'
Vue.use(VueLazyload, {
  loading: sdz
})

// 引入mockHome.js --- mock数据
import '@/mock/mockHome'
// 引入swiper的css样式
import 'swiper/css/swiper.css'
// 引入表单验证
import '@/utils/validate'

// 引入接口
import * as API from '@/api'

// 引入elementUI
import { MessageBox, Button } from 'element-ui';
Vue.use(Button)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 将三级联动TypeNav组件注册为全局组件
import TypeNav from '@/components/TypeNav';
// 将轮播图（CarSouSel）注册为全局组件
import CarSouSel from '@/components/Carsousel'
// 将分页器（Pagination）注册为全局组件
import Pagination from '@/components/Pagination'
// 参数： 组件name, 引入的组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(CarSouSel.name, CarSouSel)
Vue.component(Pagination.name, Pagination)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 全局事件总线$bus配置
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  // 注册路由
  router,
  // 注册仓库
  store
}).$mount('#app')
