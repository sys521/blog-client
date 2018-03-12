import Vuex from 'vuex'
import Vue from 'vue'
import authorInfo from './authorInfo'
import newArtical from './newArtical'
import concern from './concern'
import myDetail from './myDetail'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    authorInfo,
    newArtical,
    concern,
    myDetail
  }
})

export default store
