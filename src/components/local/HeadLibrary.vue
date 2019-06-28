<template>
	<div id="person">
		<localBar></localBar>
		<div id="tab">
			<el-menu class="el-menu-demo" mode="horizontal" background-color="#fff" text-color="#000000" active-text-color="#000000">
				<el-menu-item index="1" style='font-size: 10px;'>
					<router-link to="/local/person">基本信息</router-link>
				</el-menu-item>
				<el-menu-item index="2" style='font-size: 10px;'>
					<span @click="relationNetEase()">关联网易云</span>
				</el-menu-item>
				<el-menu-item index="3" style='font-size: 10px;'>
					<router-link to="/local/head">头像库</router-link>
				</el-menu-item>
			</el-menu>
		</div>
		<div>
			<span id="info">请选择一个图片作为你的头像</span>
			<div id='icon'>
			<el-row v-for="(page, index) in pages" :key="index" >
				<el-col :span="4" v-for="(item, innerIndex) in page" :index="innerIndex" :key="innerIndex">
					<div>
						<img :src="item" width=75px height=75px @click='updateUrl(item)' class="point" />
					</div>
				</el-col>
			</el-row>
			</div>
		</div>
	</div>
</template>

<script>
	import LocalBar from './LocalBar.vue'
	export default {
		name: 'person',
		components: {
			LocalBar,
		},
		data() {
			return {
				msg: 'Welcome to Your Vue.js App',
				list: [
					"/src/assets/images/person/head1.ico",
					"/src/assets/images/person/head2.ico",
					"/src/assets/images/person/head3.ico",
					"/src/assets/images/person/head4.ico",
					"/src/assets/images/person/head5.ico",
					"/src/assets/images/person/head6.ico",
					"/src/assets/images/person/head7.ico",
					"/src/assets/images/person/head8.ico",
					"/src/assets/images/person/head9.ico",
					"/src/assets/images/person/head10.ico",
					"/src/assets/images/person/head11.ico",
					"/src/assets/images/person/head12.ico",
					"/src/assets/images/person/head13.ico",
					"/src/assets/images/person/head14.ico"
				]
			}
		},
		computed: {
			pages() {
				const pages = []
				this.list.forEach((item, index) => {
					const page = Math.floor(index / 6)
					if (!pages[page]) {
						pages[page] = []
					}
					pages[page].push(item)
				})
				return pages
			}
		},
		methods: {
			updateUrl: function(url) {
				var self = this;
				var user = JSON.parse(sessionStorage.getItem('user'));
				user.url = url;
				var id = user.id;
				self.axios.put('/api/v1/user/update', {
						id: id,
						url: url
					})
					.then((response) => {
						if (!response.data.data) {
							alert("更换失败，请刷新重试");
						} else {
							sessionStorage.setItem('user', JSON.stringify(user));
							this.$message({
								message: '更换头像成功',
								type: 'success'
							});
						}
					})
			},
			relationNetEase() {
				var userSession= JSON.parse(sessionStorage.getItem('user'));
				if(userSession.easeId == null) {
					this.$router.push('/local/searchEaseUser');
				} else {
					var netUser= JSON.parse(sessionStorage.getItem('netUser'));
					if(netUser != null) {
						this.$router.push('/local/netUserInfo');
					} else {
						this.axios.get('/api/v1/user/netUser/' + userSession.easeId)
							.then(function(response) {
								if (response.data.isSuccess) {
									sessionStorage.setItem('netUser',JSON.stringify(response.data.data));
									this.$router.push('/local/netUserInfo');
								} else {
									this.$message.error(response.data.resultMsg)
								}
							})
							.catch(function(error) {
								console.log("哈哈哈哈: Person报错了");
							});
					}
				}
			}
		}
	}
</script>

<style>
	#tab {
		width: 100%;
		position: fixed;
		top: 80px;
		left: 10%;
		right: 0px;
	}

	.point {
		cursor: pointer;
	}

	#info {
		position: fixed;
		top: 200px;
		left: 45%;
		right: 0px;
	}

	#icon {
		position: absolute;
		top: 270px;
		left: 280px;
		right: 0px;
	}
</style>
