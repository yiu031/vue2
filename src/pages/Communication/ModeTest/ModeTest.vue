<template>
  <div>
    <input type="text" :value="msg" @input="msg = $event.target.value">
    <span>{{msg}}</span>
<!--    <CustomInput :value="msg" @input="msg = $event"/>-->
    <CustomInput v-model="msg"/>
  </div>
</template>

<script>
import CustomInput from "@/pages/Communication/ModeTest/CustomInput";
export default {
  name: "ModeTest",
  components: {
    CustomInput
  },
  data() {
    return {
      msg: '你猜呀'
    }
  }
}
</script>

<style scoped>

</style>