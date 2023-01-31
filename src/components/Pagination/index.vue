<template>
  <div class="fr page">
    <div class="sui-pagination clearfix">
      <ul>
        <li class="prev">
          <button :disabled="pageNo === 1" @click="getPageNo(pageNo - 1)">«上一页</button>
        </li>
        <li>
          <button v-show="startNumAndEndNum.start > 1" @click="getPageNo(1)">1</button>
        </li>
        <li class="dotted" v-show="startNumAndEndNum.start > 2"><span>...</span></li>
        <li>
          <button
              v-for="(page,index) in startNumAndEndNum.end"
              :key="index"
              :class="{active: pageNo === page}"
              v-show="page > startNumAndEndNum.end - continues"
              @click="getPageNo(page)"
          >{{page}}</button>
        </li>
        <li class="dotted" v-show="startNumAndEndNum.end < totalPage - 1"><span>...</span></li>
        <li>
          <button v-show="startNumAndEndNum.end < totalPage" @click="getPageNo(totalPage)">{{totalPage}}</button>
        </li>
        <li class="next">
          <button :disabled="pageNo === totalPage" @click="getPageNo(pageNo + 1)">下一页»</button>
        </li>
      </ul>
      <div><span>共{{total}}条&nbsp;</span></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pagination_q",
  // pageNo：当前第几页，pageSize：每一页展示多少数据
  // total：一共多少数据，continues：连续页码数
  props: ['pageNo', 'pageSize', 'total', 'continues'],
  computed: {
    // 一共多少页
    totalPage() {
      return Math.ceil(this.total/this.pageSize)
    },
    // 连续页的起始与结束
    startNumAndEndNum() {
      const {continues, totalPage, pageNo} = this
      let start = 0, end = 0
      // 判断连续页码数是否大于总的页数
      if (continues > totalPage) {
        start = 1
        end = totalPage;
      } else {
        // 起始页码
        start = pageNo - Math.floor(continues / 2)
        // 结束页码
        end = pageNo + Math.floor(continues / 2)
        if (start < 1) {
          start = 1
          end = continues
        }
        if (end > totalPage) {
          start = totalPage - continues + 1
          end = totalPage
        }
      }
      return  {start,end}
    }
  },
  methods: {
    getPageNo(value) {
      this.$emit('getPageNo', value)
    }
  }
}
</script>

<style scoped lang="less">
.page {
  width: 870px;
  height: 66px;
  overflow: hidden;
  float: right;

.sui-pagination {
  margin: 18px 0;

ul {
  margin-left: 0;
  margin-bottom: 0;
  vertical-align: middle;
  width: 655px;
  float: left;

li {
  line-height: 18px;
  display: inline-block;

button {
  position: relative;
  float: left;
  line-height: 18px;
  text-decoration: none;
  background-color: #fff;
  border-color: #e0e9ee;
  margin-left: -1px;
  font-size: 14px;
  padding: 9px 18px;
  color: #333;
}

&.prev {
button {
  background-color: #fafafa;
}
}

&.disabled {
button {
  color: #999;
  cursor: default;
}
}

&.dotted {
span {
  margin-left: -1px;
  position: relative;
  float: left;
  line-height: 18px;
  text-decoration: none;
  background-color: #fff;
  font-size: 14px;
  border: 0;
  padding: 9px 18px;
  color: #333;
}
}

&.next {
a {
  background-color: #fafafa;
}
}
}
}

div {
  color: #333;
  font-size: 14px;
  float: left;
  width: 190px;
  span {
    display: inline-block;
    height: 35px;
    width: 100px;
    line-height: 35px;
    text-align: center;
    border: 1px solid #e0e9ee;
  }
}
}
}
.page .sui-pagination ul li .active {
  color: #fff;
  background-color: pink;
}
</style>