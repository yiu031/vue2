<template>
  <div>
<!--    导航栏-->
    <TypeNav/>
<!--    快报-->
    <ListContainer/>
<!--    今日推荐-->
    <Recommend/>
<!--    商品排行-->
    <Rank/>
<!--    猜你喜欢 -->
    <Like/>
<!--    楼层区-->
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor"/>
<!--    商标-->
    <Brand/>
  </div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer';
import Recommend from '@/pages/Home/Recommend';
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'
import {mapState} from "vuex";

export default {
  name: "Home_q",
  components: {ListContainer, Recommend, Rank, Like, Floor, Brand},
  mounted() {
    // 获取楼层信息
    this.$store.dispatch('getFloorList')
  },
  computed: {
    ...mapState({
      floorList: state => state.home.floorList
    })
  }
}
</script>

<style scoped>

</style>