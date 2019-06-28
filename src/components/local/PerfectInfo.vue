<template>
	<div id="perfectInfo">
		<localBar></localBar>
		<span id="info1">请完善信息</span>
		<hr id="line"/>
		<div id="head">
			<router-link to="/local/head"><img :src="user.url" width=75px height=75px class="point"/></router-link>
		</div>
		<div id="person-info">
			<el-form label-position="left" label-width="80px" :model="user" :rules="rules" ref="ruleForm">
				<el-form-item label="昵称" prop="nickname">
					<el-input v-model="user.nickname" placeholder=""></el-input>
				</el-form-item>
				<el-form-item label="性别" prop="sex">
					<el-input v-model="user.sex" placeholder=""></el-input>
				</el-form-item>
				
				<el-form-item label="手机号" prop="tel">
					<el-input  v-model="user.tel" placeholder=""></el-input>
				</el-form-item>
				<el-form-item label="Email" prop="email">
					<el-input  v-model="user.email" placeholder=""></el-input>
				</el-form-item>
				<el-form-item label="出生日期" prop="birthday">
					<el-input  v-model="user.birthday" placeholder=""></el-input>
				</el-form-item>
				<el-form-item label="地址" prop="address">
					<el-input v-model="user.address" placeholder=""></el-input>
				</el-form-item>
				
			</el-form>
			<el-button class="submit-btn" @click="sure('ruleForm')">确定</el-button>
		</div>
	</div>
</template>

<script>
	import LocalBar from './LocalBar.vue'
	export default {
		name: 'perfectInfo',
		components: {
			LocalBar,
		},
		data() {
			return {
				msg: 'Welcome to Your Vue.js App',
				user: {
					id:'',
					url:'',
					nickname:'',
					sex:'',
					tel:'',
					email:'',
					birthday:'',
					address:''
				},
				rules: {
					username: [{
						required: true,
						message: '请输入用户名',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '请输入密码 ',
						trigger: 'blur'
					}]
				}
			}
		},
		methods: {
			sure(formName) {
				var self = this;
				var userSession= JSON.parse(sessionStorage.getItem('user'));
				self.user.id = userSession.id;
				self.user.url = userSession.url;
				self.$refs[formName].validate((valid) => {
					if (valid) {
						self.axios.put('/api/v1/user/update', {
								id: userSession.id,
								nickname: self.user.nickname,
								sex: self.user.sex,
								tel: self.user.tel,
								email: self.user.email,
								birthday: self.user.birthday,
								address: self.user.address
							})
							.then((response) => {
								if (!response.data.data) {
									alert("修改失败，请刷新重试");
								} else {
									sessionStorage.setItem('user', JSON.stringify(self.user));
									self.$router.push('/local/person');
									this.$message({
										message: '修改信息成功',
										type: 'success'
									});
								}
							})
					}
				});
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
	#line {
		width: 440px;
		left: 37%;
		top: 160px;
		position: fixed;
	}
	#info1 {
		position: fixed;
		top: 120px;
		left: 50%;
		right: 0px;
	}

</style>
