<template>
  <div id="artical-item">
    <div class="item-layout">
      <h2 class="title">{{name}}</h2>
      <p class="abstract">{{abstract}}</p>
      <div class="count">
        <span class="love">阅读量 ({{click}})</span>
        <span class="click">获得({{love}})个喜欢</span>
      </div>
      <ul class="button-layout">
        <el-button type="text" @click="tabRouter()">编辑</el-button>
        <el-button type="text" v-if="!status">发布</el-button>
        <el-button type="text" v-if="status">转为私密</el-button>
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
  props: ['name', 'abstract', 'click', 'love', 'status', 'id'],
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
    }
  }
}
</script>

<style lang="scss" scoped>
#artical-item {
  .item-layout {
    border-bottom:1px solid #ccc;
    border-radius:5px;
    margin:40px 0;
    padding:10px;
    position: relative;
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

