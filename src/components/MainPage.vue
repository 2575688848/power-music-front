<template>
	<div id="app">
		<bar></bar>
		<netTab></netTab>
		<div id="a">
			<el-row v-for="(item, index) in songList" :index="index" :key="index">
				<el-col :span="4">
					<div class="grid-content ">
						{{index+1}}&nbsp;&nbsp;&nbsp;&nbsp;
						<img :src="item.pic" width=50px height=50px />
					</div>
				</el-col>
				<el-col :span="4">
					<div class="grid-content ">{{item.name}}</div>
				</el-col>
				<el-col :span="4">
					<div class="grid-content ">{{item.singer}}</div>
				</el-col>
				<el-col :span="4">
					<div class="grid-content">
						<img src="../assets/images/play.ico" width=30px height=30px @click='playMusic(index)' class="point" />
					</div>
				</el-col>
				<el-col :span="4">
					<div class="grid-content ">
						<a :href="item.url"><img src="../assets/images/download.ico" width=30px height=30px /></a>
					</div>
				</el-col>
				<el-col :span="4">
					<div class="grid-content ">{{parseInt(item.time/60)}}:{{item.time%60}}</div>
				</el-col>
				<el-col>
					<img src="../assets/images/collect.ico" width=30px height=30px @click='collect(item)' class="point" />
				</el-col>
			</el-row>
		</div>
		<div id="music">
			<a-player :v-if='isShow' :autoplay='true' :music="music" :showLrc="true"></a-player>
		</div>
		<el-dialog title="选择你要添加的歌单" :visible.sync="dialogFormVisible">
			<el-form :model="form">
				<el-form-item label="我的歌单" :label-width="formLabelWidth">
					<el-select v-model="form.songListId" placeholder="请选择歌单">
						<el-option :label="item.folderName" :value="item.id" v-for="(item, index) in songFolder" :index="index" :key="index"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="音乐分类" :label-width="formLabelWidth">
					<el-select v-model="form.sortName" placeholder="请选择分类">
						<el-option :label="item.name" :value="item.name" v-for="(item, index) in songSort" :index="index" :key="index"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="ensureCollect()">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import Bar from './Bar'
	import NetTab from './NetTab'
	import VueAplayer from 'vue-aplayer'
	export default {
		name: 'app',
		components: {
			Bar,
			NetTab,
			'a-player': VueAplayer
		},
		data() {
			return {
				songList: [],
				songFolder: [],
				songSort: [],
				music: {},
				songDO: {},
				isShow: false,
				dialogFormVisible: false,
				form: {
					name: '',
					sortName: '',
					songListId: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
				formLabelWidth: '120px'
			}
		},
		created: function() {
			var self = this;
			var user = JSON.parse(sessionStorage.getItem('user'));
			self.axios.get('/api/v1/NetEaseMusic/songs/2784115857', {
					headers: {
						'token': 'application/x-www-form-urlencoded'
					}
				})
				.then(function(response) {
					if (response.data.isSuccess) {
						self.songList = response.data.data.songs;
						let obj = {
							title: self.songList[0].name,
							artist: self.songList[0].singer,
							src: self.songList[0].url,
							pic: self.songList[0].pic,
							lrc: self.songList[0].lrc
						};
						self.music = obj;
						self.isShow = true;
					} else {
						self.$message.error(response.data.resultMsg)
					}
				})
				.catch(function(error) {
					console.log("哈哈哈哈: mainPage报错了");
				});
			self.axios.get('/api/v1/localMusic/' + user.id)
				.then(function(response) {
					if (response.data.isSuccess) {
						self.songFolder = response.data.data;
					} else {
						self.$message.error(response.data.resultMsg)
					}
				})
				.catch(function(error) {
					console.log("哈哈哈哈: playMusic 获取歌单报错了");
				});
			self.axios.get('/api/v1/localMusic/sorts')
				.then(function(response) {
					if (response.data.isSuccess) {
						self.songSort = response.data.data;
					} else {
						self.$message.error(response.data.resultMsg)
					}
				})
				.catch(function(error) {
					console.log("哈哈哈哈: playMusic 获取分类报错了");
				});
		},
		methods: {
			playMusic: function(index) {
				var self = this;
				let obj = {
					title: self.songList[index].name,
					artist: self.songList[index].singer,
					src: self.songList[index].url,
					pic: self.songList[index].pic,
					lrc: self.songList[index].lrc
				};
				self.music = obj;
			},
			collect(item) {
				var self = this;
				self.songDO = item;
				var user = JSON.parse(sessionStorage.getItem('user'));
				if (user == null) {
					self.$message({
						type: 'warning',
						message: '你还没登录，请登录后操作'
					});
					return;
				}
				self.dialogFormVisible = true;
			},
			ensureCollect() {
				var self = this;
				var user = JSON.parse(sessionStorage.getItem('user'));
				let song = {
					userId: user.id,
					songId: self.songDO.id,
					folderId: self.form.songListId,
					songType: self.form.sortName,
					name: self.songDO.name,
					singer: self.songDO.singer,
					url: self.songDO.url,
					pic: self.songDO.pic,
					lrc: self.songDO.lrc,
					time: self.songDO.time
				};
				self.axios.post('/api/v1/localMusic/addSong', song)
					.then(function(response) {
						if (response.data.isSuccess) {
							self.$message({
								type: 'success',
								message: '收藏了一首歌到本地'
							});
						} else {
							self.$message({
								type: 'error',
								message: response.data.resultMsg
							});
						}
					})
					.catch(function(error) {
						console.log("哈哈哈哈: playMusic 获取歌单报错了");
					});
				self.dialogFormVisible = false;
			}
		}
	}
</script>

<style>
	.el-row {
		margin-bottom: 20px;

		&:last-child {
			margin-bottom: 0;
		}
	}

	.el-col {
		border-radius: 10px;
		width: 150px;
		text-align: center;

	}

	.bg-purple-dark {
		background: #99a9bf;
	}

	.bg-purple {
		background: #d3dce6;
	}

	.bg-purple-light {
		background: #e5e9f2;
	}

	.grid-content {
		border-radius: 4px;
		min-height: 50px;
		text-align: center;
	}

	.row-bg {
		padding: 10px 0;
		background-color: #f9fafc;
	}

	#a {
		position: absolute;
		top: 180px;
		left: 21%;
		right: 0px;
		bottom: 0px;
		margin: auto;
		z-index: 1;
	}

	.point {
		cursor: pointer;
	}

	#music {
		position: fixed;
		bottom: 0;
		width: 100%;
		z-index: 2;
	}
</style>
