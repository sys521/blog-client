
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
      this.$axios.get(api).then(res => {
        console.log(res)
      })
    },
    getRecomendConcern() {
      let api = this.$host + '/concern/recomend'
      this.$axios.get(api).then(res => {
        console.log(res)
      })
    }
  }
}
</script>