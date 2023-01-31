<template>
  <div>
    <h1>小明爸爸还有{{money}}元</h1>
    <span>不使用sync修饰符</span>
    <index1 :money="money" @update:money="money = $event"/>
    <span>使用sync修饰符</span>
    <index2 :money.sync="money"/>
<!--    这里就相当于做了  :money="money" @update:money="money = $event" 这个操作-->
  </div>
</template>

<script>
import index1 from "@/pages/Communication/SyncTest/index1";
import index2 from "@/pages/Communication/SyncTest/index2";
export default {
  name: "SyncTest",
  components: {
    index1,
    index2
  },
  data() {
    return {
      money: 10000
    }
  }
}
</script>

<style scoped>

</style>