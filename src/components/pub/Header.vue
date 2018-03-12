<template>
  <div id ="header">
    <el-row class="header" type="flex" align="middle">
       <el-col :span="12">
         <div class="logo" @click ="goRecomend">
           <span class="logo-main">toyouth</span>
         </div>
       </el-col>
       <el-col :span="12">
         <div class="user">
           <li class="writting" @click="goWritting">写文章</li>
           <li class="user-img" :style="{backgroundImage: `url(${imgUrl})`}"></li>
           <div class="user-name">
             <el-dropdown trigger="click" @command="handleCommand">
              <span class="el-dropdown-link">
                <span class="name">{{displayName}}</span><i class="el-icon-caret-bottom"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item class="dorp-item" command="myartical"><i class="el-icon-setting" style="padding:5px"></i>我的文章 </el-dropdown-item>
                <el-dropdown-item class="dorp-item" command="setting"><i class="el-icon-setting" style="padding:5px"></i>设置 </el-dropdown-item>
                <el-dropdown-item class="dorp-item" command="signOut"><i class="el-icon-info" style="padding:5px"></i>注销 </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
           </div>
         </div>
       </el-col>
    </el-row>
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
      let url = this.$store.getters.getMyDetail.user_header
      if (url) {
        return this.$host + '/header-imgs/' + url
      } else {
        return this.defaultImage
      }
    },
    displayName () {
      let displayName = this.$store.getters.getMyDetail.user_displayName
      if (displayName) {
        return displayName
      } else {
        return '测试用户'
      }
    }
  },
  methods: {
    handleCommand (command) {
      if (command === 'writting') {
        let api = this.$host + '/artical/add'
        this.$store.dispatch('getNewArticalName', api).then(res => {
          if(res === 'success') {
            this.$router.push(`/home/writting`)
          } else {
            this.$message({
              type: 'error',
              message: '新建文章失败',
              center: 'true'
            })
          }
        })
      } else if (command === 'myartical') {
        this.$router.push(`/home/myartical/${this.$store.getters.getMyDetail.user_id}`)
      } else if (command === 'signOut') {
        this.signOut()
      }
    },
    setCookie(cname, cvalue, exdays) {
      var d = new Date()
      d.setTime(d.getTime() + (exdays*24*60*60*1000))
      var expires = "expires="+d.toUTCString()
      document.cookie = cname + "=" + cvalue + "; " + expires;
    },
    clearCookie(name) {  
      this.setCookie(name, "", -1)
    },
    clearStore() {
      let store = ['AuthorInfo', 'Concern', 'MyDetail', 'NewArtical']
      store.forEach( e => {
        this.$store.commit(`clear${e}`)
      })
    },
    signOut () {
      console.log(document.cookie)
      this.clearCookie('user_id')
      this.clearStore()
      this.$router.push('/login')
    },
    goWritting () {
      if (this.$router.currentRoute.path !== '/home/writting') {
        let api = this.$host + '/artical/add'
        this.$store.dispatch('getNewArticalId', api).then(res => {
          if(res === 'success') {
            this.$router.push(`/home/writting`)
          } else {
            this.$message({
              type: 'error',
              message: '新建文章失败',
              center: 'true'
            })
          }
        })
      }
    },
    goRecomend() {
      this.$router.push('/home/hot')
    }
  }
}
</script>

<style lang="scss" scoped>
#header {
  padding:5px 0;
  position:fixed;
  width:100%;
  border-bottom: 1px solid #F2F6FC;
  .header {
    width:80%;
    margin:0 auto;
    .logo {
      .logo-main {
        font-weight:100;
        color: #ea6f5a;
        font-size:32px;
        vertical-align: top;
        cursor:pointer;
      }
    }
    .user {
      display:flex;
      align-items: center;
      float:right;
      .writting {
        width:100px;
        height:40px;
        line-height:40px;
        color:white;
        background:#ea6f5a;
        text-align: center;
        cursor:pointer;
        border-radius:10px;
        margin-right:20px;
      }
      .user-img {
        width:40px;
        height:40px;
        background-repeat:no-repeat;
        background-position:center center;
        background-size:cover;
        border-radius:50%;
        cursor:pointer;
      }
      .user-name {
        padding-left:20px;
      }
    }
  }
}
</style>
