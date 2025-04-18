import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  state: {
    userId: -1,
    github: "https://github.com/SJTU-IPADS/PowerInfer",
    email: "",
    twitter: "",
    reddit: ""
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
  },
  plugins: [createPersistedState({
    key: 'powerinfer-store',
    storage: window.localStorage,
    paths: ['userId']
  })]
})
