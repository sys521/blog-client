
<template>
  <div id ="list">
    <None v-if ="list.length === 0" />
    <ul class="list-layout">
      <li class="list-item" v-for="item in list" :key="item.user_header">
        <div class="img-url" :style="{backgroundImage:`url(${imgUrl(item.user_header)})`}"></div>
        <div class="displayName">{{item.user_displayName}}</div>
        <el-button type="text" class="add-concern">关注</el-button>
      </li>
    </ul>
  </div>
</template>

<script>
import defaultImage from '../../assets/default.jpg'
import None from './None'
export default {
  props: ['list'],
  components: {
    None
  },
  methods: {
    imgUrl (url) {
      if (url) {
        return this.$host + '/header-imgs/' + url
      } else {
        return defaultImage
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#list {
  .list-item {
    display:flex;
    align-items: center;
    border-bottom: 1px solid #DCDFE6;
    padding:20px;
    position:relative;
  }
  .img-url {
    width:60px;
    height:60px;
    border-radius:50%;
  }
  .displayName {
    padding:10px;
  }
  .add-concern {
    padding:20px;
    position: absolute;
    top:0;
    right:0;
  }
}
</style>
