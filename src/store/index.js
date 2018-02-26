import Vuex from 'vuex'
import Vue from 'vue'
import userBasic from './userBasic'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    userBasic
  }
})

export default store
