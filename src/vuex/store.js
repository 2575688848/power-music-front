import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
		songListUrl:'',
		netSongListUrl:'',
		searchSongs:[],
		searchMVs:[],
		albumList:[],
		user: {
			username:'',
			nickname:'' 
		},
		netUserList:[]
	},
	mutations: {
		newUrl (state, url){
			state.songListUrl = url;
		},
		newNetUrl(state, url) {
			state.netSongListUrl = url;
		},
		newSearchSongs(state, songs){
			state.searchSongs = songs;
		},
		newSearchMV(state, mvs){
			state.searchMVs = mvs;
		},
		newAlbumList(state, album){
			state.albumList = album;
		},
		newUser(state, userInfo){
			state.user = userInfo;
		},
		newNetUserList(state, netUser){
			state.netUserList = netUser;
		}
	}
})

export default store
