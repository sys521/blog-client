
<template>
  <div id ="list">
    <None v-if ="list.length === 0" />
    <ul class="list-layout">
      <li class="list-item" v-for="(item, index) in list" :key="item.user_header">
        <ul class="content-item" @click="changeRouter(item.user_id)">
          <div class="img-url" :style="{backgroundImage:`url(${imgUrl(item.user_header)})`}"></div>
          <div class="displayName">{{item.user_displayName}}</div>
        </ul>
        <el-button type="text" class="add-concern" v-if="!concern" @click="addConcern(item.user_id, index)">关注</el-button>
      </li>
    </ul>
  </div>
</template>

<script>
import defaultImage from '../../assets/default.jpg'
import None from './None'
export default {
  props: ['list', 'concern'],
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
    },
    changeRouter(user_id) {
      this.$router.push(`/home/myartical/${user_id}`)
    },
    addConcern(to_id, index) {
      let api = this.$host + '/concern/add'
      this.$axios.post(api,{to_id}).then(res => {
        if (res.data.status === 'success') {
          this.$store.commit('changeRecomendList', index)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#list {
  .list-item {
    border-bottom: 1px solid #DCDFE6;
    padding:20px;
    position:relative;
  }
  .content-item {
    display:flex;
    align-items:center;
    width:50%;
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
