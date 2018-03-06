
<template>
  <div id ="concern">
    <AlreadyConcern />
    <RecommendConcern />
  </div>
</template>

<script>
import AlreadyConcern from '../pub/AlreadyConcern'
import RecomendConcern from '../pub/RecomendConcern'
export default {
  components: {
    AlreadyConcern,
    RecomendConcern
  },
  data () {
    return{
      alreadyConcern: [],
      recomendConcern: [],
    }
  },
  methods: {
    getAlreadyConcern () {
      let api = this.$host + '/concern/already'
      this.$store.dispatch('getAlreadyList', api).then(res => {
        console.log(res)
      })
    },
    getRecomendConcern() {
      let api = this.$host + '/concern/recomend'
      this.$axios.get(api).then(res => {
        console.log(res)
      })
    }
    // test () {
    //   let api = this.$host + '/concern/add'
    //   let to_id = 2
    //   this.$axios.post(api,{to_id}).then(res => {
    //     console.log(res)
    //   })
    // }
  },
  created () {
    this.getAlreadyConcern()
    this.getRecomendConcern()
  }
}
</script>