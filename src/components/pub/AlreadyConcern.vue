<template>
  <div id = "a-concern">
    <h2>我关注的</h2>
    <el-card class="concern-list">
      <List :list="alreadyList" :concern="true"/>
    </el-card>    
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

