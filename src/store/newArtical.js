import axios from 'axios'
axios.defaults.withCredentials = true

const newArtical = {
  state: {
    newArticalName: ''
  },
  getters: {
    getArticalName (state) {
      return state.newArticalName
    }
  },
  mutations: {
    setNewArticalName (state, playload) {
      state.newArticalName = playload
    }
  },
  actions: {
    getNewArticalName (context, api) {
      return axios.get(api).then(res => {
        return res
      })
    }
  }
}
export default newArtical
