<template>
	<div id="localSongList">
		<localBar></localBar>
		<div id="tab">
			<el-menu class="el-menu-demo" mode="horizontal" background-color="#fff" text-color="#000000" active-text-color="#000000">
				<el-menu-item index="1" style='font-size: 10px;'>
					<router-link to="/local/localSongList">本地歌单</router-link>
				</el-menu-item>
				<el-menu-item index="2" style='font-size: 10px;'>
					<router-link to="/local/netSongList">网易云歌单</router-link>
				</el-menu-item>
			</el-menu>
		</div>
		<div id="card-list">
			<el-card class="box-card1" v-for="(item, index) in songList" :index="index" :key="index">
				<img src="../../assets/images/music.ico" width=50px height=50px class="little-card" @click="playSongs(item.id)" id="img1" />
				<span class="little-card">{{item.folderName}}</span>
				<span class="little-card">歌曲数{{item.songCount}}</span>
				<span class="little-card">播放量:{{item.playCount}}</span>
				<img src="../../assets/images/delete.ico" width=30px height=30px class="card-2" @click="delete1(item.id)" id="img1" />
				<img src="../../assets/images/update.ico" width=30px height=30px class="card-2" @click="update1(item.id)" id="img1" />
			</el-card>
		</div>
		<div id='add-button'>
			<img src="../../assets/images/add.ico" width=50px height=50px @click="addFolder()" id="img1" />
		</div>
	</div>
</template>

<script>
	import LocalBar from './LocalBar.vue'
	export default {
		name: 'localSongList',
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
				this.axios.put('/api/v1/localMusic/update?id=' + id + '&type=2')
					.then((response) => {
						if (!response.data.data) {
							alert("播放歌单失败，请刷新重试");
						}
					});
				var url = '/api/v1/localMusic/music/' + id;
				sessionStorage.setItem('playLocalUrl',url);
				this.$router.push('/local/playLocalMusic');
			},
			update1(id) {
				this.$prompt('请输入歌单名', '重命名', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					inputPattern: /.+/,
					inputErrorMessage: '文件名不能为空哦'
				}).then(({
					value
				}) => {
					this.axios.put('/api/v1/localMusic/update?id=' + id + '&type=0' + '&folderName=' + value)
						.then((response) => {
							if (!response.data.data) {
								alert("编辑歌单失败，请刷新重试");
							} else {
								this.$message({
									type: 'success',
									message: '修改成功'
								});
								this.$router.go(0);
							}
						});
				}).catch(() => {});
			},
			delete1(id) {
				this.$confirm('此操作将永久删除该歌单, 是否继续?', '删除歌单', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.axios.delete('/api/v1/localMusic/' + id)
						.then((response) => {
							if (!response.data.data) {
								this.$message({
									type: 'info',
									message: '删除歌单失败，请刷新重试'
								});
							} else {
								this.$message({
									type: 'success',
									message: '修改成功'
								});
								this.$router.go(0);
							}
						});
				}).catch(() => {});
			},
			addFolder() {
				var user = JSON.parse(sessionStorage.getItem('user'));
				this.$prompt('请输入歌单名', '新建', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					inputPattern: /.+/,
					inputErrorMessage: '文件名不能为空哦'
				}).then(({
					value
				}) => {
					this.axios.post('/api/v1/localMusic/add', {
						userId: user.id,
						folderName: value
					})
						.then((response) => {
							if (!response.data.data) {
								alert("新建歌单失败，请刷新重试");
							} else {
								this.$message({
									type: 'success',
									message: '添加成功'
								});
								this.$router.go(0);
							}
						});
				}).catch(() => {});
			}
		},
		created: function() {
			var self = this;
			var user = JSON.parse(sessionStorage.getItem('user'));
			self.axios.get('/api/v1/localMusic/' + user.id)
				.then(function(response) {
					if (response.data.isSuccess) {
						self.songList = response.data.data;
					} else {
						self.$message.error(response.data.resultMsg)
					}
				})
				.catch(function(error) {
					console.log("哈哈哈哈: localSongList报错了");
				});
		}
	}
</script>

<style>
	.submit-btn {
		width: 350px;
	}
	
	#add-button {
		position: fixed;
		top: 200px;
		right: 3%;
	}

	#card-list {
		position: absolute;
		top: 180px;
		left: 33%;
	}

	.little-card {
		margin-left: 30px;
	}

	.card-2 {
		margin-left: 15px;
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

	.box-card1 {
		width: 100%;
		margin-top: 10px;
	}
</style>
