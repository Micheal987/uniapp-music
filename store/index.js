import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import state from './state.js'
import getters from "./getter.js"
import actions from "./actions.js"
Vue.use(Vuex)
const store = new Vuex.Store({
	state,
	mutations,
	getters,
	actions
})
export default store
