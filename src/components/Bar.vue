<template>
	<div id="bar">
		<el-menu class="el-menu-demo" mode="horizontal" background-color="#000000" text-color="#fff" active-text-color="#ffd04b">
			<el-menu-item index="0" style='text-align: center; font-size: 30px; left: 100px;'>
				<router-link to="/introduction">Power Music</router-link>
			</el-menu-item>
			<el-menu-item index="2" style='left: 100px; font-size: 20px'>
				<router-link to="/main">网络资源</router-link>
			</el-menu-item>
			<el-menu-item index="3" style='left: 100px; font-size: 20px'>
				<span @click="whereGo">本地</span>
			</el-menu-item>
		</el-menu>
		<div id='divider'>
			<router-link to="/login"><span style="color:#fff">登录</span></router-link>
			<el-divider direction="vertical" style="color:#fff">|</el-divider>
			<router-link to="/register"><span style="color:#fff">注册</span></router-link>
		</div>
		<div id='divider1'>
			<span style="color:#fff">{{msg}}</span>
			<el-divider direction="vertical" style="color:#fff">|</el-divider>
			<span style="color:#fff;cursor: pointer;" @click="exit()">退出</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'bar',
		data() {
			return {
				msg: ''
			}
		},
		methods: {
			whereGo: function() {
				var user = JSON.parse(sessionStorage.getItem('user'));
				if (user == null) {
					this.$router.push('/blank');
				} else {
					this.$router.push('/local/person');
				}
			},
			exit: function() {
				sessionStorage.removeItem('user');
				sessionStorage.removeItem('netUser');
				this.$router.push('/login');
			}
		},
		created: function() {
			
		},
		mounted: function() {
			let traget = document.getElementById('divider');
			let traget1 = document.getElementById('divider1');
			var user = JSON.parse(sessionStorage.getItem('user'));
			//var user = this.$store.state.user;
			if (user == null) {
				traget.style.display = "";
				traget1.style.display = "none";
			} else {
				traget.style.display = "none";
				traget1.style.display = "";
			}
			var date = new Date();
			var hours = date.getHours();
			var info = '';
			if (hours >= 0 && hours < 6) {
				info = '凌晨了，';
			} else if (hours >= 6 && hours < 12) {
				info = '上午好，';
			} else if (hours >= 12 && hours < 18) {
				info = '下午好，';
			} else {
				info = '晚上好，';
			}
			if (user != null) {
				console.log("弟弟"+user.nickname);
				this.msg = info + user.nickname;
			}
		}
	}
</script>

<style>
	.a {
		text-align: center;
	}

	.el-menu-demo {
		height: 80px;
	}

	#bar {
		width: 100%;
		position: fixed;
		top: 0px;
		left: 0px;
		right: 0px;
		z-index: 3;
	}

	#divider {
		position: fixed;
		top: 25px;
		left: 92%;
		right: 0px;
		z-index: 4;
	}

	#divider1 {
		position: fixed;
		top: 25px;
		left: 88%;
		right: 0px;
		z-index: 6;
	}
</style>
