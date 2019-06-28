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
		<div id = 'divider'>
			<router-link to="/login"><span style="color:#fff">登录</span></router-link>
			<el-divider direction="vertical" style="color:#fff">|</el-divider>
			<router-link to="/register"><span style="color:#fff">注册</span></router-link>
		</div>
		<span id ='text'>您还没登录，请点击右上角登录再使用</span>
	</div>
</template>

<script>
	export default {
		name: 'bar',
		data() {
			return {
				msg: 'Welcome to Your Vue.js App',
			}
		},
		methods:{
			whereGo: function() {
				
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
	#text {
		font-size: 25px;
		position: fixed;
		top: 50%;
		left: 36%;
		right: 0px;
	}
</style>
