import Vuex from 'vuex'
import Vue from 'vue'
import userBasic from './userBasic'
import newArtical from './newArtical'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    userBasic,
    newArtical
  }
})

export default store
