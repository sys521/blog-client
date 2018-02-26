<template>
  <div id ="setting">
    <div class="setting-layout">
      <SettingMenu @selectMenu = "selectMenu" />
      <div class="setting-content">
        <UserBasic v-if="index === '0'" />
        <UserSafety v-if="index === '1'"/>
      </div>
    </div>
  </div>
</template>

<script>
import SettingMenu from './setting/SettingMenu'
import UserBasic from './setting/UserBasic'
import UserSafety from './setting/UserSafety'
export default {
  components: {
    SettingMenu,
    UserBasic,
    UserSafety
  },
  data () {
    return {
      index: '0'
    }
  },
  methods: {
    selectMenu (index) {
      this.index = index
    }
  },
  computed: {
    userInfo () {
      return this.$store.getters.getUserBasic
    }
  }
}
</script>

<style lang="scss" scoped>
 #setting {
   .setting-layout {
     max-width:1200px;
     margin:0 auto;
     display:flex;
     .setting-content {
       flex:1;
       display:flex;
       justify-content: center;
     }
   }
 }
</style>