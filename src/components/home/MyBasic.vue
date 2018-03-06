<template>
  <div id ="my-basic">
    <div class="basic-layout">
      <div class="header-img-layout">
        <li class="header-img" :style="{backgroundImage:`url(${imgUrl})`}"></li>
      </div>
      <div class="basic">
        <h2 class="displayname">{{displayName}}</h2>
        <div class="author-info">
          <li @click="goAlready">关注:<span>{{$store.getters.getAuthorInfo.concernNum}}</span></li>
          <li>喜欢:<span>{{$store.getters.getAuthorInfo.loveNum}}</span></li>
          <li>文章数量:<span>{{$store.getters.getAuthorInfo.articalNum}}</span></li>
        </div>
      </div>
    </div>
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
      let url = this.$store.getters.getUserBasic.user_header
      if (url) {
        return this.$host + '/header-imgs/' + url
      } else {
        return this.defaultImage
      }
    },
    displayName () {
      let name = this.$store.getters.getUserBasic.user_displayName
      if (name) {
        return name
      } else {
        return '测试用户'
      }
    }
  },
  methods: {
    getAuthorInfo () {
      let api = this.$host + '/author/info'
      this.$store.dispatch('getAuthorInfo', api)
    },
    goAlready () {
      this.$router.push('/home/concern')
    }
  },
  mounted () {
    this.getAuthorInfo()
  }
}
</script>

<style lang="scss" scoped>
#my-basic {
  .basic-layout {
    display:flex;
    align-items: center;
    padding-bottom:24px;
    border-bottom:2px solid #ccc;
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
