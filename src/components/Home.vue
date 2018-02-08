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
    let api = this.$host + '/user/info'
    console.log(this.$host)
    this.$axios.get(api).then(res => {
      console.log(res)
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
