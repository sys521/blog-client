<template>
  <div id ="artical-list">
    <ul v-for="item in articalList" :key ="item.artical_id">
      <ArticalItem 
      :name="item.artical_name" 
      :abstract="item.artical_abstract" 
      :click="item.artical_clicktimes"
      :love="item.love || 0"
      :id ="item.artical_id"
      :status="item.artical_status"
      @removeArtical ="removeArtical"/>
    </ul>
  </div>
</template>

<script>
import ArticalItem from './ArticalItem'
export default {
  components: {
    ArticalItem
  },
  data () {
    return {
      articalList: []
    }
  },
  methods: {
    getArticalList () {
      let api = this.$host + '/artical/list/' + this.$router.currentRoute.params.id
      this.$axios.get(api).then(res => {
        if (res.data.status === 'success') {
          this.articalList = res.data.data
        } else {
          this.$message({
            type: 'error',
            message: '获取文章列表失败'
          })
        }
      })
    },
    removeArtical (id) {
      let api = this.$host + '/artical/remove'
      this.$axios.post(api, {artical_id: id}).then(res => {
        if (res.data.status === 'success') {
          this.articalList.forEach((e,i) => {
            if (e.artical_id === id) {
              this.articalList.splice(i, 1)
              let api = this.$host + '/author/info'
              this.$store.dispatch('getAuthorInfo',api)
            }
          }) 
        } else {
          this.$message({
            type: 'error',
            message: '删除文章失败'
          })
        }
      })
    }
  },
  mounted () {
    this.getArticalList()
  }
}
</script>
