<template>
	<div id="netTab">
		<div id="tab">
			<el-menu class="el-menu-demo" mode="horizontal" background-color="#fff" text-color="#000000" active-text-color="#000000">
				<el-menu-item index="1" style='font-size: 10px;'>
					<router-link to="/main">热门歌曲</router-link>
				</el-menu-item>
				<el-menu-item index="2" style='font-size: 10px;'>
					<router-link to="/songlist">热门歌单</router-link>
				</el-menu-item>
				<el-menu-item index="3" style='font-size: 10px;'>
					<router-link to="/hotmv">热门MV</router-link>
				</el-menu-item>
			</el-menu>
		</div>
		<div style="margin-top: 15px; right: 3%; position: fixed; top: 80px; z-index: 2;">
			<el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
				<el-select v-model="select" slot="prepend" placeholder="请选择">
					<el-option label="mv" value="mv"></el-option>
					<el-option label="音乐" value="song"></el-option>
					<el-option label="专辑" value="album"></el-option>
				</el-select>
				<el-button slot="append" icon="el-icon-search" @click='search(input3, select)'></el-button>
			</el-input>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'netTab',
		data() {
			return {
				input3: '',
				select: ''
			}
		},
		methods: {
			search(input3, select) {
				var self = this;
				var url = '/api/v1/qqMusic/search?s=' + input3 + '&type=' + select + '&limit=30&offset=0';
				if (select == 'song') {
					self.axios.get(url)
						.then(function(response) {
							if (response.data.isSuccess) {
								self.$store.commit('newSearchSongs', response.data.data);
								self.$router.push('/searchlist');
							} else {
								self.$message.error(response.data.resultMsg)
							}
						})
						.catch(function(error) {
							console.log("哈哈哈哈: NetTab1报错了" + error);
						});
				} else if (select == 'mv') {
					self.axios.get(url)
						.then(function(response) {
							if (response.data.isSuccess) {
								self.$store.commit('newSearchMV', response.data.data);
								self.$router.push('/searchmv');
							} else {
								self.$message.error(response.data.resultMsg)
							}
						})
						.catch(function(error) {
							console.log("哈哈哈哈: NetTab2报错了" + error);
						});
				} else {
					self.axios.get(url)
						.then(function(response) {
							if (response.data.isSuccess) {
								self.$store.commit('newAlbumList', response.data.data);
								self.$router.push('/album');
							} else {
								self.$message.error(response.data.resultMsg)
							}
						})
						.catch(function(error) {
							console.log("哈哈哈哈: NetTab3报错了" + error);
						});
				}
			}
		}
	}
</script>

<style>
	#tab {
		width: 100%;
		position: fixed;
		top: 80px;
		left: 150px;
		right: 0px;
		z-index: 2;
	}

	.el-select .el-input {
		width: 90px;
	}

	.input-with-select .el-input-group__prepend {
		background-color: #fff;
	}
</style>
