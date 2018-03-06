import axios from 'axios'
axios.defaults.withCredentials = true

let concernList = {
  state: {
    alreadyList: [],
    recomendList: []
  },
  mutations: {
    setAlreadyList (state, playload) {
      state.alreadyList = [...playload]
    },
    setRecomendList (state, playload) {
      state.recomendList = [...playload]
    }
  },
  getters: {
    getAlreadyList (state) {
      return state.alreadyList
    },
    getRecommendList (state) {
      return state.recomendList
    }
  },
  actions: {
    getAlreadyList (context, api) {
      axios.get(api).then(res => {
        console.log(res)
      })
    },
    getrecommendList (context, api) {
      axios.get(api).then(res => {
        console.log(res)
      })
    }
  }
}

export default concernList
