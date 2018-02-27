<template>
    <div id="editor">
      <mavon-editor
        ref="md"
        style="height: 100%" 
        :ishljs="true"
        @change="change"
        :value="value"
        @imgAdd="$imgAdd"
        @imgDel="$imgDel">
      </mavon-editor>
    </div>
  </template>
<script>
// Local Registration
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
  name: 'editor',
  components: {
    mavonEditor
    // or 'mavon-editor': mavonEditor
  },
  data () {
    return {
      value: '',
      clock: false,
      img_file: {}
    }
  },
  methods: {
    change (value, html) {
      this.value = value
    },
    $imgAdd (pos, file) {
      console.log(file)
      this.img_file[pos] = file
    },
    $imgDel (pos, file) {
      delete this.img_file[pos]
    }
  },
  watch: {
    value () {
      if (!this.clock) {
        this.clock = true
        var t = setTimeout(() => {
          console.log('我发送了一条消息', this.value)
          this.clock = false
        }, 1000 * 60)
      }
    },
  }
}
</script>
<style>
  #editor {
    margin: auto;
    width: 80%;
    height: 80vh;
  }
</style>
