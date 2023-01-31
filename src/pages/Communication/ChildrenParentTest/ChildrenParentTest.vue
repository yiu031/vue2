<template>
  <div>
    <h2>BABA有存款：{{money}}</h2> <br/>
    <button @click="jqFromXm(150)">找小明借150</button> <br/>
    <button @click="jqFromXh(100)">找小红借100</button> <br/>
    <button @click="jqFromAll(200)">找所有孩子借200</button> <br/>
    <Son ref="xm"/>
    <br/>
    <Daughter ref="xh"/>
  </div>
</template>

<script>
import Son from './Son'
import Daughter from './Daughter';
export default {
  name: "ChildrenParentTest",
  components: {
    Son,
    Daughter
  },
  data() {
    return {
      money: 1000
    }
  },
  methods: {
    jqFromXm(money) {
      this.money += money
      this.$refs.xm.money -= money
    },
    jqFromXh(money) {
      this.money += money
      this.$refs.xh.money -= money
    },
    jqFromAll(money) {
      this.money += 2*money
      this.$children.forEach(item => item.money -= money)
    }
  }
}
</script>

<style scoped>

</style>