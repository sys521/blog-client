<template>
  <div id ="setting">
    <div class="setting-layout">
      <SettingMenu/>
    </div>
  </div>
</template>

<script>
import SettingMenu from './setting/SettingMenu'
import UserBasic from './setting/UserBasic'
export default {
  components: {
    SettingMenu
  }
}
</script>

<style lang="scss" scoped>
 #setting {
   .setting-layout {
     max-width:1200px;
     margin:0 auto;
   }
 }
</style>