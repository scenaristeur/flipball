import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    table: null,
    rotationSpeed : 0.3
  },
  mutations: {
    setTable (state, t){
      console.log(t)
    state.table = t
  },
  setRotationSpeed (state, s){
    state.rotationSpeed = s
  }
  },
  actions: {
  },
  modules: {
  }
})
