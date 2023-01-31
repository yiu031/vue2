<template>
  <div id="app">
    <Header/>
    <router-view />
    <Footer v-show="$route.meta.show" />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default {
  name: 'App',
  components: {
    Footer,
    Header
  },
  mounted() {
    // 将派发的action 获取商品分类的三级列表放在App.vue中，这样在切换路由时就不会再次发送请求
    this.$store.dispatch('categoryList')
  }
}
</script>

<style>

</style>
