<template>
  <div style="background: #ccc; height: 40px;">
    小明每次花100元
    <button @click="$emit('update:money', money - 100)">花钱</button>
    爸爸还剩{{money}}元
  </div>
</template>

<script>
export default {
  name: "index2_q",
  props: ['money']
}
</script>

<style scoped>

</style>