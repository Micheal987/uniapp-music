class user {
	constructor({
		id
	}) {
		this.id = id
	}
}
const userids = (val) => {
	let map = new Map()
	let userid = []
	userid =
		val.ids.map((items, index) => {
			return items
		})
	return new user({
		id: userid,
	})
}
const songdata = (val) => {
	let song = {
		picurL: val[0].al.picUrl
	}
	return song
}
export {
	userids,
	user,
	songdata
}
