const obj_radios = (res) => {
	const radio = {
		name: res.data.name,
		picUrl: res.data.picUrl,
		rcmdText: res.data.rcmdText,
		dj: {
			avatarUrl: res.data.dj.avatarUrl,
			nickname: res.data.dj.nickname,
			backgroundUrl: res.data.dj.backgroundUrl
		}
	}
	return radio
}
const radiourl =(val)=>{
	const raidourl ={
		url:`https://music.163.com/song/media/outer/url?id=${val.mainSong.id}.mp3`
	}
	return raidourl
} 
export {
	obj_radios,
	radiourl
}
