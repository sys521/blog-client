
<template>
  <div id="upload">
      <div class="input-layout">
        <input type="file" class="input" accept="image/*" @change="pushFile($event)" name="user_header"/>
        <div class="input-content" :style="{backgroundImage:`url(${imgUrl})`}"></div>
      </div>
  </div>
</template>

<script>
import defaultImage from '../../assets/default.jpg'
export default {
  data () {
    return {
      defaultImage
    }
  },
  computed: {
    imgUrl () {
      let url = this.$store.getters.getUserBasic.user_header
      console.log(url)
      console.log('xxxxxxxxxxxxxxxx')
      if (url) {
        return this.$host + '/' + url
      } else {
        return this.defaultImage
      }
    }
  },
  methods: {
    pushFile(event) {
      console.log(event)
      let file = event.target.files[0]
      this.imgUrl = window.URL.createObjectURL(file)
      this.upload(file)
    },
    upload (file) {
      let formData = new FormData()
      formData.append('user_header', file)
      let config = {
        headers: {'Content-Type': 'multipart/form-data'}
      }
      let api = this.$host + '/user/update/header'
      this.$axios.post(api,formData, config).then(res => {
        if(res.data.status === 'success') {
          this.$message({
            type: 'success',
            message: '上传成功',
            center: 'true'
          })
          console.log(res.data.data)
          this.$store.commit('setUserHeader', res.data.data)
        } else {
          this.$message({
            type: 'error',
            message: '上传失败，可能是服务器原因',
            center: 'true'
          })
        }
      })
    }
  },
  created () {
    this.action = this.$host + '/user/update'
  }
}
</script>

<style lang="scss" scoped>
#upload {
  width:140px;
  height:140px;
  .input-layout {
    width:140px;
    height:140px;
    position: relative;
    .input {
      width:140px;
      height:140px;
      display:block;
      position:absolute;
      z-index:10;
      opacity:0;
      cursor: pointer;
    }
    .input-content {
      width:140px;
      height:140px;
      position:absolute;
      background-size:contain;
      background-position:center center;
      background-repeat:no-repeat;
    }
  }
}
</style>
