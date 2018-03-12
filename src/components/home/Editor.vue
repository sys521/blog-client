<template>
  <div id ="editor">
    <Read :oldValue ="oldValue" 
    :articalId ="articalId"
    :toolbarsFlag="toolbarsFlag"
    :defaultOpen="defaultOpen"
    :subfield="subfield"
    :editable="editable"/>
    <ul class="love" v-if="this.loveShow">
      <li v-if="love">
        <svg class="icon " aria-hidden="true">
          <use xlink:href="#icon-love_fill"></use>
        </svg> 
      </li>
      <li>
        <svg class="icon " aria-hidden="true" v-if="!love" @click ="changeLove">
          <use xlink:href="#icon-love"></use>
        </svg>
      </li>
    </ul>
  </div>
</template>

<script>
import Read from './Read'
export default {
  components: {
    Read
  },
  data () {
    return {
      oldValue: '',
      articalId: '',
      toolbarsFlag: false,
      defaultOpen: 'preview',
      editable: false,
      subfield: false,
      loveShow: false,
      love: false,
    }
  },
  methods: {
    queryLove () {
      let api = this.$host + '/love/query/' + this.articalId
      this.$axios.get(api).then(res => {
        if (res.data.status === 'success') {
          this.love = res.data.data
        } else {
          this.$message({
            type: 'error',
            message: '获取喜欢失败'
          })
        }
      })
    },
    changeLove() {
      let api = this.$host + '/love/update/' + this.articalId
      this.$axios.get(api).then(res => {
        if (res.data.status === 'success') {
          this.love = !this.love
        } else {
          this.$message({
            type: 'error',
            message: '增加喜欢失败'
          })
        }
      })
    }
  },
  mounted () {
    let api = this.$host + '/artical/editor'
    this.$axios.post(api, {artical_id:this.articalId}).then(res => {
      if (res.data.status === 'success') {
        this.oldValue = res.data.data.artical_content
      } else {
        this.$message({
          type: 'error',
          message: '文章内容获取失败'
        })
      }
    })
    this.queryLove()
  },
  created () {
    this.articalId = this.$router.currentRoute.params.id
    if (+this.$store.getters.getAuthorInfo.userInfo.user_id === this.$store.getters.getMyDetail.user_id) {
      this.toolbarsFlag = true
      this.subfield = true,
      this.defaultOpen = 'edit'
      this.editable = true
      this.loveShow = false
    } else {
      this.toolbarsFlag = false,
      this.subfield = false,
      this.defaultOpen = 'preview'
      this.editable = false
      this.loveShow = true
    }
  }
}
</script>

<style lang="scss" scoped>
#editor {
  .love {
    text-align:center;
    padding:10px;
    .icon {
      width:40px;
      height:40px;
      fill: #ea6f5a;
    }
  }
}
</style>