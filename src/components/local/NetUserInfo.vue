<template>
	<div id="netUser">
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
		<div id="head">
			<img :src="netUser.avatarUrl" width=75px height=75px />
		</div>
		<div id="person-info">
			<el-form label-position="left" label-width="80px" :model="user" :rules="rules" ref="ruleForm">
				<el-form-item label="昵称" prop="nickname">
					<el-input v-model="netUser.nickname" placeholder="" readonly="readonly"></el-input>
				</el-form-item>
				<el-form-item label="粉丝数" prop="followeds">
					<el-input v-model="netUser.followeds" placeholder="" readonly="readonly"></el-input>
				</el-form-item>
				
				<el-form-item label="关注数" prop="follows">
					<el-input  v-model="netUser.follows" placeholder="" readonly="readonly"></el-input>
				</el-form-item>
				<el-form-item label="歌单数量" prop="playlistCount">
					<el-input  v-model="netUser.playlistCount" placeholder="" readonly="readonly"></el-input>
				</el-form-item>
				<el-form-item label="出生日期" prop="date">
					<el-input  v-model="netUser.date" placeholder="" readonly="readonly"></el-input>
				</el-form-item>
				<el-form-item label="地址" prop="address">
					<el-input v-model="netUser.address" placeholder="" readonly="readonly"></el-input>
				</el-form-item>
				
			</el-form>
			<router-link to="/local/searchEaseUser"><el-button class="submit-btn" >重新关联</el-button></router-link>
		</div>
	</div>
</template>

<script>
	import LocalBar from './LocalBar.vue'
	export default {
		name: 'netUser',
		components: {
			LocalBar,
		},
		data() {
			return {
				msg: 'Welcome to Your Vue.js App',
				netUser: {
					
				}
			}
		},
		methods: {

		},
		created: function() {
			this.netUser = JSON.parse(sessionStorage.getItem('netUser'));
		}
	}
</script>

<style>
	.submit-btn{
		width: 350px;
	}
	#person-info{
		position: absolute;
		top: 35%;
		left: 40%;
		right: 50;
	}
	#tab {
		width: 100%;
		position: fixed;
		top: 80px;
		left: 10%;
		right: 0px;
		z-index: 2;
	}
	#head{
		position: absolute;
		top: 23%;
		left: 50%;
		right: 0px;
		z-index: 2;
	}
	.point {
		cursor: pointer;
	}

</style>
