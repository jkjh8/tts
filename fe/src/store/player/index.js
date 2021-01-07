const state = () => ({
  curFile: null,
  curFileInfo: null,
  curDuration: '',
  curPlayTime: '0'
})

const mutations = {
  updatePlayFile (state, payload) {
    state.curFile = payload
  },
  updatePlayFileInfo (state, payload) {
    state.curFileInfo = payload
  },
  updateDuration (state, payload) {
    state.curDuration = payload
  },
  updatePlayTime (state, payload) {
    state.curPlayTime = payload
  }
}

const actions = {
  updatePlayFile ({ commit }, payload) {
    commit('updatePlayFile', payload)
  },
  updatePlayFileInfo ({ commit }, payload) {
    commit('updatePlayFileInfo', payload)
  },
  updateDuration ({ commit }, payload) {
    commit('updateDuration', payload)
    console.log(payload)
  },
  updatePlayTime ({ commit }, payload) {
    commit('updatePlayTime', payload)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
