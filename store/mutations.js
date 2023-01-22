const mutation = {
	curtime(state, val) {
		state.songs.currentimer = val
	},
	durtime(state, val) {
		state.songs.maxtimer = val
	}
}
export default mutation
