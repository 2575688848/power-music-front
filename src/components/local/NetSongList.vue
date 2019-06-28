<template>
	<div id="netSongList">
		<localBar></localBar>
		<div id="tab">
			<el-menu class="el-menu-demo" mode="horizontal" background-color="#fff" text-color="#000000" active-text-color="#000000">
				<el-menu-item index="1" style='font-size: 10px;'>
					<router-link to="/local/localSongList">本地歌单</router-link>
				</el-menu-item>
				<el-menu-item index="2" style='font-size: 10px;'>
					<span>网易云歌单</span>
				</el-menu-item>
			</el-menu>
		</div>
		<div id="card-list">
			<el-card class="box-card" v-for="(item, index) in songList" :index="index" :key="index">
				<img :src="item.coverImgUrl" width=50px height=50px class="little-card" @click="playSongs(item.id)" id="img1" />
				<span class="little-card">{{item.title}}</span>
				<span class="little-card">歌曲数:{{item.songNum}}</span>
				<span class="little-card">播放量:{{item.playCount}}</span>
			</el-card>
		</div>
	</div>
</template>

<script>
	import LocalBar from './LocalBar.vue'
	export default {
		name: 'netSongList',
		components: {
			LocalBar,
		},
		data() {
			return {
				msg: 'Welcome to Your Vue.js App',
				songList: []
			}
		},
		methods: {
			playSongs(id) {
				var url = '/api/v1/NetEaseMusic/songs/' + id;
				this.$store.commit('newUrl', url);
				this.$router.push('/local/playMusic');
			}
		},
		created: function() {
			var self = this;
			var user = JSON.parse(sessionStorage.getItem('user'));
			if (user.easeId == null) {
				const h = self.$createElement;
				self.$message({
					message: h('p', null, [
						h('i', {
							style: 'color: teal'
						}, '你还没有关联网易云账号，请关联重试！')
					])
				});
			} else {
				self.axios.get('/api/v1/NetEaseMusic/songList/' + user.easeId)
					.then(function(response) {
						if (response.data.isSuccess) {
							self.songList = response.data.data;
						} else {
							self.$message.error(response.data.resultMsg)
						}
					})
					.catch(function(error) {
						console.log("哈哈哈哈: netSongList报错了");
					});
			}
		}
	}
</script>

<style>
	.submit-btn {
		width: 350px;
	}

	#card-list {
		position: absolute;
		top: 180px;
		left: 33%;
	}

	.little-card {
		margin-left: 30px;
	}

	#tab {
		width: 100%;
		position: fixed;
		top: 80px;
		left: 10%;
		right: 0px;
		z-index: 2;
	}

	#img1 {
		cursor: pointer;
	}

	.box-card {
		width: 100%;
		margin-top: 10px;
	}
</style>
