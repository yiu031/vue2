<template>
  <div>
    <h2>效果一：显示todo列表时，已完成的todo为绿色</h2>
    <ScopeList1 :todos="todos">
      <template slot-scope="todo">
        <span :style="{color: todo.todo.isComplete ? 'green' : ''}">{{todo.todo.text}}</span>
      </template>
    </ScopeList1>
    <h2>效果二：显示todo列表时，带序号，todo的颜色为蓝绿搭配</h2>
    <ScopeList2 :todos="todos">
      <template slot-scope="todo">
        <span :style="{color: todo.todo.isComplete ? 'green' : 'blue'}">{{todo.index+1}}---{{todo.todo.text}}</span>
      </template>
    </ScopeList2>
  </div>
</template>

<script>
import ScopeList1 from './ScopeList1'
import ScopeList2 from "./ScopeList2";
export default {
  components: {
    ScopeList2,
    ScopeList1
  },
  data() {
    return {
      todos: [
        {id: 1, text: 'AAA', isComplete: false},
        {id: 2, text: 'BBB', isComplete: true},
        {id: 3, text: 'CCC', isComplete: false},
        {id: 4, text: 'DDD', isComplete: true}
      ]
    }
  }
}
</script>

<style scoped>
</style>