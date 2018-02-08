<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    let allCookie = document.cookie
    console.log(allCookie)
    if (allCookie && allCookie.replace('user_id', '')) {
      this.$router.push('/home')
    } else {
      this.$router.push('/login')
    }
  }
}
</script>

<style>
body {
  margin:0;
  padding:0;
}
div,ul,ol,li,section{
  margin:0;
  padding:0;
  list-style-type: none;
  box-sizing:border-box;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
