<template>
  <div>
    <h2>自定义带hover提示的按钮</h2>
    <HintButton type="success" icon="el-icon-delete" size="mini" title="提示按钮" @click="handler"></HintButton>
  </div>
</template>

<script>
import HintButton from './HintButton'
export default {
  name: "AttrsListenersTest",
  components: {
    HintButton
  },
  methods: {
    handler() {
      alert('666')
    }
  }
}
</script>

<style scoped>

</style>