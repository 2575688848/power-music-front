<template>
	<div id="introduction">
		<bar></bar>
		<div class="block">
			<el-timeline>
				<el-timeline-item timestamp="2019/4/12" placement="top">
					<el-card>
						<h4>更新 Music 列表</h4>
						<p>ytp 提交于 2019/4/12 20:46</p>
						<p>ytp 提交于 2019/4/12 20:46</p>
					</el-card>
				</el-timeline-item>
				<el-timeline-item timestamp="2018/4/3" placement="top">
					<el-card>
						<h4>更新 MV 列表</h4>
						<p>ytp 提交于 2019/5/1 10:46</p>
					</el-card>
				</el-timeline-item>
				<el-timeline-item timestamp="2018/4/2" placement="top">
					<el-card>
						<h4>更新 HotMusic 列表</h4>
						<p>ytp 提交于 2019/5/2 3:46</p>
					</el-card>
				</el-timeline-item>
			</el-timeline>
		</div>
	</div>
</template>

<script>
	import Bar from './Bar'
	export default {
		name: 'introduction',
		components: {
			Bar,
		},
		data() {
			return {
				msg: 'Welcome to Your Vue.js App',
			}
		}
	}
</script>

<style>
	.block{
		position: absolute;
		top: 120px;
		left: 100px;
		right: 20%;
		bottom: 0px;
	}
</style>
