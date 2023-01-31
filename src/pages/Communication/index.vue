<template>
  <div>
    <h1>组件间通信高级（非常重要）</h1>
    <ul>
      <li> <router-link to="/communication/eventtest">event深入</router-link> </li>
      <li> <router-link to="/communication/modetest">v-model深入</router-link> </li>
      <li> <router-link to="/communication/synctest">属性修饰符sync</router-link> </li>
      <li> <router-link to="/communication/attrslistenerstest">$attrs与$listeners</router-link> </li>
      <li> <router-link to="/communication/childrenparenttest">$children与$parent</router-link> </li>
      <li> <router-link to="/communication/scopeslottest">作用域插槽scope-slot</router-link> </li>
    </ul>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "index_q"
}
</script>

<style scoped lang="less">
div {
  width: 1100px;
  margin: 30px auto;
  ul {
    display: flex;
    margin-top: 30px;
    li {
      margin: 1px 20px;
    }
  }
}
</style>