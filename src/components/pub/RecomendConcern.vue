<template>
  <div id ="r-concern">
    <h2 class="title">推荐列表</h2>
    <div class ="recomend-list">
      <List :list="recomendList"/>
    </div>
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
