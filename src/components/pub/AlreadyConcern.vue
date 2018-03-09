<template>
  <div id = "a-concern">
    <h2>我关注的</h2>
    <div class="concern-list">
      <List :list="alreadyList"/>
    </div>    
  </div>
</template>

<script>
import List from './List'
export default {
  props: ['alreadyList'],
  components: {
    List
  }
}
</script>

<style lang="scss" scoped>
</style>

