<template>
  <div id="basic-setting">
    <el-form label-position="right" label-width="80px" v-model="userInfo">
      <el-form-item label="用户昵称">
        <el-input v-model="userInfo.user_displayName"></el-input>
      </el-form-item>
      <el-form-item label="用户头像">
        <Upload></Upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handle('userBasic')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Upload from '../../pub/Upload.vue'
export default {
  components: {
    Upload
  },
  data () {
    return {
      api: null
    }
  },
  computed: {
    userInfo () {
      return Object.assign({}, this.$store.getters.getUserBasic)
    }
  },
  methods: {
    handle () {
      let displayName = this.userInfo.user_displayName
      if (!displayName) {
        this.message({
          type: 'error',
          message: '请输入要修改的用户名',
          center: 'true'
        })
      } else {
        let api = this.$host + '/user/displayname/update'
        this.$axios.post(api, {user_displayName: displayName}).then(res => {
          if (res.data.status === 'success') {
            this.$message({
              type: 'success',
              message: '修改成功',
              center: 'true'
            })
            let api = this.$host + '/user/update'
            this.$store.commit('setUserName', displayName)
          } else {
            this.$message({
              type: 'error',
              message: `${res.data.data}`,
              center: 'true'
            })
          }
        })
      }
    }
  },
  created () {
    this.api = this.$host + 'user/update'
  }
}
</script>

<style lang="scss" scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

