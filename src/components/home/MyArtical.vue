<template>
  <div id ="my-artical">
    <el-row >
      <el-col :xs="2" :sm="2" :md="4" :lg="7" :xl="7"><div class="none"></div></el-col>
      <el-col :xs="20" :sm="20" :md="16" :lg="10" :xl="10">
        <MyBasic />
        <ArticalList />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ArticalList from '../pub/ArticalList'
import MyBasic from './MyBasic'
export default {
  components: {
    MyBasic,
    ArticalList,
  }
}
</script>

<style lang="scss" scoped>
#my-artical {
  .none {
    border:0.1px solid;
  }
}
</style>

