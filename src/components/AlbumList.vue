<template>
	<div id="albumList">
		<bar></bar>
		<netTab></netTab>
		<template>
			<el-row :gutter="40" style="border-collapse:separate; border-spacing:0px 5px;">
				<el-col :span="6" v-for="(item, index) in albumList" :index="index" :key="index">
					<el-card :body-style="{ padding: '0px'}">
						<img :src="item.albumPic" class="image" @click="playSongList(item.albumMID)" style="cursor: pointer;">
						<div style="padding: 10px;">
							<span>{{item.albumName}}</span>
							<div class="bottom clearfix">
								<span>{{item.publicTime}}</span>
								<span class="button">歌曲数:{{item.song_count}}</span>
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
		name: 'albumList',
		components: {
			Bar,
			NetTab
		},
		data() {
			return {
				albumList: []
			}
		},
		created: function() {
			this.albumList = this.$store.state.albumList;
		},
		methods: {
			playSongList(id) {
				var url = '/api/v1/qqMusic/albumSongList/' + id;
				this.$store.commit('newUrl', url);
				this.$router.push('/hotmusic');
			}
		}
	}
</script>

<style>
	#albumList {
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
</style>
