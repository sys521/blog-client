import axios from 'axios'
axios.defaults.withCredentials = true
const userBasic = {
  state: {
    basicInfo: {
      user_email: null,
      user_displayName: null,
      user_header: null
    }
  },
  mutations: {
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
    }
  }
}
export default userBasic
