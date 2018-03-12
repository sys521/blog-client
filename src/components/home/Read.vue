<template>
    <div id="editor">
      <mavon-editor
        ref="md"
        style="height: 100%"
        :defaultOpen="defaultOpen"
        @change="change"
        :value="oldValue"
        @imgAdd="$imgAdd"
        @imgDel="$imgDel"
        @save="save"
        :toolbars="toolbars"
        :editable="editable">
      </mavon-editor>
    </div>
  </template>
<script>
// Local Registration
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
  name: 'editor',
  props: ['oldValue', 'articalId', 'editable', 'toolbarsFlag', 'defaultOpen'],
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
      toolbars: {}
    }
  },
  created () {
    if (this.editable) {
      this.toolbars = {
       bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true, // 预览 
      }
    } else {
      this.toolbars = {
        subfield: true,
        readmodel: true, // 沉浸式阅读
        navigation: true, // 导航目录
        preview: true, // 预览
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
        user_displayName: this.$store.getters.getMyDetail.user_displayName,
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
        if (res.data.status === 'success') {
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
