<template>
  <div style="background: #ccc; height: 60px" >
    <h2>儿子小明有存款{{money}}</h2>
    <button @click="giveMoney(100)">给BABA钱：100</button>
  </div>
</template>

<script>
import myMixin from "@/pages/Communication/ChildrenParentTest/myMixin";
export default {
  name: "Son_q",
  mixins: [myMixin],
  data() {
    return {
      money: 30000
    }
  }
}
</script>

<style scoped>

</style>