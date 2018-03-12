<template>
  <div id = "home">
    <Header></Header>
    <div class="home-body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from './pub/Header'
export default {
  components: {
    Header
  },
  mounted () {
    let api = this.$host + '/user/mydetail'
    this.$store.dispatch('getMyDetail', api).then(res => {
      if (res === 'success') {
        console.log('成功')
        this.$router.push(`/home/myartical/${this.$store.getters.getMyDetail.user_id}`)
      } else {
        console.log('获取数据失败')
      }
    })
  }
}
</script>

<style lang="scss" scoped>
#home {
  .home-body {
   padding-top:80px;
  }
}
</style>
