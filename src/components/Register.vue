<template>
	<portal-template>
		<div id="register">
			<el-form label-position="top" label-width="80px" :model="user" :rules="rules" ref="ruleForm">
				<el-form-item label="用户名" prop="username">
					<el-input v-model="user.username" placeholder="请输用户名  "></el-input>
				</el-form-item>
				<el-form-item label="昵称" prop="nickname">
					<el-input v-model="user.nickname" placeholder="请输昵称  "></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input type="password" v-model="user.password" placeholder="请输密码  "></el-input>
				</el-form-item>
			</el-form>
			<el-button class="submit-btn" @click="register('ruleForm')">注册</el-button>
		</div>
	</portal-template>
</template>

<script>
	import PortalTemplate from './PortalTemplate'
	export default {
		name: 'register',
		components: {
			PortalTemplate
		},
		data() {
			return {
				user: {
					username: '',
					password: '',
					nickname: ''
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
					}],
					nickname: [{
						required: true,
						message: '请输入昵称',
						trigger: 'blur'
					}],
				}
			}
		},
		methods: {
			register(formName) {
				var self = this;
				self.$refs[formName].validate((valid) => {
					if (valid) {
						self.axios.post('/api/v1/user/register', {
								username: self.user.username,
								password: self.user.password,
								nickname: self.user.nickname
							})
							.then((response) => {
								if (response.data.data == null) {
									alert("注册失败，请刷新重试");
								} else {
									self.$router.push('/login');
									this.$message({
										message: '恭喜你，注册成功！请登录',
										type: 'success'
									});
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
