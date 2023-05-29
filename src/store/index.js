import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

import notification from "./notification"
import process from "./process"
import user from "./user"

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default new Vuex.Store({
  state: {
  },
  modules: {
    notification,
    process,
    user
  },
  plugins: [vuexLocal.plugin]
})
