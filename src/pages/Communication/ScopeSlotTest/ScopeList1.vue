<template>
  <ul>
    <li v-for="item in todos" :key="item.id">
      <slot :todo="item"/>
    </li>
  </ul>
</template>

<script>
export default {
  props: {todos: Array}
}
</script>

<style scoped>

</style>