<template>
	<div id="NetEaseUser">
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
		<div id="a">
			<el-row v-for="(item, index) in userList" :index="index" :key="index">
				<el-col :span="4">
					<div class="grid-content ">
						{{index+1}}&nbsp;&nbsp;&nbsp;&nbsp;
						<img :src="item.avatarUrl" width=50px height=50px class="point" @click="selectUser(item)" />
					</div>
				</el-col>
				<el-col :span="4">
					<div class="grid-content ">{{item.nickname}}</div>
				</el-col>
				<el-col :span="4">
					<div class="grid-content ">粉丝:{{item.followeds}}</div>
				</el-col>
				<el-col :span="4">
					<div class="grid-content ">关注:{{item.follows}}</div>
				</el-col>
				<el-col :span="4">
					<div class="grid-content ">{{item.address}}</div>
				</el-col>
				<el-col :span="4">
					<div class="grid-content ">{{item.date}}</div>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import LocalBar from './LocalBar.vue'
	export default {
		name: 'NetEaseUser',
		components: {
			LocalBar,
		},
		data() {
			return {
				msg: 'Welcome to Your Vue.js App',
				userList: []
			}
		},
		created: function() {
			this.userList = this.$store.state.netUserList;
		},
		methods: {
			selectUser(item) {
				sessionStorage.setItem('netUser',JSON.stringify(item));
				var user = JSON.parse(sessionStorage.getItem('user'));
				user.easeId = item.userId;
				var id = user.id
				this.axios.post('/api/v1/user/add/' + id, {
						userId: item.userId,
						avatarUrl: item.avatarUrl,
						nickname: item.nickname,
						followeds: item.followeds,
						follows: item.follows,
						playlistCount: item.playlistCount,
						address: item.address,
						date: item.date
					})
					.then((response) => {
						if (!response.data.data) {
							alert("关联失败，请重试");
						} else {
							sessionStorage.setItem('user',JSON.stringify(user));
							this.$router.push('/local/netUserInfo');
							this.$message({
								message: '关联成功！',
								type: 'success'
							});
						}
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

	#a {
		position: absolute;
		top: 180px;
		left: 24%;
		right: 0px;
		bottom: 0px;
		margin: auto;
		z-index: 1;
	}

	.point {
		cursor: pointer;
	}
</style>
