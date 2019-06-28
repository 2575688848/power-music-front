<template>
	<div id="searchEaseUser">
		<localBar></localBar>
		<div id="tab">
			<el-menu class="el-menu-demo" mode="horizontal" background-color="#fff" text-color="#000000" active-text-color="#000000">
				<el-menu-item index="1" style='font-size: 10px;'>
					<router-link to="/local/person">基本信息</router-link>
				</el-menu-item>
				<el-menu-item index="2" style='font-size: 10px;'>
					<span>关联网易云</span>
				</el-menu-item>
				<el-menu-item index="3" style='font-size: 10px;'>
					<router-link to="/local/head">头像库</router-link>
				</el-menu-item>
			</el-menu>
		</div>
		<span id="info">请关联你的网易云账号</span>
		<div id="search-user">
			<el-input placeholder="输入你的网易云昵称" v-model="input" class="input-with-select">
				<el-button slot="append" icon="el-icon-search" @click='search(input)'></el-button>
			</el-input>
		</div>
	</div>
</template>

<script>
	import LocalBar from './LocalBar.vue'
	export default {
		name: 'searchEaseUser',
		components: {
			LocalBar,
		},
		data() {
			return {
				msg: 'Welcome to Your Vue.js App',
				input: ''
			}
		},
		created: function() {

		},
		methods: {
			search(user) {
				var self = this;
				var url = '/api/v1/NetEaseMusic/user?s=' + user + '&type=user&limit=60&offset=0';
				self.axios.get(url)
					.then(function(response) {
						if (response.data.isSuccess) {
							self.$store.commit('newNetUserList', response.data.data.userprofiles);
							self.$router.push('/local/netEaseUser');
						} else {
							self.$message.error(response.data.resultMsg)
						}
					})
					.catch(function(error) {
						console.log("哈哈哈哈: searchEaseUser报错了");
					});
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
		z-index: 2;
	}

	#info {
		position: fixed;
		top: 250px;
		left: 42%;
		right: 0px;
	}

	.el-select .el-input {
		width: 350px;
	}

	#search-user {
		width: 450px;
		position: fixed;
		top: 320px;
		left: 36%;
		right: 0px;
	}
</style>
