const actions = {
	curtime(context, val) {
		context.commit('curtime',val)
	},
	durtime(context, val) {
		context.commit('durtime',val)
	}
}
export default actions
