<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread:面包屑，带有X的按钮-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
<!--          面包屑-->
          <ul class="fl sui-tag">
<!--            分类的面包屑-->
            <li class="with-x" v-if="searchParams.categoryName">{{searchParams.categoryName}}<i @click="removeCategoryName">×</i></li>
<!--            关键字的面包屑-->
            <li class="with-x" v-if="searchParams.keyword">{{searchParams.keyword}}<i @click="removeKeyWord">×</i></li>
<!--            品牌的面包屑-->
            <li class="with-x" v-if="searchParams.trademark">{{searchParams.trademark.split(':')[1]}}<i @click="removeKeyTrademark">×</i></li>
<!--            平台售卖属性的面包屑-->
            <li class="with-x" v-for="(attr, index) in this.searchParams.props" :key="index">{{attr.split(':')[1]}}<i @click="removeAttr(index)">×</i></li>
          </ul>
        </div>

        <!--selector 子组件-->
<!--        自定义事件处理-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo"/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active: isOne}" @click="changeOrder('1')">
                  <a href="javascript:void(0)">综合
                    <span v-show="isOne" class="iconfont">
                      <i v-show="isDesc">&#xe652;</i>
                      <i v-show="isAsc">&#xe662;</i>
                    </span>
                  </a>
                </li>
                <li :class="{active: isTow}" @click="changeOrder('2')">
                  <a href="javascript:void(0)">价格
                    <span v-show="isTow" class="iconfont">
                      <i v-show="isDesc">&#xe652;</i>
                      <i v-show="isAsc">&#xe662;</i>
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                <div class="list-wrap" @click="goDetail">
                  <div class="p-img">
                    <router-link href="javascript:void(0);" :to="`/detail/${goods.id}`">
                      <img :src="goods.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{goods.price}}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">
                      {{goods.title}}
                    </a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
<!--          分页器-->
          <Pagination_q
              :pageNo='searchParams.pageNo'
              :pageSize='searchParams.pageSize'
              :total='total'
              :continues='5'
              @getPageNo="getPageNo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SearchSelector from './SearchSelector/SearchSelector'
  import {mapGetters, mapState} from "vuex";

  export default {
    name: 'Search_q',
    components: {SearchSelector},
    data() {
      return {
        // 带给服务器的参数
        searchParams: {
          // 一到三级分类的id
          "category1Id": "",
          "category2Id": "",
          "category3Id": "",
          // 分类名字
          "categoryName": "",
          // 关键字
          "keyword": "",
          // 排序
          "order": "1:desc",
          // 分页器：代表当前第几页
          "pageNo": 1,
          // 代表每一页展示多少数据
          "pageSize": 3,
          // 平台售卖属性操作带的参数
          "props": [],
          // 品牌
          "trademark": ""
        }
      }
    },
    beforeMount() {
      // Object.assign 合并对象
      Object.assign(this.searchParams, this.$route.query, this.$route.params)
    },
    mounted() {
      this.getData()
    },
    computed: {
      // 获取search仓库中goodsList的数据
      ...mapGetters('search',['goodsList']),
      // 获取search仓库中的total（一共多少数据）数据
      ...mapState({
        total: state => state.search.searchList.total
      }),
      // 判断是综合还是价格
      isOne() {
        return this.searchParams.order.indexOf('1') !== -1
      },
      isTow() {
        return this.searchParams.order.indexOf('2') !== -1
      },
      // 判断显示向上还是向下的箭头
      isAsc() {
        return this.searchParams.order.indexOf('asc') !== -1
      },
      isDesc() {
        return this.searchParams.order.indexOf('desc') !== -1
      }
    },
    methods: {
      // 将联系store中的actions封装成一个函数
      getData() {
        this.$store.dispatch('search/getSearchList', this.searchParams)
      },
      // 移除 面包屑并实现显示默认数据和进行路由跳转改变路径
      removeCategoryName() {
        // 将次字段置为undefined，当前字段就不会发送给服务器
        // 将categoryName置为空面包屑就没了
        this.searchParams.categoryName = undefined
        this.searchParams.category1Id = undefined
        this.searchParams.category2Id = undefined
        this.searchParams.category3Id = undefined
        this.getData()
        // 地址栏需要改变，进行路由跳转
        if (this.$route.params) {
          this.$router.push({name: 'search', params: this.$route.params})
        }
      },
      // 删除 关键字
      removeKeyWord() {
        // 将带给服务器的参数置为空
        this.searchParams.keyword = undefined
        // 再次发送请求
        this.getData()
        // 通过全局事件总线通知兄弟组件Header清除关键字
        this.$bus.$emit('clear')
        // 路由跳转
        if (this.$route.query) {
          this.$router.push({name: 'search', query: this.$route.query})
        }
      },
      // 品牌 处理函数（自定义回调）
      trademarkInfo(trademark) {
        // 整理品牌字段的参数 格式   "ID:品牌名称"
        this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
        this.getData()
      },
      // 删除 品牌消息
      removeKeyTrademark() {
        this.searchParams.trademark = undefined
        this.getData()
      },
      // 属性 处理函数（自定义回调）
      attrInfo(attrs, attrValue) {
        // 整理参数 格式    ["属性ID:属性值:属性名"]
        let attr = `${attrs.attrId}:${attrValue}:${attrs.attrName}`
        // 这里的判断是数组去重，这样平台售卖属性的面包屑就不会出现重复的
        if (this.searchParams.props.indexOf(attr) === -1) this.searchParams.props.push(attr)
        this.getData()
      },
      // 删除 对应的平台售卖属性
      removeAttr(index) {
        this.searchParams.props.splice(index, 1)
        this.getData()
      },
      // 排序 的事件处理
      changeOrder(flag) {
        let originFlag = this.searchParams.order.split(':')[0]
        let originSort = this.searchParams.order.split(':')[1]
        let newOrder = ''
        if (flag === originFlag) {
          newOrder = `${flag}:${originSort === 'asc' ? 'desc' : 'asc'}`
        } else {
          newOrder = `${flag}:desc`
        }
        this.searchParams.order = newOrder
        this.getData()
      },
      // 获取当前第几页（自定义事件）
      getPageNo(pageNo) {
        this.searchParams.pageNo = pageNo
        this.getData()
      },
      goDetail() {
        this.$router.push(`/detail/${this.goodsList.id}`)
      }
    },
    watch: {
      // $route与goodsList平级，所以可以监听$route的变化,这就可以在search组件中再次发送请求
      $route() {
        Object.assign(this.searchParams, this.$route.query, this.$route.params)
        this.getData()
        this.searchParams.category1Id = undefined
        this.searchParams.category2Id = undefined
        this.searchParams.category3Id = undefined
      }
    }
  }
</script>

<style lang="less" scoped>
@font-face {
  font-family: 'iconfont';  /* Project id 3808031 */
  src: url('//at.alicdn.com/t/c/font_3808031_9ob9itwnu4t.woff2?t=1670159131080') format('woff2'),
  url('//at.alicdn.com/t/c/font_3808031_9ob9itwnu4t.woff?t=1670159131080') format('woff'),
  url('//at.alicdn.com/t/c/font_3808031_9ob9itwnu4t.ttf?t=1670159131080') format('truetype');
}
.iconfont {
  font-family: iconfont;
}
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>