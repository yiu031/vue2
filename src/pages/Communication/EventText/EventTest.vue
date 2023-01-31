<template>
  <div>
    <h1>EventTest组件</h1>
    <button @click="handler">原生DOM绑定原生事件</button>
<!--    Event1组件：这里会将click事件定义为自定义事件-->
    <Event1 @click.native="handler1"></Event1>
    <Event2/>
  </div>
</template>

<script>
import Event1 from "@/pages/Communication/EventText/Event1";
import Event2 from "@/pages/Communication/EventText/Event2";
export default {
  name: "EventTest",
  components: {
    Event1,
    Event2
  },
  methods: {
    handler(event) {
      console.log('原生DOM点击事件', event)
    },
    handler1() {
      console.log('event1事件的回调')
    }
  }
}
</script>

<style scoped>

</style>