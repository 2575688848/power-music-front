<template>
	<div id='localBar'>
		<bar></bar>
		<div id="localBar1">
			<el-row class="tac">
				<el-col :span="24">
					<el-menu default-active="1" class="el-menu-vertical-demo">
						<el-menu-item index="1">
							<img src="../../assets/images/person.ico" width=25px height=25px @click='playMusic(index)' class="point" />
							<span slot="title"><router-link to="/local/person">个人信息</router-link></span>
						</el-menu-item>
						<el-menu-item index="2">
							<img src="../../assets/images/myMusic.ico" width=25px height=25px @click='playMusic(index)' class="point" />
							<span slot="title"><router-link to="/local/localSongList">我的音乐</router-link></span>
						</el-menu-item>
						<el-menu-item index="3">
							<img src="../../assets/images/video.ico" width=25px height=25px @click='playMusic(index)' class="point" />
							<span slot="title"><router-link to="/local/localMV">我的MV</router-link></span>
						</el-menu-item>
						<el-menu-item index="4">
							<img src="../../assets/images/search.ico" width=25px height=25px @click='playMusic(index)' class="point" />
							<span slot="title"><router-link to="/local/analysis">个人分析</router-link></span>
						</el-menu-item>
					</el-menu>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import Bar from '../Bar.vue'
	export default {
		name: 'app',
		components: {
			Bar,
		},
		data() {
			return {

			}
		}
	}
</script>

<style>
	#localBar1 {
		position: fixed;
		width: 9%;
		top: 100px;
		left: 0px;
		right: 90%;
		bottom: 0px;
		margin: auto;
		z-index: 3;
	}
</style>
