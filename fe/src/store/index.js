import Vue from 'vue'
import Vuex from 'vuex'
import users from './users'
import playlist from './playlist'
import files from './files'
import player from './player'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    users,
    playlist,
    files,
    player
  }
})
