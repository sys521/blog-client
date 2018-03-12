<template>
  <div id ="r-concern">
    <h2 class="title">推荐列表</h2>
    <el-card class ="recomend-list">
      <List :list="recomendList" :concern="false"/>
    </el-card>
  </div>
</template>

<script>
import List from './List'
export default {
  components: {
    List
  },
  props: ['recomendList']
}
</script>
