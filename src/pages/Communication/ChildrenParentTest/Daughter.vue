<template>
  <div style="background: #ccc; height: 60px" >
    <h2>女儿小红有存款{{money}}</h2>
    <button @click="giveMoney(50)">给BABA钱：50</button>
  </div>
</template>

<script>
import myMixin from "@/pages/Communication/ChildrenParentTest/myMixin";
export default {
  name: "Daughter_q",
  mixins: [myMixin],
  data() {
    return {
      money: 20000
    }
  }
}
</script>

<style scoped>

</style>