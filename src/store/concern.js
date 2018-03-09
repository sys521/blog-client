import axios from 'axios'
axios.defaults.withCredentials = true

let concern = {
  state: {
    alreadyList: [],
    recomendList: []
  },
  mutations: {
    setAlreadyList (state, playload) {
      state.alreadyList = playload
    },
    setRecomendList (state, playload) {
      console.log(playload)
      state.recomendList = playload
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
        if (res.data.status === 'success') {
          context.commit('setAlreadyList', res.data.data)
          return 'success'
        } else {
          return 'fail'
        }
      })
    },
    getRecomendList (context, api) {
      return axios.get(api).then(res => {
        console.log(res)
        if (res.data.status === 'success') {
          console.log('xxxxxxxxxxxxxxx')
          context.commit('setRecomendList', res.data.data)
          return 'success'
        } else {
          return 'fail'
        }
      })
    }
  }
}

export default concern
