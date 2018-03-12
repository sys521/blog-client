<template>
  <div id="artical-item">
    <div class="item-layout">
      <ul class ="item-content" @click="readit">
        <h2 class="title">{{name}}</h2>
        <p class="abstract">{{abstract}}</p>
      </ul>
      <div class="count">
        <span class="love">阅读量 ({{click}})</span>
        <span class="click">获得({{love}})个喜欢</span>
      </div>
      <ul class="button-layout" v-if="buttonShow">
        <el-button type="text" @click="tabRouter()">编辑</el-button>
        <el-button type="text" @click="dialogVisible = true">删除</el-button>
      </ul>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>确定删除这篇文章么</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = removeArtical()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['name', 'abstract', 'click', 'love', 'status', 'id','buttonShow', 'userId'],
  data () {
    return {
      dialogVisible: false
    }
  },
  methods: {
    tabRouter () {
      this.$router.push(`/home/editor/${this.id}`)
    },
    removeArtical() {
      this.$emit('removeArtical', this.id)
    },
    readit () {
      if (this.$store.getters.getMyDetail.user_id === +this.$store.getters.getAuthorInfo.userInfo.user_id) {
        this.$router.push(`/home/editor/${this.id}`)
      } else {
        let api = this.$host + `/artical/read/${this.id}`
        this.$axios.get(api).then(res => {
          if (res.data.status === 'success') {
            this.$router.push(`/home/editor/${this.id}`)
            return null
          } else {
            this.$message({
              type: 'error',
              message: '阅读量增加失败'
            })
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#artical-item {
  .item-layout {
    border-bottom:1px solid #ccc;
    border-radius:5px;
    padding:10px;
    position: relative;
    .item-content {
      width:80%;
      cursor:pointer;

    }
  }
  .count {
    span {
      font-size:12px;
    }
  }
  .button-layout {
    position: absolute;
    top:20px;
    right:0;
  }
}
</style>

