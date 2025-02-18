import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import uView from '@/uview-ui'
import store from "@/store/index.js"
Vue.config.productionTip = false
App.mpType = 'app'
Vue.use(uView)
const app = new Vue({
	...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
