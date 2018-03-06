import axios from 'axios'
axios.defaults.withCredentials = true

let concern = {
  state: {
    alreadyList: [],
    recomendList: [],
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
    getRecomendList (state) {
      return state.recomendList
    }
  },
  actions: {
    getAlreadyList (context, api) {
      return axios.get(api).then(res => {
        console.log(res)
      })
    },
    getRecomendList (context, api) {
      return axios.get(api).then(res => {
        console.log(res)
      })
    }
  }
}

export default concern
