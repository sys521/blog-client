<template>
  <div class="signUp">
    <el-form label-position="left" :model="userInfo" :rules="rules" ref="signUpForm">
      <el-form-item label="账户名称" prop="u_name" label-width="80px">
        <el-popover
          placement="top-start"
          title="账户名称"
          width="200"
          trigger="focus"
          content="账户名称是由(数字，字母，下划线，减号)组成的4-16位字符串">
          <el-input v-model="userInfo.u_name" placeholder="请设置账户名称" slot="reference"></el-input>
        </el-popover>
      </el-form-item>
      <el-form-item label="密码" prop="u_password" label-width="80px">
        <el-input type="password" v-model="userInfo.u_password" placeholder="请设置登录密码"></el-input>
      </el-form-item>
      <el-form-item label="重复密码" prop="u_checkPass" label-width="80px">
        <el-input type="password" v-model="userInfo.u_checkPass" placeholder="请重复登录密码"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="u_email" label-width="80px">
        <el-input v-model="userInfo.u_email" placeholder="请输入您的邮箱"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit('signUpForm')">注册</el-button>
        <el-button type="text" @click="$emit('changeShow','signIn')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import md5 from 'md5'
export default {
  data () {
    var checkUser = (rule, value, callback) => {
      var name = /^[a-zA-Z0-9_-]{4,16}$/
      console.log(name.test(value))
      if (name.test(value)) {
        this.checkUsername(value).then(res => {
          if (res.data && res.data.status === 'success') {
            if (res.data.data === 'NotUnique') {
              this.userInfo.userUnique = false
              callback(new Error('用户名已经存在'))
            } else {
              this.userInfo.userUnique = true
              callback()
            }
          }
        })
      } else {
        callback(new Error('用户名设置不符合要求'))
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空'))
      } else if (value.length < 8) {
        callback(new Error('长度不得小于8位'))
      } else {
        if (this.userInfo.u_checkPass !== '') {
          this.$refs.signUpForm.validateField('u_checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请确认密码'))
      } else if (value !== this.userInfo.u_password) {
        console.log(this.userInfo.u_password)
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      userInfo: {
        u_name: '',
        u_password: '',
        u_checkPass: '',
        u_email: '',
        userUnique: false
      },
      rules: {
        u_name: [
          { required: true, validator: checkUser, trigger: 'blur' }
        ],
        u_password: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        u_checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],
        u_email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
        ]
      }
    }
  },
  methods: {
    submit (form) {
      this.$refs[form].validate(value => {
        if (value && this.userInfo.userUnique) {
          let u_password = md5(this.userInfo.u_password)
          let user = Object.assign({}, this.userInfo, {u_password})
          this.signUp(user).then(res => {
            if (res.data.status === 'success') {
              this.$message({
                type: 'success',
                message: '注册成功',
              })
              this.$emit('changeShow', 'signIn')
            } else {
              this.$message({
                type: 'error',
                message: '注册失败'
              })
            }
          })
        } else {
          console.log('请完善表单')
        }
      })
    },
    checkUsername (name) {
      let api = this.$host + '/user/check'
      let user = {
        u_name: name
      }
      return this.$axios.post(api, user)
    },
    signUp (user) {
      let api = this.$host + '/user/add'
      let {u_name, u_password, u_email} = user
      return this.$axios.post(api, {u_name, u_password, u_email})
    }
  }
}
</script>
