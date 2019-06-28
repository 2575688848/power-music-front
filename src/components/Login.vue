<template>
	<portal-template>
		<div id="login">
			<el-form label-position="top" label-width="80px" :model="user" :rules="rules" ref="ruleForm">
				<el-form-item label="用户名" prop="username">
					<el-input v-model="user.username" placeholder="请输用户名  "></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input type="password" v-model="user.password" placeholder="请输密码  "></el-input>
				</el-form-item>
			</el-form>
			<el-button class="submit-btn" @click="login('ruleForm')">登录</el-button>
		</div>
	</portal-template>
</template>

<script>
	import PortalTemplate from './PortalTemplate'
	export default {
		name: 'login',
		components: {
			PortalTemplate
		},
		data() {
			return {
				user: {
					username: '',
					password: ''
				},
				msg: 'Welcome to Your Vue.js App',
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
			login(formName) {
				var self = this;
				self.$refs[formName].validate((valid) => {
					if (valid) {
						self.axios.post('/api/v1/user/login', {
								username: self.user.username,
								password: self.user.password
							})
							.then((response) => {
								if (response.data.data == null) {
									alert("用户名密码错误，请重新登录")
								} else {
									//self.$store.commit('newUser', response.data.data);
									sessionStorage.setItem('user',JSON.stringify(response.data.data));
									self.$router.push('/local/person');
								}
							})
					}
				});
			}
		}
	}
</script>

<style>
</style>
