import Vuex from 'vuex'
import Vue from 'vue'
import userBasic from './userBasic'
import newArtical from './newArtical'
import concernList from './concern'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    userBasic,
    newArtical,
    concernList
  }
})

export default store
