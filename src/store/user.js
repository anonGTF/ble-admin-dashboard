import axios from "axios"

function state() {
  return {
      token: null,
      user: null
  }
}

const mutations = {
  setToken(state, { token }) {
    state.token = token
  },
  setUser(state, { user }) {
    state.user = user
  }
}

const getters = {
  getToken(state) {
      return state.token;
  },
  getUser(state) {
    return state.user;
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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}