<template>
<!--  三级联动(侧边栏)-->
  <div class="type-nav">
    <div class="container" @mouseleave="leave">
      <h2 class="all" @mouseenter="enterShow">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <transition name="sort">
        <div class="sort" v-show="show">
          <div class="all-sort-list2" @click="goSearch">
            <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                @mouseenter="changeIndex(index)"
                :class="{cur: currentIndex === index}">
              <h3>
                <a href="javascript:void(0)" :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
              </h3>
              <!--            <div class="item-list clearfix" v-show="currentIndex === index">-->
              <div class="item-list clearfix" :style="{display: currentIndex === index? 'block' : 'none'}">
                <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                  <dl class="fore">
                    <dt>
                      <a href="javascript:void(0)" :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a href="javascript:void(0)" :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
// 引入lodash中的节流函数
import throttle from 'lodash/throttle'

export default {
  name: "TypeNav",
  data() {
    return {
      // 添加背景色
      currentIndex: -1,
      // TypeNav的显示与隐藏
      show: true
    }
  },
  mounted() {
    // this.$route可以得到路由消息，其有一个path属性可以得到路由path
    // 进入search组件让三级联动列表隐藏
    if (this.$route.path !== '/home') {
      this.show = false
    }
  },
  computed: {
    // 获取home仓库从服务器获取到的数据
    ...mapState({
      categoryList: state=>state.home.categoryList
    })
  },
  methods: {
    // 改变changeIndex, throttle:节流函数
    changeIndex: throttle(function (index) {
      this.currentIndex = index
    },50),
    leave() {
      // 鼠标离开后让背景色消失
      this.currentIndex = -1
      // 在search组件下鼠标离开让三级联动列表隐藏
      if (this.$route.path !== '/home') {
        this.show = false
      }
    },
    enterShow() {
      this.show = true
    },
    // 鼠标点击三级联动实现路由跳转和传递参数
    goSearch(event) {
      // 我们将事件绑定在父亲身上,通过事件委托的方式触发事件,这样就避免了每一个a身上都有这个事件
      // 通过自定义属性 data-categoryName 来确定我们点击的就是a标签
      // 通过event事件对象获取到触发事件的对象,在通过 event.target.dataset 获取自定义属性
      // 解构: 我的理解是对象里面找东西,找到了就返回其值,找不到就返回undefined
      let {categoryname, category1id, category2id, category3id} = event.target.dataset
      // 整理路由跳转参数
      let location = {name: 'search'}
      let query = {categoryName: categoryname}
      // 判断是不是a标签,有categoryname属性一定是a标签
      if (categoryname) {
        // 判断是几级分类
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        }else if (category3id) {
          query.category3Id = category3id
        }
      }
      // 整理完整参数
      location.query = query
      // 如果你在跳转路由之前已经有params参数了，不将params参数顺带传递过去，那跳转之后的路由中不在带有params参数
      if (this.$route.params) {
        // 合并参数
        location.params = this.$route.params
      }
      // 路由跳转
      this.$router.push(location)
    }
  }
}
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

.container {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  position: relative;

.all {
  width: 210px;
  height: 45px;
  background-color: #e1251b;
  line-height: 45px;
  text-align: center;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
}

.nav {
a {
  height: 45px;
  margin: 0 22px;
  line-height: 45px;
  font-size: 16px;
  color: #333;
}
}

.sort {
  position: absolute;
  left: 0;
  top: 45px;
  width: 210px;
  height: 461px;
  position: absolute;
  background: #fafafa;
  z-index: 999;



.all-sort-list2 {
.item {
h3 {
  line-height: 30px;
  font-size: 14px;
  font-weight: 400;
  overflow: hidden;
  padding: 0 20px;
  margin: 0;

a {
  color: #333;
}
}

.item-list {
  display: none;
  position: absolute;
  width: 734px;
  min-height: 460px;
  background: #f7f7f7;
  left: 210px;
  border: 1px solid #ddd;
  top: 0;
  z-index: 9999 !important;

.subitem {
  float: left;
  width: 650px;
  padding: 0 4px 0 8px;

dl {
  border-top: 1px solid #eee;
  padding: 6px 0;
  overflow: hidden;
  zoom: 1;

&.fore {
   border-top: 0;
 }

dt {
  float: left;
  width: 54px;
  line-height: 22px;
  text-align: right;
  padding: 3px 6px 0 0;
  font-weight: 700;
}

dd {
  float: left;
  width: 415px;
  padding: 3px 0 0;
  overflow: hidden;

em {
  float: left;
  height: 14px;
  line-height: 14px;
  padding: 0 8px;
  margin-top: 5px;
  border-left: 1px solid #ccc;
}
}
}
}
}
}
  .cur {
    background-color: green;
  }
}
}
  .sort-enter {
    height: 0px;
  }
  .sort-enter-to {
    height: 461px;
  }
  .sort-enter-active {
    transition: all .1s linear;
  }
  .sort-leave {
    height: 461px;
  }
  .sort-leave-to {
    height: 0px;
  }
  .sort-leave-active {
    transition: all .1s linear;
  }
}
}
</style>