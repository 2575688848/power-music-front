<template>
	<div id="localMV">
		<localBar></localBar>
		<template>
			<el-row :gutter="40" style="border-collapse:separate; border-spacing:0px 5px;" v-for="(page, index) in pages" :key="index" :index="index">
				<el-col :span="6" v-for="(item, innerIndex) in page" :index="innerIndex" :key="innerIndex">
					<el-card :body-style="{ padding: '10px'}">
						<a :href="item.url"><img :src="item.pic" class="image" style="cursor: pointer;"></a>
						<div style="padding: 10px;">
							<span style="width:250px; height:20px; display:block; overflow:hidden;">{{item.name}}</span>
							<div style="margin-top: 10px; ">
								<img @click="delete1(item.id)" src="../../assets/images/deleteRed.ico" width=30px height=30px style="cursor: pointer;"/>
							</div>
							<div class="bottom clearfix">
								<span>{{item.singer}}</span>
								<span class="button">{{item.publictime}}</span>
							</div>
						</div>
					</el-card>
				</el-col>
			</el-row>
		</template>
	</div>
</template>

<script>
	import LocalBar from './LocalBar.vue'
	export default {
		name: 'localMV',
		components: {
			LocalBar,
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
			var user = JSON.parse(sessionStorage.getItem('user'));
			self.axios.get('/api/v1/localMusic/musicVideo/' + user.id)
				.then(function(response) {
					if (response.data.isSuccess) {
						self.mvList = response.data.data;
					} else {
						self.$message.error(response.data.resultMsg)
					}
				})
				.catch(function(error) {
					console.log("哈哈哈哈: localMV报错了");
				});
		},
		methods: {
			delete1(id) {
				this.$confirm('此操作将永久删除该MV, 是否继续?', '删除MV', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.axios.delete('/api/v1/localMusic/musicVideo/' + id)
						.then((response) => {
							if (!response.data.data) {
								this.$message({
									type: 'info',
									message: '删除MV失败，请刷新重试'
								});
							} else {
								this.$message({
									type: 'success',
									message: '删除成功'
								});
								this.$router.go(0);
							}
						});
				}).catch(() => {});
			}
		}
	}
</script>

<style>
	#localMV {
		position: absolute;
		top: 150px;
		left: 200px;
		right: 100px;
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
		margin-top: 0px;
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
