<template>
	<div id="bar">
		<el-menu class="el-menu-demo" mode="horizontal" background-color="#000000" text-color="#fff" active-text-color="#ffd04b" >
			<el-menu-item index="0" style='text-align: center; font-size: 30px; left: 100px;'>Power Music</el-menu-item>
			<el-menu-item index="2" style='left: 100px; font-size: 20px'><router-link to = "/main">网络资源</router-link></el-menu-item>
			<el-menu-item index="3" style='left: 100px; font-size: 20px'>本地</el-menu-item>

		</el-menu>
	</div>
</template>

<script>
	export default {
		name: 'bar',
		data() {
			return {
				msg: 'Welcome to Your Vue.js App',
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
		z-index:3;
	}
</style>
