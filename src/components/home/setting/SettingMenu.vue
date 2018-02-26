<template>
  <div class="setting-menu">
    <el-menu class="menu" default-active="0" text-color="#ccc" active-text-color="#409EFF" @select="changeItem">
      <el-menu-item v-for="item,i in menu" :index="`${i}`" :key="i">
        <i :class="item.icon"></i>
        <span slot="title">{{item.text}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      menu: [
        { icon: 'el-icon-document', text: '基本设置' },
        { icon: 'el-icon-edit', text: '安全设置' }
      ]
    }
  },
  methods: {
    changeItem (index) {
      this.$emit('selectMenu', index)
    },
    getUserBasic () {
    
    }
  }
}
</script>

<style lang="scss" scoped>
.setting-menu {
  .menu {
    max-width:200px;
  }
}
</style>
