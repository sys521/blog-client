import axios from 'axios'
axios.defaults.withCredentials = true

const newArtical = {
  state: {
    newArticalId: ''
  },
  getters: {
    getArticalId (state) {
      return state.newArticalId
    }
  },
  mutations: {
    setNewArticalId (state, playload) {
      state.newArticalId = playload
    }
  },
  actions: {
    getNewArticalId (context, api) {
      return axios.get(api).then(res => {
        if (res.data.status === 'success') {
          console.log(res.data.data)
          context.commit('setNewArticalId', res.data.data)
          return 'success'
        } else {
          return 'fail'
        }
      })
    }
  }
}
export default newArtical
