const state = () => ({
  currentFolder: [],
  filelist: [],
  loading: true
})

const mutations = {
  changeFolder (state, payload) {
    state.currentFolder = payload
  },
  updateFiles (state, payload) {
    state.filelist = payload
  },
  changeLoadState (state, payload) {
    state.loading = payload
  }
}

const actions = {
  changeFolder ({ commit }, payload) {
    commit('changeFolder', payload)
  },
  updateFiles ({ commit }, payload) {
    commit('updateFiles', payload)
  },
  changeLoadState ({ commit }, payload) {
    commit('changeLoadState', payload)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
