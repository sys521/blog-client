<template>
  <div id ="my-basic">
    <el-card>
      <div class="basic-layout">
          <div class="header-img-layout">
            <li class="header-img" :style="{backgroundImage:`url(${imgUrl})`}"></li>
          </div>
          <div class="basic">
            <h2 class="displayname">{{displayName}}</h2>
            <div class="author-info">
              <li @click="goConcern" v-if="+$router.currentRoute.params.id === this.$store.getters.getMyDetail.user_id">关注:<span>{{$store.getters.getAuthorInfo.concernNum}}</span></li>
              <li>喜欢:<span>{{$store.getters.getAuthorInfo.loveNum}}</span></li>
              <li>文章数量:<span>{{$store.getters.getAuthorInfo.articalNum}}</span></li>
            </div>
          </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import defaultImage from '../../assets/default.jpg'
export default {
  data () {
    return {
      articalNum: null,
      loveNum: null,
      concernNum: null
    }
  },
  computed: {
    imgUrl () {
      let url = this.$store.getters.getAuthorInfo.userInfo.user_header
      console.log(url)
      if (url) {
        return this.$host + '/header-imgs/' + url
      } else {
        return defaultImage
      }
    },
    displayName () {
      let name = this.$store.getters.getAuthorInfo.userInfo.user_displayName
      if (name) {
        return name
      } else {
        return '测试用户'
      }
    }
  },
  methods: {
    getAuthorInfo () {
      let api = this.$host + '/author/info/' + this.$router.currentRoute.params.id
      this.$store.dispatch('getAuthorInfo', api)
    },
    goConcern () {
      this.$router.push('/home/concern')
    }
  },
  created () {
    this.id = this.$router.currentRoute.params.id
  },
  mounted () {
    this.getAuthorInfo()
  },
  watch: {
    '$route' (to, from) {
      this.getAuthorInfo()
    }
  }
}
</script>

<style lang="scss" scoped>
#my-basic {
  .basic-layout {
    display:flex;
    align-items: center;
    padding-bottom:24px;
    .header-img-layout {
      .header-img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
      }
    }
    .basic {
      padding-left:20px;
      flex:1;
      .displayname {
        font-size:20px;
      }
      .author-info {
        display:flex;
        li {
          padding:5px 10px;
          cursor:pointer;
        }
        span {
          color: #ea6f5a;
        }
      }
    }
  }
}
</style>
