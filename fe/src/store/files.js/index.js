const state = () => ({
  currentFolder: [],
  filelist: []
})

const mutations = {
  changeFolder (state, payload) {
    state.currentFolder = payload
  },
  updateFiles (state, payload) {
    state.filelist = payload
  }
}

const actions = {
  changeFolder ({ commit }, payload) {
    commit('changeFolder', payload)
  },
  updateFiles ({ commit }, payload) {
    commit('updateFiles', payload)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
