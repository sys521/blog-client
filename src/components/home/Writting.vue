<template>
    <div id="editor">
      <mavon-editor
        ref="md"
        style="height: 100%" 
        :ishljs="true"
        @change="change"
        :value="oldValue"
        @imgAdd="$imgAdd"
        @imgDel="$imgDel"
        @save="save">
      </mavon-editor>
    </div>
  </template>
<script>
// Local Registration
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
  name: 'editor',
  props: ['oldValue', 'articalId'],
  components: {
    mavonEditor
    // or 'mavon-editor': mavonEditor
  },
  data () {
    return {
      value: '',
      html: '',
      clock: false,
      img_file: {},
      config: {
        toolbarsFlag: true,
        subfield: true,
      }
    }
  },
  methods: {
    change (value, html) {
      this.value = value
      this.html = html
    },
    $imgAdd (pos, file) {
      this.img_file[pos] = file
    },
    $imgDel (pos, file) {
      console.log(this.img_file)
      delete this.img_file[pos]
    },
    save (value, html) {
      this.uploadImgs().then(() => {
        this.img_file = {}
        this.uploadMd(this.value, this.html)
      })
    },
    uploadImgs () {
      if (Object.keys(this.img_file).length !== 0) {
        var formdata = new FormData()
        console.log(this.img_file)
        for(var _img in this.img_file){
          formdata.append(_img, this.img_file[_img])
        }
        let api = this.$host + '/artical/imgs/add/' + (this.articalId || this.$store.getters.getArticalId)
        let config = {
          header: {
            'Content-Type': 'multipart/form-data'
          }
        }
        return this.$axios.post(api, formdata, config).then(res => {
          if (res.data.status === 'success') {
            let data = res.data.data
            let pad = 'http://localhost:3000/artical-imgs/'
            for (let i in data) {
              this.$refs['md'].$img2Url(data[i][0], pad + data[i][1])
            }
            return 'success'
          } else {
            this.$message({
              type: 'error',
              message: '图片上传失败'
            })
          }
        })
      } else {
        return Promise.resolve()
      }
    },
    uploadMd (value, html) {
      let api = this.$host + '/artical/update/'
      let newHtml = html.replace(/[\r\n]/g,'')
      console.log(newHtml)
      let ab = newHtml.match(/\<p\>.+?\<\/p\>/)
      let an = newHtml.match(/\<h\d\>.+?\<\/h\d\>/)
      let artical_abstract = ''
      let artical_name = ''
      an ? artical_name = an[0].replace(/<.*?>/ig, '') : null
      ab ? artical_abstract = ab[0].replace(/<.*?>/ig, '') : null
      console.log(ab)
      console.log(artical_name)
      console.log(artical_abstract)
      let artical = {
        artical_id : this.articalId || this.$store.getters.getArticalId,
        artical_content: value,
        user_displayName: this.$store.getters.getUserBasic.user_displayName,
        artical_abstract,
        artical_name
      }
      this.$axios.post(api, artical).then(res => {
        if (res.data.status === 'success') {
          this.$message({
            type: 'success',
            message: '保存成功'
          })
        } else {
          this.$message({
            type: 'error',
            message: '保存失败'
          })
        }
      })
    }
  },
  beforeDestroy () {
    if (!this.value) {
      let api = this.$host + '/artical/remove'
      let artical_id = this.articalId ||this.$store.getters.getArticalId
      this.$axios.post(api, {artical_id}).then(res => {
        if (res === 'success') {
          this.$store.commit('setNewArticalId', null)
        } else {
          console.log('删除空文章失败')
        }
      })
    }
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
