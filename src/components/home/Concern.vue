
<template>
  <div id ="concern">
    <el-row >
      <el-col :xs="2" :sm="2" :md="4" :lg="7" :xl="7"><div class="none"></div></el-col>
      <el-col :xs="20" :sm="20" :md="16" :lg="10" :xl="10">
        <AlreadyConcern :alreadyList="alreadyList"/>
        <RecommendConcern :recomendList="recomendList"/>
      </el-col>
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
      this.$axios.get(api).then(res => {
        if (res === 'fail') {
          this.$message({
            type: 'error',
            message: '获取关注列表失败，可能是网络原因' 
          })
        }
      }).catch(err => {
        this.$message({
          type: 'error',
          message: '获取推荐列表失败，可能是网络原因'
        })
        console.log(err)
      })
    }
    // test () {
    //   let api = this.$host + '/concern/add'
    //   let to_id = 2
    //   this.$axios.post(api,{to_id}).then(res => {
    //     console.log(res)
    //   })
    // }
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
    border:0.1px solid;
  }
}
</style>