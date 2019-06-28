<template>
	<div id="app">
		<bar></bar>
		<div id="netTab">
			<div id = "tab">
				<el-menu class="el-menu-demo" mode="horizontal" background-color="#fff" text-color="#000000" active-text-color="#000000">
					<el-menu-item index="1" style='font-size: 10px;'>
						<router-link to="/main">热门歌曲</router-link>
					</el-menu-item>
					<el-menu-item index="2" style='font-size: 10px;'>
						<router-link to="/songlist">热门歌单</router-link>
					</el-menu-item>
					<el-menu-item index="3" style='font-size: 10px;'>
						<router-link to="/hotmv">热门MV</router-link>
					</el-menu-item>
				</el-menu>
			</div>
		</div>
		<div id="a">
			<el-row v-for="(item, index) in songList" :index="index" :key="index">
				<el-col :span="4">
					<div class="grid-content ">
						{{index+1}}&nbsp;&nbsp;&nbsp;&nbsp;
						<img :src="item.pic" width=50px height=50px onerror="this.src='/src/assets/images/music.ico'"/>
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
			self.songList = self.$store.state.searchSongs;
			let obj = {
				title: self.songList[0].name,
				artist: self.songList[0].singer,
				src: self.songList[0].url,
				pic: self.songList[0].pic,
				lrc: self.songList[0].lrc
			};
			self.music = obj;
			self.isShow = true;
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
	#tab {
		width: 100%;
		position: fixed;
		top: 80px;
		left: 150px;
		right: 0px;
		z-index: 2;
	}
</style>
