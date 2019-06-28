<template>
	<div id="person">
		<localBar></localBar>
		<div id="tab-person">
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
		<div id="head">
			<img :src="user.url" width=75px height=75px />
		</div>
		<div id="person-info">
			<el-form label-position="left" label-width="80px" :model="user" :rules="rules" ref="ruleForm">
				<el-form-item label="昵称" prop="nickname">
					<el-input v-model="user.nickname" placeholder="" readonly="readonly"></el-input>
				</el-form-item>
				<el-form-item label="性别" prop="sex">
					<el-input v-model="user.sex" placeholder="" readonly="readonly"></el-input>
				</el-form-item>
				
				<el-form-item label="手机号" prop="tel">
					<el-input  v-model="user.tel" placeholder="" readonly="readonly"></el-input>
				</el-form-item>
				<el-form-item label="Email" prop="email">
					<el-input  v-model="user.email" placeholder="" readonly="readonly"></el-input>
				</el-form-item>
				<el-form-item label="出生日期" prop="birthday">
					<el-input  v-model="user.birthday" placeholder="" readonly="readonly"></el-input>
				</el-form-item>
				<el-form-item label="地址" prop="address">
					<el-input v-model="user.address" placeholder="" readonly="readonly"></el-input>
				</el-form-item>
				
			</el-form>
			<router-link to="/local/perfectInfo"><el-button class="submit-btn" >修改信息</el-button></router-link>
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
				user: {
					
				}
			}
		},
		methods: {
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
		},
		created: function() {
			this.user = JSON.parse(sessionStorage.getItem('user'));
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
	#tab-person {
		width: 100%;
		position: fixed;
		top: 80px;
		left: 11%;
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
