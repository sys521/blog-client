
<template>
  <div id ="concern">
    <el-row >
      <el-col :xs="2" :sm="2" :md="4" :lg="7" :xl="7"><div class="none"></div></el-col>
      <el-col :xs="16" :sm="20" :md="16" :lg="10" :xl="10">
        <AlreadyConcern :alreadyList="alreadyList" />
        <RecomendConcern :recomendList="recomendList"/>
      </el-col>
      <el-col :xs="2" :sm="4" :md="4" :lg="7" :xl="7"></el-col>
    </el-row>
  </div>
</template>

<script>
import AlreadyConcern from '../pub/AlreadyConcern'
import RecomendConcern from '../pub/RecomendConcern'
export default {
  components: {
    AlreadyConcern,
    RecomendConcern
  },
  computed: {
    alreadyList () {
      return this.$store.getters.getAlreadyList
    },
    recomendList() {
      return this.$store.getters.getRecomendList
    }
  },
  methods: {
    getAlreadyConcern () {
      let api = this.$host + '/concern/already'
      this.$store.dispatch('getAlreadyList', api).then(res => {
        console.log(res)
        if (res === 'fail') {
          this.$message({
            type: 'error',
            message: '获取列表信息失败' 
          })
        }
      }).catch(err => {
        this.$message({
          type: 'error',
          message: '可能是网络问题'
        })
        console.log(err)
      })
    },
    getRecomendConcern() {
      let api = this.$host + '/concern/recomend'
      this.$store.dispatch('getRecomendList',api).then(res => {
        console.log(res)
        if (res === 'success') {
        } else {
          this.$message({
            type: 'error',
            message: '获取推荐列表失败'
          })
        }
      }).catch(err => {
        this.$message({
          type: 'error',
          message: '获取列表失败'
        })
      })
    }
  },
  created () {
    this.getAlreadyConcern()
    this.getRecomendConcern()
  }
}
</script>

<style lang="scss" scoped>
#concern {
  .none {
    height:1px;
  }
}
</style>