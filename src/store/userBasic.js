import axios from 'axios'
axios.defaults.withCredentials = true
const userBasic = {
  state: {
    basicInfo: {
      user_email: null,
      user_displayName: null,
      user_header: null,
      concerns: []
    },
    authorInfo: {
      articalNum: null,
      loveNum: null,
      concernNum: null
    }
  },
  mutations: {
    setAuthorInfo (state, playload) {
      console.log(playload)
      state.authorInfo = Object.assign({}, state.authorInfo, playload)
    },
    setBasicInfo (state, playload) {
      console.log(playload)
      state.basicInfo = Object.assign({}, state.basicInfo, playload)
    },
    setUserHeader (state, playload) {
      state.basicInfo.user_header = playload
    },
    setUserName (state, playload) {
      state.basicInfo.user_displayName = playload
    }
  },
  getters: {
    getUserBasic (state) {
      return state.basicInfo
    },
    getAuthorInfo (state) {
      return state.authorInfo
    }
  },
  actions: {
    getUserBasic (context, api) {
      return axios.get(api).then(res => {
        if (res.data.status === 'success') {
          context.commit('setBasicInfo', res.data.data)
          return 'success'
        } else {
          return 'fail'
        }
      })
    },
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
export default userBasic
