import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    table: null
  },
  mutations: {
    setTable (state, t){
      console.log(t)
    state.table = t
  },
  },
  actions: {
  },
  modules: {
  }
})
