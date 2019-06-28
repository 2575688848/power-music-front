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
			</el-row>
		</div>
		<div id="music">
			<a-player :v-if='isShow' :autoplay='true' :music="music" :showLrc="true"></a-player>
		</div>
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
				music: {},
				isShow: false,
			}
		},
		created: function() {
			var self = this;
			var url = self.$store.state.songListUrl;
			self.axios.get(url)
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
					console.log("哈哈哈哈: HotMusic报错了");
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
		left: 300px;
		right: 0px;
		bottom: 0px;
		margin: auto;
		z-index:1;
	}

	.point {
		cursor: pointer;
	}

	#music {
		position: fixed;
		bottom: 0;
		width: 100%;
		z-index:2;
	}
</style>
