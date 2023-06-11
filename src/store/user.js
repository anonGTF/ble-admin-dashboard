import axios from "axios"

function state() {
  return {
      token: null,
      expiredMillis: 0,
      user: null
  }
}

const mutations = {
  setToken(state, { token }) {
    state.token = token
  },
  setUser(state, { user }) {
    state.user = user
  },
  setExpirationMillis(state, { expiredMillis }) {
    state.expiredMillis = expiredMillis
  }
}

const getters = {
  getToken(state) {
      return state.token;
  },
  getUser(state) {
    return state.user;
  },
  getExpirationMillis(state) {
    return state.expiredMillis
  }
}

const actions = {
  saveToken({ commit }, { token }) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token.accessToken}`;
      axios.defaults.headers['x-refresh-token'] = token.refreshToken
      commit('setToken', {
          token
      })
  },
  resetToken({ commit }) {
      commit('setToken', {
          token: null
      })
  },
  saveUser({ commit }, { user }) {
    commit('setUser', {
        user
    })
  },
  resetUser({ commit }) {
      commit('setUser', {
          user: null
      })
  },
  saveExpirationMillis({ commit }, { expiredMillis }) {
    commit('setExpirationMillis', {
        expiredMillis
    })
  },
  resetExpirationMillis({ commit }) {
      commit('setExpirationMillis', {
          expiredMillis: 0
      })
  },
  reset({ commit }) {
    commit('setUser', {
      user: null
    })
    commit('setToken', {
      token: null
    })
    commit('setExpirationMillis', {
      expiredMillis: 0
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}