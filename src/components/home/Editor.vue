<template>
  <div id ="editor">
    <Writting :oldValue ="oldValue" :articalId ="articalId"/>
  </div>
</template>

<script>
import Writting from './Writting'
export default {
  components: {
    Writting
  },
  data () {
    return {
      oldValue: '',
      articalId: ''
    }
  },
  mounted () {
    let api = this.$host + '/artical/editor'
    this.$axios.post(api, {artical_id:this.articalId}).then(res => {
      if (res.data.status === 'success') {
        this.oldValue = res.data.data.artical_content
      } else {
        this.$message({
          type: 'error',
          message: '文章内容获取失败'
        })
      }
    })
  },
  created () {
    this.articalId = this.$router.currentRoute.params.id
  }
}
</script>
