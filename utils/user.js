const userdatas = (items) => {
	const userfile ={
		backgroundUrl:items.profile.backgroundUrl,
		avatarUrl:items.profile.avatarUrl,
		nickname:items.profile.nickname,
		follows:items.profile.follows,
		followeds:items.profile.followeds,
		djStatus:items.profile.djStatus,
		createTime:items.profile.createTime
	}
	return userfile
}

export {
	userdatas
}