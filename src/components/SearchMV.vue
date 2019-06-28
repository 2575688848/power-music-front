<template>
	<div id="hotMV">
		<bar></bar>
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
		<template>
			<el-row :gutter="40" style="border-collapse:separate; border-spacing:0px 5px;">
				<el-col :span="6" v-for="(item, index) in mvList" :index="index" :key="index">
					<el-card :body-style="{ padding: '10px'}">
						<a :href="item.url"><img :src="item.pic" class="image" style="cursor: pointer;"></a>
						<div style="padding: 10px;">
							<span style="width:250px; height:20px; display:block; overflow:hidden;">{{item.name}}</span>
							<!-- <span>{{item.singer}}</span> -->
							<div style="margin-top: 15px;">{{item.singer}}</div>
							<div class="bottom clearfix">
								<span>{{item.publictime}}</span>
								<span class="button">播放量:{{item.playCount}}</span>
							</div>
						</div>
					</el-card>
				</el-col>
			</el-row>
		</template>
	</div>
</template>

<script>
	import Bar from './Bar'
	import NetTab from './NetTab'
	export default {
		name: 'hotMV',
		components: {
			Bar,
			NetTab
		},
		data() {
			return {
				mvList: []
			}
		},
		created: function() {
			var self = this;
			self.mvList = self.$store.state.searchMVs;
		}
	}
</script>

<style>
	#hotMV {
		position: absolute;
		top: 200px;
		left: 50px;
		right: 50px;
		bottom: 0px;
		margin: auto;
		z-index: 1;
	}
	
	.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 40px;
    }
  }

	.time {
		font-size: 13px;
		color: #999;
	}

	.bottom {
		margin-top: 13px;
		line-height: 12px;
	}

	.button {
		padding: 0;
		float: right;
	}

	.image {
		width: 100%;
		display: block;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}

	.clearfix:after {
		clear: both
	}
	#tab {
		width: 100%;
		position: fixed;
		top: 80px;
		left: 150px;
		right: 0px;
		z-index: 2;
	}
</style>
