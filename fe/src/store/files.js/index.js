const state = () => ({
  currentFolder: ['/']
})

const mutations = {
  changeFolder (state, payload) {
    state.currentFolder = payload
  }
}

const actions = {
  changeFolder ({ commit }, payload) {
    commit('changeFolder', payload)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
