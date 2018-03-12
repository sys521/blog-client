import axios from 'axios'
axios.defaults.withCredentials = true
const authorInfo = {
  state: {
    author: {
      userInfo: {
        user_id: null,
        user_displayName: null,
        user_header: null
      },
      articalNum: null,
      loveNum: null,
      concernNum: null
    }
  },
  mutations: {
    setAuthorInfo (state, playload) {
      console.log(playload)
      state.author = Object.assign({}, state.authorInfo, playload)
    },
    clearAuthorInfo (state, playload) {
      state.author = {
        userInfo: {
          user_id: null,
          user_displayName: null,
          user_header: null
        },
        articalNum: null,
        loveNum: null,
        concernNum: null
      }
    }
  },
  getters: {
    getAuthorInfo (state) {
      return state.author
    }
  },
  actions: {
    getAuthorInfo (context, api) {
      return axios.get(api).then(res => {
        if (res.data.status === 'success') {
          console.log(res.data.data)
          context.commit('setAuthorInfo', res.data.data)
          return 'success'
        } else {
          return 'error'
        }
      })
    }
  }
}
export default authorInfo
