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
				<router-link to="/local/person">本地</router-link>
			</el-menu-item>
		</el-menu>
		<div id = 'divider'>
			<span style="color:#fff">{{msg}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'bar',
		data() {
			return {
				msg: '',
			}
		},
		methods:{
			whereGo: function() {
				
			}
		},
		created: function() {
			var date = new Date();
			var hours = date.getHours();
			var info = '';
			if (hours >= 0 && hours < 6){
				info = '凌晨了，';
			} else if (hours >= 6 && hours < 12) {
				info = '上午好，';
			} else if (hours >= 12 && hours < 18) {
				info = '下午好，';
			} else {
				info = '晚上好，';
			}
			if (this.$store.state.user.nickname != '') {
				this.msg = info + this.$store.state.user.nickname;
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
		left: 90%;
		right: 0px;
		z-index: 4;
	}

</style>
