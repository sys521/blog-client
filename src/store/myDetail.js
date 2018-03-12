import axios from 'axios'
axios.defaults.withCredentials = true

const myDetail = {
  state: {
    detail: {
      user_id: null,
      user_email: null,
      user_displayName: null,
      user_header: null
    }
  },
  mutations: {
    setMyDetail (state, playload) {
      console.log(playload)
      state.detail = Object.assign({}, state.detail, playload)
    },
    setUserName (state, playload) {
      state.detail.user_displayName = playload
    },
    setUserHeader (state, playload) {
      state.detail.user_header = playload
    },
    clearMyDetail (state) {
      state.detail = {
        user_id: null,
        user_email: null,
        user_displayName: null,
        user_header: null
      }
    }
  },
  getters: {
    getMyDetail (state) {
      return state.detail
    }
  },
  actions: {
    getMyDetail (context, api) {
      return axios.get(api).then(res => {
        if (res.data.status === 'success') {
          context.commit('setMyDetail', res.data.data)
          return 'success'
        } else {
          return 'fail'
        }
      })
    }
  }
}

export default myDetail
