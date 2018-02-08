import axios from 'axios'
axios.defaults.withCredentials = true

const userBasic = {
  state: {
    basicInfo: {}
  },
  mutations: {
    setBasicInfo (state, playload) {
      state.basicInfo = Object.assign({}, state.basicInfo, playload)
    }
  },
  getters: {
    getUserBasic (state) {
      return state.basicInfo
    }
  }
}
export default userBasic
