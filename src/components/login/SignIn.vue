<template>
  <div id ="sign-in">
    <el-form label-position="left" :model="user" :rules="rules" ref="signInForm">
      <el-form-item label="账户名称" prop="u_name" label-width="80px">
        <el-input v-model="user.u_name" placeholder="请输入账户名称"></el-input>
      </el-form-item>
      <el-form-item label="登录密码" prop="u_password" label-width="80px">
        <el-input v-model="user.u_password" placeholder="请输入登录密码" type="password"></el-input>
      </el-form-item>
      <el-form-item class="button-layout">
        <el-button type="primary" @click="submit('signInForm')">登录</el-button>
        <el-button type="text" @click="$emit('changeShow', 'signUp')" style="float:right">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import md5 from 'md5'
export default {
  data () {
    return {
      user: {
        u_name: '',
        u_password: ''
      },
      rules: {
        u_name: [
          {required: true, message: '请输入账号名称', trigger: 'blur'}
        ],
        u_password: [
          {required: true, message: '请输入登录密码', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submit (form) {
      this.$refs[form].validate(value => {
        if (value) {
          let u_password = md5(this.user.u_password)
          let user = Object.assign({}, this.user, {u_password})
          this.signIn(user).then(res => {
            if (res.data.status === 'success') {
              console.log('登陆成功')
              this.$message({
                message: '欢迎回来',
                center: 'true',
                type: 'success'
              })
              this.$router.push('/home')
            } else {
              console.log('登陆失败')
              this.$message({
                message: '登陆失败,账号密码错误',
                center: 'true',
                type: 'error'
              })
            }
          }).catch(err => {
            console.log(err)
            this.$message({
              message: '连接失败,可能是网络原因',
              center: 'true'
            })
          })
        }
      })
    },
    signIn (user) {
      let api = this.$host + '/user/login'
      return this.$axios.post(api, user)
    }
  }
}
</script>

<style lang="scss" scoped>
#sign-in {
  .user {
    width:200px;
  }
  .button-layout {
    .el-form-item__content {
      display:flex !important;
      justify-content: space-between !important;
    }
  }
}
</style>
