<template>
  <div id="a-concern">
    <h2 class="title">我关注的</h2>
    <ul class="concern-list">
      <li class="concern-item" v-for="item in alreadyList">
        <div class="header_img" :style="{backgroundImage:`url(${imgUrl(item.user_header)})`}"></div>
        <div class="displayName">{{item.user_displayName? item.user_displayName: '测试用户'}}</div>
      </li>
    </ul>    
  </div>
</template>

<script>
import defaultImg from '../../assets/default.jpg'
export default {
  props: ['alreadyList'],
  methods: {
    imgUrl(url) {
      if(url) {
        console.log(this.$host +'/header-imgs/' + url)
        return this.$host + '/header-imgs/' + url
      } else {
        return defaultImg
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#a-concern {
  width:80%;
  margin:0 auto;
  .title {
    font-size:22px;
  }
  .concern-list {
    .concern-item {
      display:flex;
      align-items:center;
      padding:10px;
      border-radius:2px;
      border:1px solid #DCDFE6;
      .header_img {
        width:60px;
        height:60px;
        background-position:center center;
        background-size:contain;
        background-repeat:no-repeat;
        border-radius:50%;
        border:1px solid;
      }
      .displayName {
        padding-left:20px;
      }
    }
  }
}
</style>
