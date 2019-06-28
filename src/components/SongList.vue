<template>
	<div id="songList">
		<bar></bar>
		<netTab></netTab>
		<template>
			<el-row :gutter="40" v-for="(page, index) in pages" :key="index" :index="index">
				<el-col :span="6" v-for="(item, innerIndex) in page" :index="innerIndex" :key="innerIndex">
					<el-card :body-style="{ padding: '0px'}">
						<img :src="item.pic" class="image" @click="playSongList(item.id)" style="cursor: pointer;">
						<div style="padding: 10px;">
							<span>{{item.name}}</span>
							<div class="bottom clearfix">
								<span>{{item.createTime}}</span>
								<span class="button">播放量:{{item.playCount}}</span>
							</div>
						</div>
					</el-card>
				</el-col>
			</el-row>
		</template>
	</div>
</template>

<script>
	import Bar from './Bar'
	import NetTab from './NetTab'
	export default {
		name: 'songList',
		components: {
			Bar,
			NetTab
		},
		data() {
			return {
				songList: []
			}
		},
		computed: {
			pages() {
				const pages = []
				this.songList.forEach((item, index) => {
					const page = Math.floor(index / 4)
					if (!pages[page]) {
						pages[page] = []
					}
					pages[page].push(item)
				})
				return pages
			}
		},
		created: function() {
			var self = this;
			self.axios.get('/api/v1/qqMusic/songsOfCategory/10000000')
				.then(function(response) {
					if (response.data.isSuccess) {
						self.songList = response.data.data;
					} else {
						self.$message.error(response.data.resultMsg)
					}
				})
				.catch(function(error) {
					console.log("哈哈哈哈: songlist报错了");
				});
		},
		methods: {
			playSongList(id) {
				var url = '/api/v1/qqMusic/songList/' + id;
				this.$store.commit('newUrl', url);
				this.$router.push('/hotmusic');
			}
		}
	}
</script>

<style>
	#songList {
		position: absolute;
		top: 200px;
		left: 50px;
		right: 50px;
		bottom: 0px;
		margin: auto;
		z-index: 1;
	}
	
	.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 40px;
    }
  }

	.time {
		font-size: 13px;
		color: #999;
	}

	.bottom {
		margin-top: 13px;
		line-height: 12px;
	}

	.button {
		padding: 0;
		float: right;
	}

	.image {
		width: 100%;
		display: block;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}

	.clearfix:after {
		clear: both
	}
</style>
