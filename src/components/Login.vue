<template>
  <div id="login">
    <el-card class="login-card">
      <SignIn @changeShow="changeShow" v-if="signInShow"/>
      <SignUp @changeShow="changeShow" v-else/>
    </el-card>
  </div>
</template>

<script>
import SignIn from './login/SignIn'
import SignUp from './login/SignUp'
export default {
  data () {
    return {
      signInShow: true
    }
  },
  components: {
    SignIn,
    SignUp
  },
  methods: {
    changeShow (str) {
      if (str === 'signUp') {
        this.signInShow = false
      } else if (str === 'signIn') {
        this.signInShow = true
      }
    }
  }
}
</script>

<style lang = 'scss'>
  #login {
    min-height:100vh;
    display:flex;
    justify-content: center;
    align-items: center;
    .login-card {
      width:300px;
      margin-top:-100px;
      padding:20px;
    }
  }
</style>
