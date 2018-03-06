
<template>
  <div id ="concern">
    <AlreadyConcern />
    <RecomendConcern />
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
      this.$store.dispatch('getAlreadyList', api)
    }
  },
  created () {
    this.getAlreadyConcern()
  }
}
</script>