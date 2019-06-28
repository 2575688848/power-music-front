<template>
	<div id="hotMV">
		<bar></bar>
		<netTab></netTab>
		<template>
			<el-row :gutter="40" style="border-collapse:separate; border-spacing:0px 5px;" v-for="(page, index) in pages" :key="index"
			 :index="index">
				<el-col :span="6" v-for="(item, innerIndex) in page" :index="innerIndex" :key="innerIndex">
					<el-card :body-style="{ padding: '10px'}">
						<a :href="item.url"><img :src="item.pic" class="image" style="cursor: pointer;"></a>
						<div style="padding: 10px;">
							<span style="width:250px; height:20px; display:block; overflow:hidden;">{{item.name}}</span>
							<!-- <span>{{item.singer}}</span> -->
							<div style="margin-top: 15px;">
								{{item.singer}}
								<img class="button" @click="addMV(item)" src="../assets/images/collect.ico" width=30px height=30px style="cursor: pointer;"/>
							</div>
							<div class="bottom clearfix">
								<span>{{item.publictime}}</span>
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
		name: 'hotMV',
		components: {
			Bar,
			NetTab
		},
		data() {
			return {
				mvList: []
			}
		},
		computed: {
			pages() {
				const pages = []
				this.mvList.forEach((item, index) => {
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
			self.axios.get('/api/v1/qqMusic/hotMusicVideo?limit=80&offset=0')
				.then(function(response) {
					if (response.data.isSuccess) {
						self.mvList = response.data.data;
					} else {
						self.$message.error(response.data.resultMsg)
					}
				})
				.catch(function(error) {
					console.log("哈哈哈哈: hotMV报错了");
				});
		},
		methods: {
			addMV(item) {
				var self = this;
				var user = JSON.parse(sessionStorage.getItem('user'));
				if (user == null) {
					self.$message({
						type: 'warning',
						message: '你还没登录，请登录后再操作'
					});
					return;
				}
				let musicVideo = {
					userId: user.id,
					name: item.name,
					pic: item.pic,
					singer: item.singer,
					publictime: item.publictime,
					url: item.url
				};
				self.axios.post('/api/v1/localMusic/addMusicVideo', musicVideo)
					.then(function(response) {
						if (response.data.isSuccess) {
							self.$message({
								type: 'success',
								message: '收藏了一个MV到本地'
							});
						} else {
							self.$message({
								type: 'error',
								message: response.data.resultMsg
							});
						}
					})
					.catch(function(error) {
						console.log("哈哈哈哈: hotMV 添加mv报错了");
					});
			}
		}
	}
</script>

<style>
	#hotMV {
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
