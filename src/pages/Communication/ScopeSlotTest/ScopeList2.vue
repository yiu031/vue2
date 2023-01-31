<template>
  <ul>
    <li v-for="(item, index) in todos" :key="item.id">
      <slot :todo="item" :index="index"/>
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