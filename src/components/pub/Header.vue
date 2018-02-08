<template>
  <div id ="header">
    <el-row class="header" type="flex" align="middle">
       <el-col :span="12">
         <div class="logo">
           <span class="logo-main">toyouth</span>
         </div>
       </el-col>
       <el-col :span="12">
         <div class="user">
           <li class="user-img"></li>
           <div class="user-name">
             <el-dropdown trigger="click" @command="handleCommand">
              <span class="el-dropdown-link">
                <span class="name">测试用户</span><i class="el-icon-caret-bottom"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item class="dorp-item" command="setting"><i class="el-icon-setting" style="padding:5px"></i>设置 </el-dropdown-item>
                <el-dropdown-item class="dorp-item"><i class="el-icon-info" style="padding:5px"></i>注销 </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
           </div>
         </div>
       </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    goSetting () {
      console.log('xxx')
      this.$router.push('/home/setting')
    },
    handleCommand (command) {
      console.log(command)
      this.$router.push(`/home/${command}`)
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
      .user-img {
        width:40px;
        height:40px;
        background:url('../../assets/default.jpg') center center no-repeat;
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
