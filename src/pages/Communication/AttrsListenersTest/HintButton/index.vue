<template>
  <a :title="title">
    <el-button v-bind="$attrs" v-on="$listeners"></el-button>
  </a>
</template>

<script>
export default {
  name: "index_q",
  props: ['title'],
  mounted() {
    // $attrs：是组件的一个属性，可以获取到父组件传递过来的props数据
    // 如果子组件使用props接收了数据，那么对应的数据在$attrs就获取不到了
    console.log(this.$attrs)
    // $listeners：它可以获取父组件传递的自定义事件
    console.log(this.$listeners)
  }
}
</script>

<style scoped>

</style>