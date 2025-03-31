import { createStore } from 'vuex'

export default createStore({
  state: {
    userId: -1
  },
  mutations: {
    setUserId(state, id) {
      state.userId = id
    }
  },
  actions: {
    updateUserId({ commit }, id) {
      commit('setUserId', id)
    }
  }
})
