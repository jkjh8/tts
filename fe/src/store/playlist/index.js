const state = () => ({
  currentPlaylist: 0,
  playlistnames: [],
  playlistitems: []
})

const mutations = {
  updatePlaylistNames (state, payload) {
    state.playlistnames = payload
  },
  updatePlaylistItems (state, payload) {
    state.playlistitems = payload
  },
  updateCurrentPlaylist (state, payload) {
    state.currentPlaylist = payload
  }
}

const actions = {
  updatePlaylistNames ({ commit }, payload) {
    commit('updatePlaylistNames', payload)
  },
  updatePlaylistItems ({ commit }, payload) {
    commit('updatePlaylistItems', payload)
  },
  updateCurrentPlaylist ({ commit }, payload) {
    commit('updateCurrentPlaylist', payload)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
