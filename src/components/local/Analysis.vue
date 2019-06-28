<template>
	<div id="app">
		<localBar></localBar>
		<div class="block1 b2">
			<el-timeline>
				<el-timeline-item :timestamp="analysis.date" placement="top">
					<el-card>
						<h4>本月分析概述</h4>
						<p>{{analysis.analysis1}}</p>
						<p>{{analysis.analysis2}}</p>
						<p>{{analysis.analysis3}}</p>
						<h4>下面是你的本月月度歌单：</h4>
					</el-card>
				</el-timeline-item>
			</el-timeline>
		</div>
		<div id="a" class="b2">
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
						<img src="../../assets/images/play.ico" width=30px height=30px @click='playMusic(index)' class="point" />
					</div>
				</el-col>
				<el-col :span="4">
					<div class="grid-content ">
						<a :href="item.url"><img src="../../assets/images/download.ico" width=30px height=30px /></a>
					</div>
				</el-col>
				<el-col :span="4">
					<div class="grid-content ">{{parseInt(item.time/60)}}:{{item.time%60}}</div>
				</el-col>
			</el-row>
		</div>
		<div id="music">
			<a-player :v-if='isShow' :autoplay='true' :music="music" :showLrc="true"></a-player>
		</div>
	</div>
</template>

<script>
	import LocalBar from './LocalBar.vue'
	import VueAplayer from 'vue-aplayer'
	export default {
		name: 'app',
		components: {
			LocalBar,
			'a-player': VueAplayer
		},
		data() {
			return {
				msg: 'Welcome to Your Vue.js App',
				analysis: {},
				songList: [],
				music: {},
				isShow: false
			}
		},
		created: function() {
			var self = this;
			var user = JSON.parse(sessionStorage.getItem('user'));
			self.axios.get('/api/v1/user/analysis/' + user.id)
				.then(function(response) {
					if (response.data.isSuccess) {
						self.analysis = response.data.data;
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
					console.log("哈哈哈哈: analysis报错了");
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
				self.axios.put('/api/v1/localMusic/updateSongPlayCount?id=' + self.songList[index].id)
					.then((response) => {});
			}
		}
	}
</script>

<style>
	.block1 {
		position: absolute;
		height: 100%;
		top: 120px;
		left: 200px;
		right: 20%;
		bottom: 0px;
		z-index: 1;
	}
	.b2{
		margin-top: 0px;
	}

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
		top: 500px;
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
		z-index: 4;
	}
</style>
